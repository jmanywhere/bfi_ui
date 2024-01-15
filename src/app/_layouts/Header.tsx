import Image from "next/image";

import logo from "@/../public/bonkfi_logo.png";
import Nav from "@/app/_layouts/Nav";

export default function Header() {
  return (
    <header className="navbar bg-primary">
      <div className="navbar-start">
        <div className="w-16 h-16 ">
          <Image src={logo} alt="Bonkfi Logo" />
        </div>
        <div className="hidden sm:block sm:text-4xl text-white font-anton pl-4">
          BonkFi
        </div>
      </div>
      <div className="navbar-end w-full">
        <Nav />
      </div>
    </header>
  );
}
