"use client";

import useStakingProgram, { useStakingPoolId } from "@/hooks/useStakingProgram";
import { BN } from "@coral-xyz/anchor";

const CardComponent = () => {
  useStakingProgram();

  const { data: pool1, refetch: rf1 } = useStakingPoolId(1);
  const { data: pool2, refetch: rf2 } = useStakingPoolId(2);
  const { data: pool3, refetch: rf3 } = useStakingPoolId(3);
  const lockedAmount1 = pool1?.userPoolInfo?.claimed
    ? new BN("0")
    : pool1?.userPoolInfo?.amount || new BN("0");
  const lockedAmount2 = pool2?.userPoolInfo?.claimed
    ? new BN("0")
    : pool2?.userPoolInfo?.amount || new BN("0");
  const lockedAmount3 = pool3?.userPoolInfo?.claimed
    ? new BN("0")
    : pool3?.userPoolInfo?.amount || new BN("0");
  const totalLocked: BN = lockedAmount1.add(lockedAmount2).add(lockedAmount3);
  return (
    <section className="py-10 px-2 md:px-10 flex flex-col items-center">
      <div className="bg-primary rounded-lg px-10 py-5 text-white font-bold font-roboto-condensed text-lg w-full max-w-[1440px]">
        <div className="border-b-[1px] border-soft-blue flex justify-between py-2 md:py-5">
          <p>BFI Locked 60 Days (60%)</p>
          <p>{(parseFloat(lockedAmount1.toString()) / 1e9).toLocaleString()}</p>
        </div>
        <div className="border-b-[1px] border-soft-blue flex justify-between py-2 md:py-5">
          <p>BFI Locked 180 Days (220%)</p>
          <p>{(parseFloat(lockedAmount2.toString()) / 1e9).toLocaleString()}</p>
        </div>
        <div className="border-b-[1px] border-soft-blue flex justify-between py-2 md:py-5">
          <p>BFI Locked 360 Days (600%)</p>
          <p>{(parseFloat(lockedAmount3.toString()) / 1e9).toLocaleString()}</p>
        </div>
        <div className="border-b-[1px] border-soft-blue flex justify-between py-2 md:py-5">
          <p>Total Bfi Locked</p>
          <p>{(totalLocked / 1e9).toLocaleString()}</p>
        </div>
      </div>
    </section>
  );
};

export default CardComponent;
