"use client";
import Image from "next/image";
import Logo from "@/../public/bonkfi_logo.png";
import { useState, FC, useMemo, useCallback, useEffect } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, Transaction } from "@solana/web3.js";
import { getAssociatedTokenAddressSync } from "@solana/spl-token";
import { tokenMintProgram } from "@/data/programKeys";
import { useStakeAction } from "@/hooks/useStakingProgram";
import { BN } from "@coral-xyz/anchor";

const StakeComponent = () => {
  const [inputValue, setInputValue] = useState("");
  const [inputDays, setInputDays] = useState(1);
  const [currentSOLBalance, setCurrentSolBalance] = useState(0);
  const dropdownOptions = [60, 180, 360];

  const connection = useConnection();
  const { publicKey } = useWallet();

  const { action, loading, currentTx } = useStakeAction();

  const getBalance = useCallback(async () => {
    if (!connection || !publicKey) return;
    const tokenAccount = await getAssociatedTokenAddressSync(
      tokenMintProgram,
      publicKey
    );
    const bal = await connection.connection.getTokenAccountBalance(
      tokenAccount
    );
    setCurrentSolBalance(bal.value.uiAmount || 0);
  }, [connection, setCurrentSolBalance, publicKey]);

  useEffect(() => {
    if (!connection) return;
    getBalance();
    const interval = setInterval(getBalance, 2000);
    return () => {
      clearInterval(interval);
    };
  }, [connection, getBalance]);

  return (
    <section className="py-10 px-2 md:px-10  flex flex-col items-center">
      <div className="rounded-xl border-secondary border-4 px-5 lg:px-16 py-5 md:py-10 w-full max-w-[1440px]">
        <div className="flex flex-col lg:flex-row items-center lg:items-start md:pb-8 lg:pb-3">
          <div className="max-h-[175px] max-w-[198px]">
            <Image src={Logo} alt="logo" className="" />
          </div>
          <h2 className="text-soft-blue font-anton text-2xl py-5 text-center md:text-4xl lg:text-5xl">
            Stake Your BFI to Earn More BFI
          </h2>
        </div>
        <div className="flex flex-col md:flex-row md:justify-between items-center pb-5 md:pb-10 lg:pb-5">
          <h3 className="text-primary text-xl md:text-2xl lg:text-4xl font-bold font-poppins pb-2">
            Choose Stake Duration
          </h3>
          <select
            className="select select-bordered w-full max-w-xs bg-primary border-none text-accent focus:outline-secondary"
            onChange={(e) => {
              setInputDays((prev) => {
                return parseInt(e.target.value);
              });
            }}
            value={inputDays}
          >
            {[...dropdownOptions].map((number, i) => (
              <option key={`day_option_${i}`} className="w-full" value={i + 1}>
                {`${number} Days`}
              </option>
            ))}
          </select>
        </div>
        <p className="text-soft-blue font-poppins font-bold text-2xl">
          BFI Amount
        </p>
        <div className="bg-secondary rounded-lg py-5 flex justify-center items-center ">
          <input
            type="number"
            placeholder="e.g. 1000"
            value={inputValue}
            onChange={(e) => {
              if (isNaN(parseFloat(e.target.value))) setInputValue("");
              else setInputValue(e.target.valueAsNumber.toString());
            }}
            className="input w-full bg-transparent text-white text-5xl font-poppins text-center focus:outline-none focus:border-none placeholder:text-white/60"
          />
        </div>
        <div className="pt-5 lg:pt-2 pb-10 flex flex-col md:flex-row md:justify-between">
          <div className="flex items-center justify-between pb-3 md:pb-0">
            <p className="text-soft-blue font-poppins font-bold text-2xl md:pr-10">
              BFI in Wallet
            </p>
            <p className="text-primary font-poppins text-2xl">
              {currentSOLBalance.toLocaleString()}
            </p>
          </div>
          <div className="rounded-xl bg-primary text-accent  py-1 px-2 text-center flex items-center self-end gap-3">
            <button
              className="border-r-2 border-accent px-3"
              onClick={() =>
                setInputValue((currentSOLBalance * 0.25).toString())
              }
            >
              25%
            </button>
            <button
              className="border-r-2 border-accent px-3"
              onClick={() =>
                setInputValue((currentSOLBalance * 0.5).toString())
              }
            >
              50%
            </button>
            <button onClick={() => setInputValue(currentSOLBalance.toString())}>
              100%
            </button>
          </div>
        </div>
        <div className="pb-5 lg:px-32 flex flex-col items-center">
          <button
            className="btn btn-primary font-anton text-2xl text-accent w-full disabled:bg-gray-400/60"
            disabled={loading || !inputValue}
            onClick={() => {
              const amount: BN = new BN(
                (parseFloat(inputValue || "0") * 1e9).toString()
              );
              if (amount.lte(new BN(0))) return;
              action(inputDays, amount);
            }}
          >
            {loading ? <span className="loading loading-spinner" /> : "STAKE"}
          </button>
          <p className="text-primary font-poppins text-lg pt-3">
            DISCLAIMER TEXT: what happens if you stake when lock has not ended
          </p>
        </div>
      </div>
    </section>
  );
};

export default StakeComponent;
