import Image from "next/image";
import logo from "@/../public/bonkfi_logo.png";
export default function Home() {
  return (
    <main className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-between py-24 px-2 xs:px-8 md:px-24 gap-6">
      <div className="border-2 border-primary rounded-2xl p-10 max-w-3xl">
        <div className="w-full relative flex flex-col-reverse md:flex-col items-center pb-6">
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
        <p className="font-poppins text-black">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
          finibus odio. Donec finibus arcu ac turpis accumsan rutrum. Etiam
          sapien tortor,
        </p>
        <div className="justify-evenly flex flex-row flex-wrap items-center pt-6 gap-4">
          <div className="stats drop-shadow">
            <div className="stat bg-primary">
              <div className="stat-desc">BFi</div>
              <div className="stat-value text-white">5M</div>
              <div className="stat-title text-accent">Total Supply</div>
            </div>
          </div>
          <div className="stats drop-shadow">
            <div className="stat bg-primary">
              <div className="stat-desc">BFi</div>
              <div className="stat-value text-white">4M</div>
              <div className="stat-title text-accent">Total Staked</div>
            </div>
          </div>
          <div className="stats drop-shadow">
            <div className="stat bg-primary">
              <div className="stat-desc">BFi</div>
              <div className="stat-value text-white">1.2345</div>
              <div className="stat-title text-accent">Price</div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-2 border-primary rounded-2xl p-10 max-w-3xl">
        <h2 className="text-5xl font-anton pb-4 text-soft-blue">
          Some More Info...
        </h2>
        <p>This is cool stuff</p>
        <p className="font-poppins text-black">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
          finibus odio. Donec finibus arcu ac turpis accumsan rutrum. Etiam
          sapien tortor,
        </p>
      </div>
      <div>Stats Bonkfi</div>
    </main>
  );
}
