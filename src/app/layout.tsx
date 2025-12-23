/* eslint-disable camelcase */
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Instrument_Sans, Kavoon, Instrument_Serif } from "next/font/google";
import "./globals.css";
import Header from "@/common/components/header/Header";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
});

const kavoon = Kavoon({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-kavoon",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-instrument-serif",
});

export const metadata: Metadata = {
  title: "Lopply",
  description: "",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();

  return (
    <html lang="en">
      <head></head>
      <body
        className={`${instrumentSans.variable} ${kavoon.variable} ${instrumentSerif.variable}`}
      >
        <NextIntlClientProvider messages={messages}>
          <Header />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
