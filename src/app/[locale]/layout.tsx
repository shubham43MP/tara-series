import { ReactNode } from 'react';
import Header from '@/components/Header';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Montserrat } from 'next/font/google';
import './globals.css';
import Head from 'next/head';

const montserrate = Montserrat({ subsets: ['latin'] });

export async function generateMetadata({
  params
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const awaitedParams = await params;
  const locale = awaitedParams.locale;

  return {
    title: 'Tara Calculator',
    description: `Tara Calculator - ${locale.toUpperCase()} version`
  };
}

interface RootLayoutProps {
  children: ReactNode;
  params: {
    locale: string;
  };
}

export default async function RootLayout({
  children,
  params
}: Readonly<RootLayoutProps>) {
  const { locale } = await params;

  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <Head>
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="48x48"
          href="/favicon-48x48.png"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className={`${montserrate.className} p-0 m-0 box-border`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header />
          <div className="text-white">{children}</div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
