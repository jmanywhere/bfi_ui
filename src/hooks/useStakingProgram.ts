'use client';

import { useSetAtom, useAtomValue } from 'jotai'
import { programAtom } from "@/data/atoms";
import { PublicKey, clusterApiUrl } from "@solana/web3.js";
import { useAnchorWallet, useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useCallback, useEffect, useState } from 'react';
import { Program, AnchorProvider } from '@coral-xyz/anchor'
import { IDL as StakingIDL } from '@/data/idl/staking';
import { stakingProgram as stakingKey, tokenMintProgram } from '@/data/programKeys';
import { BN } from '@coral-xyz/anchor'
import { getAccount, getAssociatedTokenAddressSync } from '@solana/spl-token';

export default function useStakingProgram() {

    const setProgramAtom = useSetAtom(programAtom)
    const {connection} = useConnection();
    const anchorWallet = useAnchorWallet();

    useEffect( () => {
      if(!connection || !anchorWallet)
        return;

      const provider = new AnchorProvider(connection, anchorWallet, { commitment: "confirmed"} )
      setProgramAtom( new Program(StakingIDL, stakingKey, provider))
    }, [connection, anchorWallet, setProgramAtom])
}

export function useStakingPoolId(id: number) {
  const program = useAtomValue(programAtom);
  const { publicKey } = useWallet();

  const [poolData, setPoolData] = useState<{poolInfo: any, userPoolInfo: any} | null>(null);

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

      const interval = setInterval( fetchPoolData, 4000);
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

    const poolIdAccount = PublicKey.findProgramAddressSync( [ Buffer.from("pool"), new Uint8Array([1]) ], program.programId)[0]
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