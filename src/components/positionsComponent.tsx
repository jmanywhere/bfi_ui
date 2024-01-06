const PositionsComponent = () => {
  const tableContent = [
    {
      type: "1-11-1111",
      bfiStacked: 500,
      bfiEarned: 100,
      unlockTime: 120,
    },
    {
      type: "1-11-1111",
      bfiStacked: 500,
      bfiEarned: 100,
      unlockTime: 120,
    },
    {
      type: "1-11-1111",
      bfiStacked: 500,
      bfiEarned: 100,
      unlockTime: 120,
    },
    {
      type: "1-11-1111",
      bfiStacked: 500,
      bfiEarned: 100,
      unlockTime: 120,
    },
  ];

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
                <td>Actions</td>
              </tr>
            </thead>
            <tbody>
              {tableContent.map((item, i) => (
                <tr
                  key={`table_item_${i}`}
                  className="text-center text-soft-blue font-roboto-condensed border-collapse border-secondary text-lg"
                >
                  <td>{item.type}</td>
                  <td>{item.bfiStacked}</td>
                  <td>{item.bfiEarned}</td>
                  <td>{item.unlockTime}</td>
                  <td>
                    <button className="btn btn-ghost  text-2xl bg-transparent border-primary border-4 text-center">
                      Claim
                    </button>
                  </td>
                  <td>
                    <button className="btn btn-ghost text-2xl bg-transparent border-primary border-4 text-center">
                      Exit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default PositionsComponent;
