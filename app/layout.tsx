import React from 'react';
import type { Metadata } from 'next';
import { Raleway, Roboto_Slab } from 'next/font/google';
import Nav from '@/common/components/Nav/Nav';
import '@/styles/global.scss';

const raleway = Raleway({
  weight: ['100', '400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-primary',
});

const robotoSlab = Roboto_Slab({
  weight: ['100'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-headline',
});

export const metadata: Metadata = {
  title: 'Mark Arenz',
  description: 'Experienced Software Engineer and Team Leader',
  icons: {
    icon: '/favicon.ico',
    apple: '/img/mms-logo-512.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${raleway.variable} ${robotoSlab.variable}`}>
        <Nav />
        {children}
      </body>
    </html>
  );
}
