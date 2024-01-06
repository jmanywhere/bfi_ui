const Footer = () => {
  return (
    <footer className="flex flex-col items-center pt-16 pb-14">
      <div className="max-w-[750px] lg:max-w-[1440px] w-full flex flex-col items-center px-10">
        <div className="grid grid-cols-2 md:flex md:justify-center md:break gap-5 md:gap-10 pb-10 flex-wrap">
          <a
            className="underline text-soft-blue uppercase font-poppins"
            href="https://twitter.com/"
          >
            X/Twitter
          </a>
          <a
            className="underline text-soft-blue uppercase font-poppins"
            href="https://www.instagram.com/"
          >
            instagram
          </a>
          <a
            className="underline text-soft-blue uppercase font-poppins"
            href="https://web.telegram.org/"
          >
            telegram
          </a>
          <a
            className="underline text-soft-blue uppercase font-poppins"
            href="https://github.com//"
          >
            github
          </a>
          <a
            className="underline text-soft-blue uppercase font-poppins"
            href="https://twitter.com/"
          >
            docs
          </a>
          <a
            className="underline text-soft-blue uppercase font-poppins"
            href="https://medium.com/"
          >
            medium
          </a>
          <a
            className="underline text-soft-blue uppercase font-poppins"
            href="https://www.reddit.com/"
          >
            reddit
          </a>
          <a
            className="underline text-soft-blue uppercase font-poppins"
            href="https://coinmarketcap.com/"
          >
            cmc
          </a>
          <a
            className="underline text-soft-blue uppercase font-poppins"
            href="https://www.coingecko.com/"
          >
            coingecko
          </a>
        </div>
        <p className="text-black font-poppins font-medium">
          All Rights Reserved © 2024 Bonkfi
        </p>
      </div>
    </footer>
  );
};

export default Footer;
