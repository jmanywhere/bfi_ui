"use client";

import { programAtom, providerAtom } from "@/data/atoms";
import { useAtomValue } from "jotai";
import { useCallback, useEffect, useMemo, useState } from "react";
import { BN } from "@coral-xyz/anchor";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { tokenMintProgram } from "@/data/programKeys";
import { getAssociatedTokenAddressSync } from "@solana/spl-token";

export default function ClaimExitFees() {
  const program = useAtomValue(programAtom);
  const provider = useAtomValue(providerAtom);
  const [loading, setLoading] = useState(false);
  const anchorWallet = useAnchorWallet();
  const [fees, setFees] = useState(0);
  const [earlyFee, setEarlyFee] = useState(false);

  const feesAvailable = useCallback(async () => {
    if (!program) return 0;
    const statusAccount = PublicKey.findProgramAddressSync(
      [Buffer.from("status")],
      program.programId
    )[0];
    const earlyAccount = PublicKey.findProgramAddressSync(
      [Buffer.from("early")],
      program.programId
    )[0];
    const feesToCollect = await program.account.status.fetch(statusAccount);
    const earlyStatus = await program.account.earlyFlag
      .fetch(earlyAccount)
      .catch(() => ({ waiveEarly: true }));
    const fees = feesToCollect.earlyCollectedFee;
    setFees(parseInt(fees.toString()) / 1e3);
    setEarlyFee(earlyStatus.waiveEarly);
  }, [program, setFees, setEarlyFee]);

  useEffect(() => {
    feesAvailable();
  }, [feesAvailable]);

  const claimFees = useCallback(async () => {
    if (!program || !anchorWallet || !provider) return;

    setLoading(true);
    const vaultAccount = PublicKey.findProgramAddressSync(
      [Buffer.from("vault")],
      program.programId
    )[0];
    const statusAccount = PublicKey.findProgramAddressSync(
      [Buffer.from("status")],
      program.programId
    )[0];
    const ownerTokenAccount = await getAssociatedTokenAddressSync(
      tokenMintProgram,
      anchorWallet.publicKey
    );
    const tx = await program.methods
      .claimEarlyFee()
      .accounts({
        signer: anchorWallet.publicKey,
        tokenVault: vaultAccount,
        mint: tokenMintProgram,
        status: statusAccount,
        ownerTokenAccount: ownerTokenAccount,
      })
      .transaction();

    await provider.sendAndConfirm(tx).finally(() => {
      feesAvailable();
      setLoading(false);
    });
  }, [program, anchorWallet, provider, feesAvailable]);
  const waiveFee = useCallback(
    async (waive: boolean) => {
      if (!program || !anchorWallet || !provider) return;

      setLoading(true);
      const statusAccount = PublicKey.findProgramAddressSync(
        [Buffer.from("status")],
        program.programId
      )[0];
      const earlyAccount = PublicKey.findProgramAddressSync(
        [Buffer.from("early")],
        program.programId
      )[0];
      const tx = await program.methods
        .setWaiveFee(waive)
        .accounts({
          signer: anchorWallet.publicKey,
          earlyFlag: earlyAccount,
          status: statusAccount,
        })
        .transaction();

      await provider.sendAndConfirm(tx).finally(() => {
        feesAvailable();
        setLoading(false);
      });
    },
    [program, anchorWallet, provider, feesAvailable]
  );

  return (
    <>
      <div className="text-center whitespace-pre-wrap">
        BFI fees available to claim:{"\n"}
        <span className="font-bold">{fees.toLocaleString()}</span>
      </div>
      <button
        className="btn btn-primary"
        onClick={claimFees}
        disabled={loading}
      >
        {loading ? <span className="loading loading-spinner" /> : "Claim Fees"}
      </button>
      <div className="flex flex-row items-center gap-2">
        <button
          className="btn btn-accent"
          onClick={() => waiveFee(true)}
          disabled={loading || earlyFee}
        >
          Waive Fee
        </button>
        <button
          className="btn btn-accent"
          onClick={() => waiveFee(false)}
          disabled={loading || !earlyFee}
        >
          Set Early Fee
        </button>
      </div>
    </>
  );
}
