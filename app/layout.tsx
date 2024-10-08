// app/layout.tsx
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import "./globals.css";

import { Fira_Code } from 'next/font/google';
import { Roboto } from 'next/font/google';

const firaCode = Fira_Code({
  subsets: ['latin'],
  weight: "300",
  variable: '--font-fira-code',
});

const init_roboto = Roboto({
  subsets: ['latin'],
  weight: ['100','300'],
  variable: '--font-fira-code',
});

export const metadata: Metadata = {
  title: "Myonster portfolio",
  description: "Myonster with NextJs TailwindCSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${firaCode.variable} ${init_roboto.variable} antialiased`}
      >
        <ThemeProvider attribute="class">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
