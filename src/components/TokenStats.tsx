"use client";

import useStakingProgram, { useGeneralData } from "@/hooks/useStakingProgram";

export default function TokenStats() {
  useStakingProgram();
  const { tokenSupply, totalStaked } = useGeneralData();

  return (
    <div className="justify-evenly flex flex-col sm:flex-row flex-wrap items-center pt-6 gap-4">
      <div className="stats drop-shadow">
        <div className="stat bg-primary">
          <div className="stat-desc">BFi</div>
          <div className="stat-value text-white">
            {tokenSupply
              ? Intl.NumberFormat("en-US", {
                  notation: "compact",
                  maximumFractionDigits: 2,
                }).format(tokenSupply)
              : 0}
          </div>
          <div className="stat-title text-accent">Total Supply</div>
        </div>
      </div>
      <div className="stats drop-shadow">
        <div className="stat bg-primary">
          <div className="stat-desc">BFi</div>
          <div className="stat-value text-white">
            {totalStaked
              ? Intl.NumberFormat("en-US", {
                  notation: "compact",
                  maximumFractionDigits: 2,
                }).format(totalStaked)
              : 0}
          </div>
          <div className="stat-title text-accent">Total Staked</div>
        </div>
      </div>
      <div className="stats drop-shadow">
        <div className="stat bg-primary">
          <div className="stat-desc">BFi</div>
          <div className="stat-value text-white">TBD</div>
          <div className="stat-title text-accent">Price</div>
        </div>
      </div>
    </div>
  );
}
