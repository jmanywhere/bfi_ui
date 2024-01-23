import { atom } from 'jotai';
import { AnchorProvider, Program } from '@coral-xyz/anchor'
import { BfiStaking } from './idl/staking';
import { UnwrapPromise } from './typeHelpers';
import { PublicKey } from '@solana/web3.js';

export const programAtom = atom<Program<BfiStaking> | null>(null);
export const providerAtom = atom<AnchorProvider | null>(null);

export type PoolPositionDataType = UnwrapPromise<ReturnType<Program<BfiStaking>['account']['stakingPosition']['fetch']>> | null;

export type PoolDataType = {
  poolInfo: UnwrapPromise<ReturnType<Program<BfiStaking>['account']['poolInfo']['fetch']>> | null;
  userPoolInfo: PoolPositionDataType;
};
export const pools = atom<Array<PoolDataType>>([])
export const offPools = atom<Array<PoolPositionDataType>>([])

export const poolFetchAtom = atom<{getData: (()=> Promise<void>) | null}>({ getData: null})
export const topPoolsAtom = atom<Array<{account: PoolPositionDataType, publicKey: PublicKey}>>([])