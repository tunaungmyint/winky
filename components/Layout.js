import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
export default function Layout({ title, children }) {
  return (
    <>
      <Head>
        <title>{title ? title + ' - Winky' : 'Winky'}</title>
        <meta name="description" content="Cake Coffee " />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex min-h-screen flex-col justify-between ">
        <header>
          <nav className="flex h-12 items-center px-4 justify-between shadow-md">
            <Link href="/">
              <a className="text-lg font-bold flex justify-center items-center">
                <Image
                  src="/images/logo-winky.png"
                  width={50}
                  height={50}
                  alt="logo"
                ></Image>
                <span className="ml-5">Winky Food Family</span>
              </a>
            </Link>
            <div>
              <Link href="/address">
                <a className="p-2">Address</a>
              </Link>
              <Link href="/aboutUs">
                <a className="p-2">About Us</a>
              </Link>
            </div>
          </nav>
        </header>
        <main className="container m-auto mt-4 px-4">{children}</main>
        <footer className="flex h-10 justify-center items-center shadow-inner mt-4">
          <p>Copyright © 2022 Winky</p>
        </footer>
      </div>
    </>
  );
}
