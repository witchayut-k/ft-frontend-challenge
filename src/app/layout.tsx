import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Providers from "@/components/Providers";
import { ChildrenType } from "@/core/types";
import DefaultLayout from "@/layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "Weather App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<ChildrenType>): JSX.Element {
  return (
    <html lang="en">
      <body className="flex is-full min-h-full flex-auto flex-col bg-gray-100">
        <Providers>
          <DefaultLayout>{children}</DefaultLayout>
        </Providers>
      </body>
    </html>
  );
}
