'use client';

import { useSetAtom, useAtomValue, useAtom } from 'jotai'
import { PoolDataType, PoolPositionDataType, offPools, poolFetchAtom, pools, programAtom, providerAtom } from "@/data/atoms";
import { Connection, PublicKey, Transaction } from "@solana/web3.js";
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
  const [price, setPrice] = useState<number | null>(null);

  const fetchTotalSupply = useCallback( async () => {
    if(!program)
      return;
    // fetch token supply
    const tokenSupply = await program.provider.connection.getTokenSupply(tokenMintProgram);
    setTokenSupply(tokenSupply.value.uiAmount);
  },[setTokenSupply, program]);

  const fetchGeneralData = useCallback( async () => {
    if(!program)
      return;
    // fetch token balance of vault account
    const vaultAccount = PublicKey.findProgramAddressSync([Buffer.from('vault')], program.programId)[0]
    const vaultBalance = await program.provider.connection.getTokenAccountBalance(vaultAccount);
    setTotalStaked(vaultBalance.value.uiAmount);
  },[program, setTotalStaked])

  const fetchTokenPrice = useCallback( async () => {

    const dexScreenerData = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${tokenMintProgram}`)
      .then( (res) => res.json())
      .catch( () => null);

    if(!dexScreenerData)
      return;
    const price = dexScreenerData.pairs[0].priceUsd;
    setPrice(parseFloat(price));
  },[setPrice]);

  useEffect( () => {
    if(!tokenSupply)
      fetchGeneralData();

      const interval = setInterval( fetchGeneralData, 15000);
      return () => clearInterval(interval);

  }, [fetchGeneralData, tokenSupply])

  useEffect( () => {
    if(!price)
      fetchTokenPrice();

      const interval = setInterval( fetchTokenPrice, 60000);
      return () => clearInterval(interval);
  },[fetchTokenPrice, price])

  useEffect( () => {
    if(!tokenSupply)
      fetchTotalSupply();

  },[tokenSupply, fetchTotalSupply])

  return {tokenSupply, totalStaked, price}
}

export function useFetchPoolData () {
  const program = useAtomValue(programAtom);
  const { publicKey } = useWallet();
  const [pd,setPoolData] = useAtom(pools);
  const setOffPools = useSetAtom(offPools)
  const setRefetch = useSetAtom(poolFetchAtom)
  const fetchPoolData = useCallback( async () => {
    if(!program)
      return;

    const pool7 = PublicKey.findProgramAddressSync([Buffer.from('pool'), new Uint8Array([7])], program.programId)[0]
    const pool8 = PublicKey.findProgramAddressSync([Buffer.from('pool'), new Uint8Array([8])], program.programId)[0]
    const pool9 = PublicKey.findProgramAddressSync([Buffer.from('pool'), new Uint8Array([9])], program.programId)[0]
    const userPosition1 = publicKey ? PublicKey.findProgramAddressSync([publicKey.toBuffer(), new Uint8Array([1])], program.programId)[0] : null
    const userPosition2 = publicKey ? PublicKey.findProgramAddressSync([publicKey.toBuffer(), new Uint8Array([2])], program.programId)[0] : null
    const userPosition3 = publicKey ? PublicKey.findProgramAddressSync([publicKey.toBuffer(), new Uint8Array([3])], program.programId)[0] : null
    const userPosition4 = publicKey ? PublicKey.findProgramAddressSync([publicKey.toBuffer(), new Uint8Array([4])], program.programId)[0] : null
    const userPosition5 = publicKey ? PublicKey.findProgramAddressSync([publicKey.toBuffer(), new Uint8Array([5])], program.programId)[0] : null
    const userPosition6 = publicKey ? PublicKey.findProgramAddressSync([publicKey.toBuffer(), new Uint8Array([6])], program.programId)[0] : null
    const userPosition7 = publicKey ? PublicKey.findProgramAddressSync([publicKey.toBuffer(), new Uint8Array([7])], program.programId)[0] : null
    const userPosition8 = publicKey ? PublicKey.findProgramAddressSync([publicKey.toBuffer(), new Uint8Array([8])], program.programId)[0] : null
    const userPosition9 = publicKey ? PublicKey.findProgramAddressSync([publicKey.toBuffer(), new Uint8Array([9])], program.programId)[0] : null
    // Fetch all accounts
    const poolIdAccountsRaw = await program.account.poolInfo.all();
    const allPositions = await program.account.stakingPosition.all()
    console.log({allPositions})
    const poolIdAccounts = [
      poolIdAccountsRaw.find( (x) => x.publicKey.toBase58() === pool7.toBase58()),
      poolIdAccountsRaw.find( (x) => x.publicKey.toBase58() === pool8.toBase58()),
      poolIdAccountsRaw.find( (x) => x.publicKey.toBase58() === pool9.toBase58()),
    ]
    const allUserPositions = [
      allPositions.find( (x) => x.publicKey.toBase58() === userPosition7?.toBase58()),
      allPositions.find( (x) => x.publicKey.toBase58() === userPosition8?.toBase58()),
      allPositions.find( (x) => x.publicKey.toBase58() === userPosition9?.toBase58()),
    ]

    const offPositions = [
      allPositions.find( (x) => x.publicKey.toBase58() === userPosition1?.toBase58())?.account,
      allPositions.find( (x) => x.publicKey.toBase58() === userPosition2?.toBase58())?.account,
      allPositions.find( (x) => x.publicKey.toBase58() === userPosition3?.toBase58())?.account,
      allPositions.find( (x) => x.publicKey.toBase58() === userPosition4?.toBase58())?.account,
      allPositions.find( (x) => x.publicKey.toBase58() === userPosition5?.toBase58())?.account,
      allPositions.find( (x) => x.publicKey.toBase58() === userPosition6?.toBase58())?.account,
    ] as PoolPositionDataType[]
    console.log({allUserPositions, poolIdAccounts, allPositions})
    const poolData = poolIdAccounts.map( (poolInfo, i) => {
      if(!poolInfo)
        return {
      poolInfo: null,
      userPoolInfo: null,
    } as PoolDataType; 
      return {
        poolInfo: poolInfo.account,
        userPoolInfo: allUserPositions[i]?.account
      } as PoolDataType
    })
    setPoolData(poolData)
    setOffPools(offPositions)

    
  },[program, setPoolData, publicKey, setOffPools])
  
  useEffect( () => {
    if(!pd.length)
    fetchPoolData();

    setRefetch({getData: fetchPoolData})
  }, [fetchPoolData, pd, setRefetch])

  return {refetch: fetchPoolData};
}

export function useStakeAction(){
  const program = useAtomValue(programAtom);
  const { publicKey } = useWallet();
  const [loading, setLoading] = useState(false);

  const refetchCallback = useAtomValue(poolFetchAtom).getData;

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
    console.log({tx})
    setTimeout( async() => {
      refetchCallback?.();
    }
    , 2000)

  },[setLoading, program, publicKey, refetchCallback])

  return {action, loading}
}

export function usePoolExitActions(){
  const program = useAtomValue(programAtom);
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const [loading, setLoading] = useState(false);
  const [currentTx, setCurrentTx] = useState<string | null>(null);
  const refetchCallback = useAtomValue(poolFetchAtom).getData;

  const claim = useCallback( async(id: number) => {
    if(!program || !publicKey)
      return;
    setLoading(true);

    const poolIdAccount = PublicKey.findProgramAddressSync( [ Buffer.from("pool"), new Uint8Array([id]) ], program.programId)[0]
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
    }).rpc()
    console.log({tx})
    setTimeout( async() => {
      refetchCallback?.();
    }
    , 2000)
  },[setLoading, program, publicKey, refetchCallback])

  const exit = useCallback( async(id: number) => {
    if(!program || !publicKey)
      return;
    setLoading(true);
    
    const poolIdAccount = PublicKey.findProgramAddressSync( [ Buffer.from("pool"), new Uint8Array([id]) ], program.programId)[0]
    const userPoolAccount = PublicKey.findProgramAddressSync([publicKey.toBuffer(), new Uint8Array([id])], program.programId)[0]
    const userTokenAccount = getAssociatedTokenAddressSync(tokenMintProgram, publicKey);
    const vaultAccount = PublicKey.findProgramAddressSync([Buffer.from('vault')], program.programId)[0]
    const statusAccount = PublicKey.findProgramAddressSync([Buffer.from('status')], program.programId)[0]
    const earlyFlagAccount = PublicKey.findProgramAddressSync([Buffer.from('early')], program.programId)[0]

    const tx = await program.methods.withdraw(id).accounts({
      signer: publicKey,
      pool: poolIdAccount,
      userTokenAccount: userTokenAccount,
      stakingPosition: userPoolAccount,
      tokenVault: vaultAccount,
      status: statusAccount,
      mint: tokenMintProgram,
      earlyFlag: earlyFlagAccount,
    }).rpc()

    console.log({tx})
    setTimeout( async() => {
      refetchCallback?.();
    }
    , 2000)


  },[setLoading, program, publicKey, refetchCallback])

  const compound = useCallback( async(id: number, compoundAmount: BN) => {
    if(!program || !publicKey)
      return;
    setLoading(true);

    const poolIdAccount = PublicKey.findProgramAddressSync( [ Buffer.from("pool"), new Uint8Array([id]) ], program.programId)[0]
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

export async function waitForTransaction(connection: Connection, tx: string){
  const latestblock = await connection.getLatestBlockhash("confirmed");
  await connection.confirmTransaction({
    ...latestblock,
    signature: tx,
  })
}