"use client";

import { programAtom, providerAtom } from "@/data/atoms";
import { useAtomValue } from "jotai";
import { useState } from "react";
import { BN } from "@coral-xyz/anchor";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";

export default function CreatePools() {
  const program = useAtomValue(programAtom);
  const provider = useAtomValue(providerAtom);
  const [loading, setLoading] = useState(false);
  const anchorWallet = useAnchorWallet();

  const createNewPools = async () => {
    if (!program || !anchorWallet) return;

    let [newPoolAccount1] = PublicKey.findProgramAddressSync(
      [Buffer.from("pool"), new Uint8Array([1])],
      program.programId
    );
    let [newPoolAccount2] = PublicKey.findProgramAddressSync(
      [Buffer.from("pool"), new Uint8Array([2])],
      program.programId
    );
    let [newPoolAccount3] = PublicKey.findProgramAddressSync(
      [Buffer.from("pool"), new Uint8Array([3])],
      program.programId
    );
    let [newPoolAccount4] = PublicKey.findProgramAddressSync(
      [Buffer.from("pool"), new Uint8Array([4])],
      program.programId
    );
    let [newPoolAccount5] = PublicKey.findProgramAddressSync(
      [Buffer.from("pool"), new Uint8Array([5])],
      program.programId
    );
    let [newPoolAccount6] = PublicKey.findProgramAddressSync(
      [Buffer.from("pool"), new Uint8Array([6])],
      program.programId
    );
    let [statusAccount] = PublicKey.findProgramAddressSync(
      [Buffer.from("status")],
      program.programId
    );

    setLoading(true);
    const lockTime4 = 2 * 24 * 60 * 60;
    const lockTime5 = 8 * 24 * 60 * 60;
    const lockTime6 = 16 * 24 * 60 * 60;
    // Create 3 pools
    const create4 = await program.methods
      .createPool(4, 50, new BN(lockTime4.toString()))
      .accounts({
        signer: anchorWallet.publicKey,
        newPool: newPoolAccount4,
        status: statusAccount,
      })
      .transaction();
    create4.add(
      await program.methods
        .createPool(5, 80, new BN(lockTime5.toString()))
        .accounts({
          signer: anchorWallet.publicKey,
          newPool: newPoolAccount5,
          status: statusAccount,
        })
        .instruction()
    );
    create4.add(
      await program.methods
        .createPool(6, 160, new BN(lockTime6.toString()))
        .accounts({
          signer: anchorWallet.publicKey,
          newPool: newPoolAccount6,
          status: statusAccount,
        })
        .instruction()
    );
    // Set 3 pools to inactive
    create4.add(
      await program.methods
        .setPoolActiveStatus(1, false)
        .accounts({
          signer: anchorWallet.publicKey,
          pool: newPoolAccount1,
          status: statusAccount,
        })
        .instruction()
    );
    create4.add(
      await program.methods
        .setPoolActiveStatus(2, false)
        .accounts({
          signer: anchorWallet.publicKey,
          pool: newPoolAccount2,
          status: statusAccount,
        })
        .instruction()
    );
    create4.add(
      await program.methods
        .setPoolActiveStatus(3, false)
        .accounts({
          signer: anchorWallet.publicKey,
          pool: newPoolAccount3,
          status: statusAccount,
        })
        .instruction()
    );
    if (!provider) return setLoading(false);

    await provider
      .sendAndConfirm(create4)
      .then((tx) => console.log(tx))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  return (
    <button
      className="btn btn-primary"
      disabled={loading}
      onClick={() => createNewPools()}
    >
      {loading ? (
        <span className="loading loading-spinner" />
      ) : (
        "Adjust Pool Params"
      )}
    </button>
  );
}
