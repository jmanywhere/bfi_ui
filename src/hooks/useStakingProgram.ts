'use client';

import { useSetAtom, useAtomValue, useAtom } from 'jotai'
import { PoolDataType, pools, programAtom, providerAtom } from "@/data/atoms";
import { PublicKey, Transaction } from "@solana/web3.js";
import { useAnchorWallet, useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useCallback, useEffect, useState } from 'react';
import { Program, AnchorProvider } from '@coral-xyz/anchor'
import { BfiStaking, IDL as StakingIDL } from '@/data/idl/staking';
import { stakingProgram as stakingKey, tokenMintProgram } from '@/data/programKeys';
import { BN } from '@coral-xyz/anchor'
import { getAssociatedTokenAddressSync } from '@solana/spl-token';
import { UnwrapPromise } from '@/data/typeHelpers';

export default function useStakingProgram() {

    const setProgramAtom = useSetAtom(programAtom)
    const setProviderAtom = useSetAtom(providerAtom)
    const {connection} = useConnection();
    const anchorWallet = useAnchorWallet();

    useEffect( () => {
      if(!connection || !anchorWallet)
        return;

      const provider = new AnchorProvider(connection, anchorWallet, { commitment: "confirmed"} )
      setProgramAtom( new Program(StakingIDL, stakingKey, provider))
      setProviderAtom(provider);
    }, [connection, anchorWallet, setProgramAtom, setProviderAtom])
}

export function useGeneralData() {
  const program = useAtomValue(programAtom);
  const [tokenSupply, setTokenSupply] = useState<number | null>(null);
  const [totalStaked, setTotalStaked] = useState<number | null>(null);

  const fetchGeneralData = useCallback( async () => {
    if(!program)
      return;
    // fetch token supply
    const tokenSupply = await program.provider.connection.getTokenSupply(tokenMintProgram);
    // fetch token balance of vault account
    const vaultAccount = PublicKey.findProgramAddressSync([Buffer.from('vault')], program.programId)[0]
    const vaultBalance = await program.provider.connection.getTokenAccountBalance(vaultAccount);
    setTokenSupply(tokenSupply.value.uiAmount);
    setTotalStaked(vaultBalance.value.uiAmount);
  },[program, setTokenSupply, setTotalStaked])

  useEffect( () => {
    if(!tokenSupply)
      fetchGeneralData();

      const interval = setInterval( fetchGeneralData, 6000);
      return () => clearInterval(interval);

  }, [fetchGeneralData, tokenSupply])

  return {tokenSupply, totalStaked}
}

export function useFetchPoolData () {
  const program = useAtomValue(programAtom);
  const { publicKey } = useWallet();
  const [pd,setPoolData] = useAtom(pools);

  const fetchPoolData = useCallback( async () => {
    if(!program)
      return;
    // Fetch all accounts
    const poolIdAccounts = await program.account.poolInfo.all();

    const allUserPositions = await Promise.all( poolIdAccounts.map( (poolInfo, i) => {
      if(!publicKey)
        return null;

      const userPoolAccount = PublicKey.findProgramAddressSync([publicKey.toBuffer(), new Uint8Array([i + 1])], program.programId)[0]
      return program.account.stakingPosition.fetch(userPoolAccount).catch( () => null);
    }));

    const poolData = poolIdAccounts.map( (poolInfo, i) => {
      
      return {
        poolInfo: poolInfo.account,
        userPoolInfo: allUserPositions[i]
      } as PoolDataType
    })

    setPoolData(poolData)
  },[program, setPoolData, publicKey])

  useEffect( () => {
    if(!pd.length)
      fetchPoolData();

      const interval = setInterval( fetchPoolData, 6000);
      return () => clearInterval(interval);

  }, [fetchPoolData, pd])
}

export function useStakingPoolId(id: number) {
  const program = useAtomValue(programAtom);
  const { publicKey } = useWallet();


  const [poolData, setPoolData] = useState<{
    poolInfo: UnwrapPromise<ReturnType<Program<BfiStaking>['account']['poolInfo']['fetch']>> | null, 
    userPoolInfo: UnwrapPromise<ReturnType<Program<BfiStaking>['account']['stakingPosition']['fetch']>> | null
  } | null>
  (null);

  const fetchPoolData = useCallback( async () => {
    if(!program || !publicKey)
      return;
    // Fetch all accounts
    const poolIdAccount = PublicKey.findProgramAddressSync([Buffer.from('pool'), new Uint8Array([id])], program.programId)[0]
    const userPoolAccount = PublicKey.findProgramAddressSync([publicKey.toBuffer(), new Uint8Array([id])], program.programId)[0]

    const poolInfo = await program.account.poolInfo.fetch(poolIdAccount).catch( () => null);
    const userPoolInfo = await program.account.stakingPosition.fetch(userPoolAccount).catch( () => null);

    setPoolData({poolInfo, userPoolInfo})
  },[id, program, setPoolData, publicKey])

  useEffect( () => {
    if(!poolData)
      fetchPoolData();

      const interval = setInterval( fetchPoolData, 10000);
      return () => clearInterval(interval);

  }, [fetchPoolData, poolData])

  return {data: poolData, refetch: fetchPoolData}
}

