import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { Store } from '../utils/Store';
import { useContext, useEffect, useState } from 'react';

export default function Layout({ title, children }) {
  const { state } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);
  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);

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
              <Link href="/cart">
                <a className="p-2">
                  Cart
                  {cartItemsCount > 0 && (
                    <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                      {cartItemsCount}
                    </span>
                  )}
                </a>
              </Link>
              <Link href="/login">
                <a className="p-2">Login</a>
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
