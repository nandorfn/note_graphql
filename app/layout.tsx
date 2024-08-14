import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ApolloWrapper } from "./provider/ApolloWrapper";
import { ChakraWrapper } from "./provider/ChakraWrapper";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Notes App",
  description: "Notes App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ApolloWrapper>
          <ChakraWrapper>
            {children}
          </ChakraWrapper>
        </ApolloWrapper>
      </body>
    </html>
  );
}
