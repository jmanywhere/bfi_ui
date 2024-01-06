import { atom } from 'jotai';
import { Program } from '@coral-xyz/anchor'
import { BfiStaking } from './idl/staking';

export const programAtom = atom<Program<BfiStaking> | null>(null);