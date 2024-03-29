"use client";
import Image from "next/image";
import Logo from "@/../public/bonkfi_logo.png";
import { useState, useCallback, useEffect } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { getAssociatedTokenAddressSync } from "@solana/spl-token";
import { tokenMintProgram } from "@/data/programKeys";
import { useStakeAction } from "@/hooks/useStakingProgram";
import { BN } from "@coral-xyz/anchor";
import { IoReload } from "react-icons/io5";
const StakeComponent = () => {
  const [inputValue, setInputValue] = useState("");
  const [inputDays, setInputDays] = useState(7);
  const [currentSOLBalance, setCurrentSolBalance] = useState(0);
  const dropdownOptions = [2, 8, 16];

  const connection = useConnection();
  const { publicKey } = useWallet();

  const { action, loading } = useStakeAction();

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
    const interval = setInterval(getBalance, 30000);
    return () => {
      clearInterval(interval);
    };
  }, [connection, getBalance]);

  return (
    <section className="py-10 px-2 md:px-10  flex flex-col items-center">
      <div className="rounded-xl border-secondary border-4 px-5 lg:px-16 py-5 md:py-10 w-full max-w-[1440px]">
        <div className="flex flex-col lg:flex-row items-center lg:items-start md:pb-8 lg:pb-3 gap-4">
          <div className="max-h-[100px] max-w-[100px]">
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
              <option key={`day_option_${i}`} className="w-full" value={i + 7}>
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
            onFocus={(e) => e.target.select()}
            onChange={(e) => {
              if (isNaN(parseFloat(e.target.value))) setInputValue("");
              else setInputValue(e.target.valueAsNumber.toString());
            }}
            className="input w-full bg-transparent text-white text-5xl font-poppins text-center focus:outline-none focus:border-none placeholder:text-white/60"
          />
        </div>
        <div className="pt-5 lg:pt-2 pb-10 flex flex-col md:flex-row md:justify-between">
          <div className="flex items-center justify-between pb-3 md:pb-0">
            <p className="text-soft-blue font-poppins font-bold text-2xl">
              BFI in Wallet
            </p>
            <button className="btn mx-2 btn-circle btn-sm">
              <IoReload onClick={getBalance} />
            </button>
            <p className="text-primary font-poppins text-2xl">
              {currentSOLBalance.toLocaleString()}
            </p>
          </div>
          <div className="rounded-xl bg-primary text-accent  py-1 px-2 text-center flex items-center self-end gap-3">
            <button
              className="border-r-2 border-accent px-3"
              onClick={() =>
                setInputValue((currentSOLBalance * 0.25).toFixed(3))
              }
            >
              25%
            </button>
            <button
              className="border-r-2 border-accent px-3"
              onClick={() =>
                setInputValue((currentSOLBalance * 0.5).toFixed(3))
              }
            >
              50%
            </button>
            <button onClick={() => setInputValue(currentSOLBalance.toFixed(3))}>
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
                (parseFloat(inputValue || "0") * 1e3).toString()
              );
              if (amount.lte(new BN(0))) return;
              console.log({ inputDays, amount });
              action(inputDays, amount);
              setTimeout(() => {
                getBalance();
              }, 5000);
            }}
          >
            {loading ? <span className="loading loading-spinner" /> : "STAKE"}
          </button>
          <p className="text-black/50 font-poppins text-sm pt-3">
            DISCLAIMER: If you stake while your current position is still
            ongoing. Your rewards will be locked and will be able to be claimed
            until the new position is over.
          </p>
        </div>
      </div>
    </section>
  );
};

export default StakeComponent;
