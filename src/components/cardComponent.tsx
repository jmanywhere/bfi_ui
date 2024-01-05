const CardComponent = () => {
  const bfi60 = 100;
  const bfi220 = 100;
  const bfi600 = 100;
  const bfiLocked = 100;
  const bfiAccumulated = 100;

  return (
    <section className="py-10 px-2 md:px-10 flex flex-col items-center">
      <div className="bg-primary rounded-lg px-10 py-5 text-white font-bold font-roboto-condensed text-lg w-full max-w-[1440px]">
        <div className="border-b-[1px] border-soft-blue flex justify-between py-2 md:py-5">
          <p>BFI Locked 60 Days (60%)</p>
          <p>{bfi60}</p>
        </div>
        <div className="border-b-[1px] border-soft-blue flex justify-between py-2 md:py-5">
          <p>BFI Locked 180 Days (220%)</p>
          <p>{bfi220}</p>
        </div>
        <div className="border-b-[1px] border-soft-blue flex justify-between py-2 md:py-5">
          <p>BFI Locked 360 Days (600%)</p>
          <p>{bfi600}</p>
        </div>
        <div className="border-b-[1px] border-soft-blue flex justify-between py-2 md:py-5">
          <p>Total Bfi Locked</p>
          <p>{bfiLocked}</p>
        </div>
        <div className="flex justify-between py-2 md:py-5">
          <p>Total Bfi Accumulated</p>
          <p>{bfiAccumulated}</p>
        </div>
      </div>
    </section>
  );
};

export default CardComponent;
