import { WalletMultiButton } from "@/app/_layouts/ConnectButton";
import Image from "next/image";
import Link from "next/link";

import logo from "@/../public/bonkfi_logo.png";

export default function Header() {
  return (
    <header className="navbar bg-primary">
      <div className="navbar-start">
        <div className="w-16 h-16 pt-1 rounded-full bg-white">
          <Image src={logo} alt="Bonkfi Logo" />
        </div>
        <div className="text-4xl text-white font-anton pl-4">BonkFi</div>
      </div>
      <div className="navbar-end">
        <nav className="flex flex-row items-center gap-4 pr-4 font-roboto-condensed text-white">
          <Link href="/">Home</Link>
          <Link href="/">Swap</Link>
          <Link href="/">Stake</Link>
          <Link href="/#about">About</Link>
        </nav>
        <WalletMultiButton />
      </div>
    </header>
  );
}