export function useStakeAction(){
  const program = useAtomValue(programAtom);
  const { publicKey } = useWallet();
  const [loading, setLoading] = useState(false);
  const [currentTx, setCurrentTx] = useState<string | null>(null);

  const action = useCallback( async(id: number, amount: BN) => {
    if(!program || !publicKey)
      return;
    setLoading(true);

    const poolIdAccount = PublicKey.findProgramAddressSync( [ Buffer.from("pool"), new Uint8Array([id]) ], program.programId)[0]
    const userPoolAccount = PublicKey.findProgramAddressSync([publicKey.toBuffer(), new Uint8Array([id])], program.programId)[0]
    const userTokenAccount = getAssociatedTokenAddressSync(tokenMintProgram, publicKey);
    const vaultAccount = PublicKey.findProgramAddressSync([Buffer.from('vault')], program.programId)[0]
    const statusAccount = PublicKey.findProgramAddressSync([Buffer.from('status')], program.programId)[0]

    const tx = await program.methods.stake(id, amount).accounts({
      signer: publicKey,
      pool: poolIdAccount,
      userTokenAccount: userTokenAccount,
      stakingPosition: userPoolAccount,
      tokenVault: vaultAccount,
      status: statusAccount,
      mint: tokenMintProgram,
    }).rpc().finally( () => setLoading(false));

    setCurrentTx(tx);
    setLoading(false);

  },[setLoading, program, setCurrentTx, publicKey])

  return {action, loading, currentTx}
}

export function usePoolExitActions(){
  const program = useAtomValue(programAtom);
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const [loading, setLoading] = useState(false);
  const [currentTx, setCurrentTx] = useState<string | null>(null);

  const claim = useCallback( async(id: number) => {
    if(!program || !publicKey)
      return;
    setLoading(true);

    const poolIdAccount = PublicKey.findProgramAddressSync( [ Buffer.from("pool"), new Uint8Array([1]) ], program.programId)[0]
    const userPoolAccount = PublicKey.findProgramAddressSync([publicKey.toBuffer(), new Uint8Array([id])], program.programId)[0]
    const userTokenAccount = getAssociatedTokenAddressSync(tokenMintProgram, publicKey);
    const vaultAccount = PublicKey.findProgramAddressSync([Buffer.from('vault')], program.programId)[0]
    const statusAccount = PublicKey.findProgramAddressSync([Buffer.from('status')], program.programId)[0]

    const tx = await program.methods.claim(id).accounts({
      signer: publicKey,
      pool: poolIdAccount,
      userTokenAccount: userTokenAccount,
      stakingPosition: userPoolAccount,
      tokenVault: vaultAccount,
      status: statusAccount,
      mint: tokenMintProgram,
    }).rpc().finally( () => setLoading(false));

    setCurrentTx(tx);
    setLoading(false);

  },[setLoading, program, setCurrentTx, publicKey])

  const exit = useCallback( async(id: number) => {
    if(!program || !publicKey)
      return;
    setLoading(true);

    const poolIdAccount = PublicKey.findProgramAddressSync( [ Buffer.from("pool"), new Uint8Array([1]) ], program.programId)[0]
    const userPoolAccount = PublicKey.findProgramAddressSync([publicKey.toBuffer(), new Uint8Array([id])], program.programId)[0]
    const userTokenAccount = getAssociatedTokenAddressSync(tokenMintProgram, publicKey);
    const vaultAccount = PublicKey.findProgramAddressSync([Buffer.from('vault')], program.programId)[0]
    const statusAccount = PublicKey.findProgramAddressSync([Buffer.from('status')], program.programId)[0]

    const tx = await program.methods.withdraw(id).accounts({
      signer: publicKey,
      pool: poolIdAccount,
      userTokenAccount: userTokenAccount,
      stakingPosition: userPoolAccount,
      tokenVault: vaultAccount,
      status: statusAccount,
      mint: tokenMintProgram,
    }).rpc().finally( () => setLoading(false));

    setCurrentTx(tx);
    setLoading(false);

  },[setLoading, program, setCurrentTx, publicKey])

  const compound = useCallback( async(id: number, compoundAmount: BN) => {
    if(!program || !publicKey)
      return;
    setLoading(true);

    const poolIdAccount = PublicKey.findProgramAddressSync( [ Buffer.from("pool"), new Uint8Array([1]) ], program.programId)[0]
    const userPoolAccount = PublicKey.findProgramAddressSync([publicKey.toBuffer(), new Uint8Array([id])], program.programId)[0]
    const userTokenAccount = getAssociatedTokenAddressSync(tokenMintProgram, publicKey);
    const vaultAccount = PublicKey.findProgramAddressSync([Buffer.from('vault')], program.programId)[0]
    const statusAccount = PublicKey.findProgramAddressSync([Buffer.from('status')], program.programId)[0]

    const tx = await program.methods.claim(id).accounts({
      signer: publicKey,
      pool: poolIdAccount,
      userTokenAccount: userTokenAccount,
      stakingPosition: userPoolAccount,
      tokenVault: vaultAccount,
      status: statusAccount,
      mint: tokenMintProgram,
    }).instruction();

    const tx2 = await program.methods.stake(id, compoundAmount).accounts({
      signer: publicKey,
      pool: poolIdAccount,
      userTokenAccount: userTokenAccount,
      stakingPosition: userPoolAccount,
      tokenVault: vaultAccount,
      status: statusAccount,
      mint: tokenMintProgram,
    }).instruction();

    const signature = await sendTransaction(
      new Transaction().add(tx).add(tx2),
      connection,
    ).finally( () => setLoading(false));

    setCurrentTx(signature);

  },[setLoading, program, setCurrentTx, publicKey, connection, sendTransaction])

  return {claim, exit, compound, loading, currentTx}

}