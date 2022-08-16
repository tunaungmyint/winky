import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { ToastContainer } from 'react-toastify';
import { Menu } from '@headlessui/react';
import { Store } from '../utils/Store';
import { useContext, useEffect, useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import 'react-toastify/dist/ReactToastify.css';
import DropdownLink from './DropdownLink';
import Cookies from 'js-cookie';
import { ShoppingCartIcon, UserIcon } from '@heroicons/react/outline';

export default function Layout({ title, children }) {
  const { status, data: session } = useSession();

  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);
  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);

  const logoutClickHandler = () => {
    Cookies.remove('cart');
    dispatch({ type: 'CART_RESET' });
    signOut({ callbackUrl: '/login' });
  };

  return (
    <>
      <Head>
        <title>{title ? title + ' - Winky' : 'Winky'}</title>
        <meta name="description" content="Cake Coffee " />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ToastContainer position="bottom-center" limit={1} />

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
            <div className="flex justify-center items-center">
              <Link href="/cart">
                <a className="p-2">
                  <div className="flex mr-3">
                    {' '}
                    <ShoppingCartIcon className="h-5 w-5 mr-1" /> Cart
                    {cartItemsCount > 0 && (
                      <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                        {cartItemsCount}
                      </span>
                    )}
                  </div>
                </a>
              </Link>

              {status === 'loading' ? (
                'loading'
              ) : session?.user ? (
                <Menu as="div" className="relative inline-block z-10">
                  <Menu.Button className="text-amber-600">
                    <div className="flex">
                      <UserIcon className="h-5 w-5 mr-1" /> {session.user.name}
                    </div>
                  </Menu.Button>
                  <Menu.Items className="absolute right-0 w-56 origin-top-right bg-white shadow-lg">
                    <Menu.Item>
                      <DropdownLink className="dropdown-link" href="/profile">
                        Profile
                      </DropdownLink>
                    </Menu.Item>

                    <Menu.Item>
                      <DropdownLink
                        className="dropdown-link"
                        href="/order-history"
                      >
                        Order History
                      </DropdownLink>
                    </Menu.Item>

                    {session.user.isAdmin && (
                      <Menu.Item>
                        <DropdownLink
                          className="dropdown-link"
                          href="/admin/dashboard"
                        >
                          Admin Dashboard
                        </DropdownLink>
                      </Menu.Item>
                    )}

                    <Menu.Item>
                      <a
                        className="dropdown-link"
                        href="#"
                        onClick={logoutClickHandler}
                      >
                        Logout
                      </a>
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              ) : (
                <Link href="/login">
                  <a className="p-2">Login</a>
                </Link>
              )}
            </div>
          </nav>
        </header>
        <main className="container m-auto mt-4 px-4">{children}</main>
        <footer className="flex justify-center items-center shadow-inner p-5 flex-col bg-gray-800">
          <p className="text-white m-4">Copyright © 2022 Winky </p>
        </footer>
      </div>
    </>
  );
}
