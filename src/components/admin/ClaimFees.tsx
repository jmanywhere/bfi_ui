"use client";

import { programAtom, providerAtom } from "@/data/atoms";
import { useAtomValue } from "jotai";
import { useState } from "react";
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

  const claimFees = async () => {
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

    await provider.sendAndConfirm(tx).finally(() => setLoading(false));
  };

  return (
    <button className="btn btn-primary" onClick={claimFees} disabled={loading}>
      {loading ? <span className="loading loading-spinner" /> : "Claim Fees"}
    </button>
  );
}
