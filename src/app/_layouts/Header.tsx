import Image from "next/image";

import logo from "@/../public/bonkfi_logo.png";
import Nav from "@/app/_layouts/Nav";

export default function Header() {
  return (
    <header className="navbar bg-primary">
      <div className="navbar-start flex-col items-center xs:flex-row w-[42px] xs:w-auto">
        <div className=" w-10 h-10 xs:w-16 xs:h-16 pt-1 rounded-full bg-white">
          <Image src={logo} alt="Bonkfi Logo" />
        </div>
        <div className="text-base xs:text-xl sm:text-4xl text-white font-anton xs:pl-4">
          BonkFi
        </div>
      </div>
      <div className="navbar-end w-full">
        <Nav />
      </div>
    </header>
  );
}
