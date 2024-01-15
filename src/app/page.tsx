import Image from "next/image";
import logo from "@/../public/bonkfi_logo.png";
import sol_logo from "@/../public/solana icon.png";
import Link from "next/link";
import TokenStats from "@/components/TokenStats";
export default function Home() {
  return (
    <main className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-between py-24 px-2 xs:px-8 md:px-24 gap-6">
      <div className="border-2 border-primary rounded-2xl">
        <div className=" p-10 max-w-3xl">
          <div className="flex flex-col items-center pb-10">
            <div className=" w-40 h-40 relative">
              <Image src={logo} alt="Logo for Hero card" />
            </div>
          </div>
          <div className="w-full relative flex flex-col-reverse md:flex-col items-center pb-6">
            <div className="w-full relative flex flex-col px-0 md:px-36 justify-center">
              <h1 className="text-5xl font-bold text-center text-primary font-anton mb-4 relative">
                Welcome to BonkFi
              </h1>
              <p className="text-3xl text-center text-secondary font-roboto-condensed capitalize font-bold">
                The Ultimate Meme DeFi Experience on Solana!
              </p>
            </div>
          </div>
          <p className="font-poppins text-black whitespace-pre-wrap">
            Channeling the energy of Bonk, Solana&apos;s first community-centric
            dog coin.
            {"\n"}
            <strong>Mission:</strong>&nbsp;Creating a playful yet powerful DeFi
            ecosystem, transcending traditional tokenomics.
            {"\n"}
            <strong>Culture:</strong>&nbsp; A blend of DeFi&apos;s innovation
            and the vibrant meme culture.
          </p>
          <TokenStats />
        </div>
        <hr className="border-secondary" />
        <div className="p-10 max-w-3xl w-full">
          <h2 className="text-5xl font-anton pb-4 text-soft-blue">
            Token Fundamentals
          </h2>
          <p className="font-poppins text-black whitespace-pre-wrap text-xl">
            <strong className="text-base">Name:</strong>
            {"\n"}
            BonkFi
            {"\n"}
            <strong className="text-base">Ticker:</strong>
            {"\n"}
            BFi
            {"\n"}
            <strong className="text-base">Starting Supply:</strong>
            {"\n"}1 Billion - True to Bonk&apos;s ethos of equality
            {"\n"}
            <strong className="text-base">Buy/Sell Taxes:</strong>
            {"\n"}
            Zero - Because fairness matters!
            {"\n"}
          </p>
        </div>
        <hr className="border-secondary" />
        <div className="p-10 max-w-3xl w-full">
          <h2 className="text-5xl font-anton pb-4 text-soft-blue">
            Staking Adventures
          </h2>
          <h3 className="text-2xl font-anton pb-4 text-secondary">
            Memes Meet Money
          </h3>
          <p className="font-poppins text-black whitespace-pre-wrap">
            <strong className="text-base">
              Rocket Ride Tier (60-Day Lock):
            </strong>
            {"\n"}
            Blast off with a 60% reward! For example, staking 100,000 BFi gets
            you 60,000 BFi.
            {"\n"}
            {"\n"}
            <strong className="text-base">
              HODL Harbor Tier (180-Day Lock):
            </strong>
            {"\n"}
            Anchor down for a 220% reward, a safe harbor for the HODLers.
            {"\n"}
            {"\n"}
            <strong className="text-base">
              Moon Mission Tier (360-Day Lock):
            </strong>
            {"\n"}Embark on a grand journey with a 600% reward, aiming for the
            stars.
          </p>
          <h3 className="text-2xl font-anton pt-4 pb-2 text-secondary">
            Staking Benefits
          </h3>
          <p className="font-poppins text-black whitespace-pre-wrap">
            <strong>Mint-on-Claim Rewards:</strong> No max supply to limit your
            gains.
            {"\n"}
            <strong>Emergency Unstake:</strong> A nominal 5% fee for those
            unforeseen moments.
          </p>
          <div className="flex flex-row items-center pt-4 justify-center">
            <Link href="/staking" className="btn btn-primary text-white btn-lg">
              Stake Now
            </Link>
          </div>
        </div>
        <hr className="border-secondary" />
        <div className="p-10 max-w-3xl">
          <div className="flex flex-row items-center gap-4 pb-4">
            <h4 className="text-5xl font-anton text-soft-blue">Why Solana?</h4>
            <div className=" w-16 h-16">
              <Image src={sol_logo} alt="Logo for Solana" />
            </div>
          </div>
          <p className="font-poppins text-black whitespace-pre-wrap text-xl">
            Fast, efficient, and cost-effective - the perfect blockchain for our
            innovative meme-DeFi fusion.
          </p>
          <h3 className="text-2xl font-anton py-4 text-secondary">
            Join the BonkFi Revolution
          </h3>
          <p className="font-poppins text-black whitespace-pre-wrap text-xl"></p>
          Zero fees, engaging rewards, and a commitment to community -
          that&apos;s the BonkFi promise.
        </div>
      </div>
    </main>
  );
}
