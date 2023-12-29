import Image from "next/image";
import logo from "@/../public/bonkfi_logo.png";
export default function Home() {
  return (
    <main className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-between py-24 px-8 md:px-24">
      <div className="border-2 border-primary rounded-2xl p-10 max-w-3xl">
        <div className="w-full relative flex flex-col-reverse md:flex-col items-center">
          <div className="w-full relative flex flex-col px-0 md:px-36 justify-center">
            <h1 className="text-5xl font-bold text-center text-primary font-anton mb-4 relative">
              Bonk Fi
            </h1>
            <p className="text-3xl text-center text-secondary font-roboto-condensed capitalize font-bold">
              Slogan goes here
            </p>
          </div>
          <div className=" w-36 h-36 md:absolute relative md:-top-[20px] top-0 left-0">
            <Image src={logo} alt="Logo for Hero card" />
          </div>
        </div>
      </div>
      <div>More Bonkfi</div>
      <div>Stats Bonkfi</div>
    </main>
  );
}
