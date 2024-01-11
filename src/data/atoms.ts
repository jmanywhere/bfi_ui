import { atom } from 'jotai';
import { Program } from '@coral-xyz/anchor'
import { BfiStaking } from './idl/staking';
import { UnwrapPromise } from './typeHelpers';

export const programAtom = atom<Program<BfiStaking> | null>(null);

export type PoolDataType = {
  poolInfo: UnwrapPromise<ReturnType<Program<BfiStaking>['account']['poolInfo']['fetch']>> | null;
  userPoolInfo: UnwrapPromise<ReturnType<Program<BfiStaking>['account']['stakingPosition']['fetch']>> | null;
};
export const pools = atom<Array<PoolDataType>>([])