import Image from "next/image";
import Logo from "@/../public/bonkfi_logo.png";

const StakeComponent = () => {
  const percent = 50;
  const percent2 = 100;
  const dropdownOptions = [60, 70, 80, 90];

  return (
    <section className="py-10 px-2 md:px-10  flex flex-col items-center">
      <div className="rounded-lg border-secondary border-4 px-5 lg:px-16 py-5 md:py-10 w-full max-w-[1440px]">
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
          <select className="select select-bordered w-full max-w-xs bg-primary border-none text-accent focus:outline-secondary">
            {[...dropdownOptions].map((number, i) => (
              <option key={number}>
                <a>{`${number} Days`}</a>
              </option>
            ))}
          </select>
        </div>
        <div className="bg-secondary rounded-lg py-5 flex justify-center items-center text-white text-5xl font-poppins">
          0
        </div>
        <div className="pt-5 lg:pt-2 pb-10 flex flex-col md:flex-row md:justify-between">
          <div className="flex items-center justify-between pb-3 md:pb-0">
            <p className="text-soft-blue font-poppins font-bold text-2xl md:pr-10">
              BFI in Wallet
            </p>
            <p className="text-primary font-poppins text-2xl">234561</p>
          </div>
          <p className="rounded-xl bg-primary text-accent px-5 max-w-[130px] text-center flex items-center self-end">{`${percent}% | ${percent2}%`}</p>
        </div>
        <div className="pb-5 lg:px-32">
          <button className="bg-primary text-accent rounded-xl py-3 font-anton text-3xl w-full mb-3">
            STAKE
          </button>
          <p className="text-primary font-poppins text-lg">
            DISCLAIMER TEXT: what happens if you stake when lock has not ended
          </p>
        </div>
      </div>
    </section>
  );
};

export default StakeComponent;
