/* eslint-disable camelcase */
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Instrument_Sans, Kavoon, Instrument_Serif } from "next/font/google";
import "./globals.css";
import ClientLayout from "./client-layout";
import Header from "@/common/components/header/Header";
import Footer from "@/common/components/footer/Footer";

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
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined&family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,400,1,0&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${instrumentSans.variable} ${kavoon.variable} ${instrumentSerif.variable}`}
      >
        <NextIntlClientProvider messages={messages}>
          <ClientLayout>
            <Header />
            {children}
            <Footer />
          </ClientLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
