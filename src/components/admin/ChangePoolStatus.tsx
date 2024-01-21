"use client";

import { programAtom, providerAtom } from "@/data/atoms";
import { useAtomValue } from "jotai";
import { useState } from "react";
import { BN } from "@coral-xyz/anchor";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";

export default function ChangePoolStatus() {
  const program = useAtomValue(programAtom);
  const provider = useAtomValue(providerAtom);
  const [loading, setLoading] = useState(false);
  const anchorWallet = useAnchorWallet();

  const disableAllPools = async () => {
    if (!program || !anchorWallet) return;
    if (!provider) return setLoading(false);
    setLoading(true);
    const allPools = new Array(9)
      .fill(null)
      .map(
        (_, i) =>
          PublicKey.findProgramAddressSync(
            [Buffer.from("pool"), new Uint8Array([i + 1])],
            program.programId
          )[0]
      );

    let [statusAccount] = PublicKey.findProgramAddressSync(
      [Buffer.from("status")],
      program.programId
    );

    const initInstruction = await program.methods
      .setPoolActiveStatus(1, false)
      .accounts({
        signer: anchorWallet.publicKey,
        pool: allPools[0],
        status: statusAccount,
      })
      .transaction();

    if (allPools.length > 1) {
      allPools.map(async (poolKey, i) => {
        if (i === 0) return;
        initInstruction.add(
          await program.methods
            .setPoolActiveStatus(i + 1, false)
            .accounts({
              signer: anchorWallet.publicKey,
              pool: poolKey,
              status: statusAccount,
            })
            .instruction()
        );
      });
    }
    await provider
      .sendAndConfirm(initInstruction)
      .then((tx) => console.log(tx))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };
  const reenablePools = async () => {
    if (!program || !anchorWallet) return;
    if (!provider) return setLoading(false);
    setLoading(true);
    const allPools = new Array(9)
      .fill(null)
      .map(
        (_, i) =>
          PublicKey.findProgramAddressSync(
            [Buffer.from("pool"), new Uint8Array([i + 1])],
            program.programId
          )[0]
      );

    let [statusAccount] = PublicKey.findProgramAddressSync(
      [Buffer.from("status")],
      program.programId
    );

    const initInstruction = await program.methods
      .setPoolActiveStatus(7, true)
      .accounts({
        signer: anchorWallet.publicKey,
        pool: allPools[6],
        status: statusAccount,
      })
      .transaction();

    initInstruction.add(
      await program.methods
        .setPoolActiveStatus(8, true)
        .accounts({
          signer: anchorWallet.publicKey,
          pool: allPools[7],
          status: statusAccount,
        })
        .instruction()
    );
    initInstruction.add(
      await program.methods
        .setPoolActiveStatus(9, true)
        .accounts({
          signer: anchorWallet.publicKey,
          pool: allPools[8],
          status: statusAccount,
        })
        .instruction()
    );
    await provider
      .sendAndConfirm(initInstruction)
      .then((tx) => console.log(tx))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  return (
    <>
      <button
        className="btn btn-primary"
        disabled={loading}
        onClick={() => disableAllPools()}
      >
        {loading ? (
          <span className="loading loading-spinner" />
        ) : (
          "Disable All Pools"
        )}
      </button>
      <button
        className="btn btn-primary"
        disabled={loading}
        onClick={() => reenablePools()}
      >
        {loading ? (
          <span className="loading loading-spinner" />
        ) : (
          "Reenable Pools"
        )}
      </button>
    </>
  );
}
