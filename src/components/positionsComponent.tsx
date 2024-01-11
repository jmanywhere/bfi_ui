"use client";

import {
  usePoolExitActions,
  useStakingPoolId,
} from "@/hooks/useStakingProgram";
import { differenceInSeconds } from "date-fns/differenceInSeconds";
import { format } from "date-fns/format";
import { formatDistanceStrict } from "date-fns/formatDistanceStrict";
import compact from "lodash/compact";

const PositionsComponent = () => {
  const { data: pool1, refetch: rf1 } = useStakingPoolId(1);
  const { data: pool2, refetch: rf2 } = useStakingPoolId(2);
  const { data: pool3, refetch: rf3 } = useStakingPoolId(3);

  const { claim, exit, compound, loading, currentTx } = usePoolExitActions();
  console.log({ pool1, pool2, pool3 });
  const pools = [pool1, pool2, pool3];
  const poolRows = compact(
    pools.map((pool, index) => {
      if (!pool) return null;
      const { userPoolInfo, poolInfo } = pool;
      if (!userPoolInfo || !poolInfo || userPoolInfo.amount.isZero())
        return null;
      const lockTime = poolInfo.lockTime.toNumber();
      const endTime = (userPoolInfo.startTime.toNumber() + lockTime) * 1000;
      const diff = differenceInSeconds(endTime, new Date()) / 1000;
      const earned = (userPoolInfo.amount * poolInfo.basisPoints) / 100;
      return (
        <tr
          key={`table_item_${index}`}
          className="text-center text-soft-blue font-roboto-condensed border-collapse border-secondary text-lg"
        >
          <td>
            {formatDistanceStrict(0, poolInfo.lockTime.toNumber() * 1000)}
          </td>
          <td>{(userPoolInfo.amount / 1e6).toLocaleString()}</td>
          <td>
            {(
              (diff < 0 ? earned : (earned * diff) / poolInfo.lockTime) / 1e6
            ).toLocaleString()}
          </td>
          <td>{format(endTime, "yyyy-MM-dd HH:mm")}</td>
          <td className="flex flex-row gap-2 justify-center">
            {userPoolInfo.claimed ? (
              <span className="text-success font-bold">CLAIMED</span>
            ) : (
              <>
                <button
                  className="btn btn-outline btn-success"
                  disabled={diff > 0 || loading}
                  onClick={() => claim(index + 1)}
                >
                  {loading ? (
                    <span className="loading loading-spinner" />
                  ) : (
                    "Claim"
                  )}
                </button>
                <button
                  className="btn btn-outline btn-error"
                  onClick={() => exit(index + 1)}
                  disabled={loading}
                >
                  {loading ? (
                    <span className="loading loading-spinner" />
                  ) : (
                    "Exit"
                  )}
                </button>
              </>
            )}
          </td>
        </tr>
      );
    })
  );
  return (
    <section className="flex flex-col items-center px-5 md:px-10 py-5">
      <div className="w-full max-w-[1440px] rounded-xl bg-off-white py-10 px-7">
        <h2 className="text-3xl font-poppins text-secondary font-bold pb-3">
          Stake Positions
        </h2>
        <div className="overflow-x-auto">
          <table className="table  table-pin-rows table-pin-cols">
            <thead>
              <tr className="bg-off-white text-primary font-roboto font-boold text-xl">
                <td>Lock Type</td>
                <td>BFI Staked</td>
                <td>BFI Earned</td>
                <td>Unlock Time</td>
                <td className="text-center">Actions</td>
              </tr>
            </thead>
            <tbody>
              {poolRows.length > 0 ? (
                poolRows
              ) : (
                <tr>
                  <td colSpan={5} className="text-center">
                    No Staked Positions
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default PositionsComponent;
