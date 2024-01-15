"use client";
import { BaseWalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { tokenMintProgram } from "@/data/programKeys";

const LABELS = {
  "change-wallet": "Change wallet",
  connecting: "Connecting ...",
  "copy-address": "Copy address",
  copied: "Copied",
  disconnect: "Disconnect",
  "has-wallet": "Connect",
  "no-wallet": "Connect",
} as const;

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoMdMenu } from "react-icons/io";

export default function Nav() {
  const pathname = usePathname();
  return (
    <>
      <nav className="md:flex flex-row items-center gap-4 pr-4 font-roboto-condensed text-white uppercase text-lg hidden">
        <Link
          className={
            pathname === "/" ? "text-accent underline underline-offset-4" : ""
          }
          href="/"
        >
          Home
        </Link>
        <a
          href={`https://raydium.io/swap/?inputCurrency=sol&outputCurrency=${tokenMintProgram}&fixed=in`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Swap
        </a>
        <Link
          className={
            pathname === "/staking"
              ? "text-accent underline underline-offset-4"
              : ""
          }
          href="/staking"
        >
          Stake
        </Link>
        <Link href="/#about">About</Link>
      </nav>
      <div className="mr-2 md:mr-0">
        <BaseWalletMultiButton
          labels={LABELS}
          style={{ background: "white", color: "orange", borderRadius: "16px" }}
        />
      </div>

      <div className="dropdown dropdown-end md:hidden">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-secondary btn-circle"
        >
          <IoMdMenu className="text-xl" />
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-gray-500 rounded-box w-52"
        >
          <li>
            <Link
              className={
                pathname === "/"
                  ? "text-accent underline underline-offset-4"
                  : ""
              }
              href="/"
            >
              Home
            </Link>
          </li>
          <li>
            <a
              href="https://raydium.io/swap/?inputCurrency=sol&outputCurrency=4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R&fixed=in"
              target="_blank"
              rel="noopener noreferrer"
            >
              Swap
            </a>
          </li>
          <li>
            <Link
              className={
                pathname === "/staking"
                  ? "text-accent underline underline-offset-4"
                  : ""
              }
              href="/staking"
            >
              Stake
            </Link>
          </li>
          <li>
            <Link href="/#about">About</Link>
          </li>
        </ul>
      </div>
    </>
  );
}
