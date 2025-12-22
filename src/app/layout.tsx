/* eslint-disable camelcase */
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Instrument_Sans, Kavoon } from "next/font/google";
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
      <body className={`${instrumentSans.variable} ${kavoon.variable}`}>
        <NextIntlClientProvider messages={messages}>
          <Header />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
