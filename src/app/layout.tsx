import type { Metadata } from "next";
import { Poppins, Anton, Roboto_Condensed } from "next/font/google";
import "./globals.css";
import { Providers } from "@/app/_layouts/Providers";
import classNames from "classnames";
import Header from "./_layouts/Header";

const roboto_condensed = Roboto_Condensed({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto-condensed",
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-poppins",
});
const anton = Anton({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-anton",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={classNames(
          poppins.variable,
          anton.variable,
          roboto_condensed.variable,
          poppins.className
        )}
      >
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
