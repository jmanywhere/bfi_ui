"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <nav className="flex flex-row items-center gap-4 pr-4 font-roboto-condensed text-white uppercase text-lg">
      <Link
        className={
          pathname === "/" ? "text-accent underline underline-offset-4" : ""
        }
        href="/"
      >
        Home
      </Link>
      <a
        href="https://raydium.io/swap/?inputCurrency=sol&outputCurrency=4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R&fixed=in"
        target="_blank"
        rel="noopener noreferrer"
      >
        Swap
      </a>
      <Link
        className={
          pathname === "/stake"
            ? "text-accent underline underline-offset-4"
            : ""
        }
        href="/stake"
      >
        Stake
      </Link>
      <Link href="/#about">About</Link>
    </nav>
  );
}
