import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import CheckoutWizard from '../components/CheckoutWizard';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';
import { getError } from '../utils/error';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function PlaceOrderScreen() {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { cartItems, shippingAddress, paymentMethod } = cart;

  // const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
  const itemsPrice = cartItems.reduce((a, c) => a + c.quantity * c.price, 0);

  // 123.4567 => 123.46

  const totalPrice = itemsPrice;
  const router = useRouter();

  useEffect(() => {
    if (!paymentMethod) {
      router.push('/payment');
    }
  }, [paymentMethod, router]);

  const [loading, setLoading] = useState(false);

  const PlaceOrderHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post('/api/orders', {
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,

        totalPrice,
      });

      setLoading(false);
      dispatch({ type: 'CART_CLEAR_ITEMS' });
      Cookies.set(
        'cart',
        JSON.stringify({
          ...cart,
          cartItems: [],
        })
      );

      router.push(`/order/${data._id}`);
      // router.push('/placeorder');
    } catch (err) {
      setLoading(false);
      toast.error(getError(err));
    }
  };

  return (
    <Layout title="Place Order">
      <CheckoutWizard activeStep={3} />
      <h1 className="mb-4 text-xl">Place Order</h1>
      {cartItems.length === 0 ? (
        <div>
          <h4 className="mb-4">ဝယ်ယူအားပေးမှုကို အထူးကျေးဇူးတင်ပါသည်။</h4>
          Cart is empty. &nbsp;<Link href="/"> Go shopping...</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <div className="card p-5">
              <h2 className="mb-2 text-lg">Shipping Address</h2>
              <div>
                {shippingAddress.fullName}, {shippingAddress.address},{' '}
                {shippingAddress.phone}
              </div>
              <div>
                <Link href="/shipping">Edit</Link>
              </div>
            </div>
            <div className="card p-5">
              <h2 className="mb-2 text-lg">Payment Method</h2>
              <div>{paymentMethod}</div>
              <div>
                <Link href="/payment">Edit</Link>
              </div>
            </div>
            <div className="card overflow-x-auto p-5">
              <h2 className="mb-2 text-lg">Order Items</h2>
              <table className="min-w-full">
                <thead className="border-b">
                  <tr>
                    <th className="px-5 text-left">ပစ္စည်းအမျိုးအမည်</th>
                    <th className="px-5 text-right">အရေအတွက်</th>
                    <th className="px-5 text-right">စျေးနှုန်း</th>
                    <th className="px-5 text-right">စုစုပေါင်း</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item._id} className="border-b">
                      <td>
                        <Link href={`/product/${item.slug}`}>
                          <a className="flex items-center">
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={50}
                              height={50}
                            ></Image>
                            &nbsp;
                            {item.name}
                          </a>
                        </Link>
                      </td>
                      <td className="p-5 text-right">{item.quantity}</td>
                      <td className="p-5 text-right">{item.price} ကျပ်</td>
                      <td className="p-5 text-right">
                        {item.quantity * item.price}ကျပ်
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div>
                <Link href="/cart">Edit</Link>
              </div>
            </div>
          </div>
          <div>
            <div className="card p-5">
              <h2 className="mb-2 text-lg">Order Summary</h2>
              <ul>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>Items</div>
                    <div>{itemsPrice}ကျပ်</div>
                  </div>
                </li>

                <li>
                  <div className="mb-2 flex justify-between">
                    <div>စုစုပေါင်း</div>
                    <div>{totalPrice}ကျပ်</div>
                  </div>
                </li>
                <li>
                  <button
                    disabled={loading}
                    onClick={PlaceOrderHandler}
                    className="primary-button w-full"
                  >
                    {loading ? 'loading...' : 'ဝယ်ယူမည်'}
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

PlaceOrderScreen.auth = true;
