import { LocationMarkerIcon, PhoneIcon } from '@heroicons/react/outline';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { toast } from 'react-toastify';
import Layout from '../../components/Layout';
import Product from '../../models/Product';

import db from '../../utils/db';
import { Store } from '../../utils/Store';

export default function ProductScreen(props) {
  const { product } = props;
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  if (!product) {
    return <Layout title="Product Not Found">Product Not Found</Layout>;
  }

  const addToCartHandler = async () => {
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      return toast.error('Sorry. Product is out of stock');
    }

    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    router.push('/cart');
  };

  return (
    <Layout title={product.name}>
      <div className="py-2 font-semibold text-slate-700 mb-2">
        <Link href="/">back to Winky Menu</Link>
      </div>
      <div className="grid  md:grid-cols-4 md:gap-3 text-slate-700">
        <div className="md:col-span-2 mb-4">
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            layout="responsive"
          ></Image>
        </div>
        <div className="ml-6 mb-4">
          <ul>
            <li>
              <h1 className="text-lg">{product.name}</h1>
            </li>
            <li>Category: {product.category}</li>
            <li>Brand: {product.brand}</li>

            <li>Description: {product.description}</li>
          </ul>
        </div>
        <div>
          <div>
            <div className="card p-5">
              <div className="mb-2 flex justify-between">
                <div>Price</div>
                <div>{product.price} ကျပ်</div>
              </div>
              <div className="mb-2 flex justify-between">
                <div>Status</div>
                <div>
                  {product.countInStock > 0 ? 'In stock' : 'Unavailable'}
                </div>
              </div>
              <button
                className="primary-button w-full"
                onClick={addToCartHandler}
              >
                Add to cart
              </button>
            </div>

            <div className="card ">
              <div className="rounded-lg shadow-lg p-5 md:col-span-4 bg-gray-700">
                <h3 className="text-white font-semibold mb-4 text-lg">
                  <LocationMarkerIcon className="h-5 w-5 text-white inline-block" />
                  လိပ်စာ
                </h3>
                <h3 className="text-white font-semibold mb-4 text-lg">
                  WINKY&apos;s Foods Family{' '}
                </h3>
                <p className="mb-2 text-white">
                  မန္တလေး-လားရှိုးလမ်းမကြီးအနီး၊
                </p>
                <p className="mb-2 text-white">
                  နဝရတ်လမ်း (Power Sun restaurant ဘေးလမ်း)၊
                </p>
                <p className="mb-2 text-white"> Ruby Mart အနီး၊</p>
                <p className="mb-2 text-white">မြမဥ္ဇူ လေးမျက်နှာဘုရားအနီး၊</p>
                <p className="mb-2 text-white">ပြင်ဦးလွင်မြို့</p>
                <p className="mb-2 text-white">
                  လင်းထက် ကိုယ်ပိုင်အထက်တန်းကျောင်းရှေ့၊
                </p>
                <p className="text-white">
                  <PhoneIcon className="h-5 w-5 text-white inline-block" /> 09
                  259 053 432{' '}
                </p>
                <p className="text-white">
                  <PhoneIcon className="h-5 w-5 text-white inline-block" /> 09
                  451 315 999{' '}
                </p>
                <p className="text-white">
                  <PhoneIcon className="h-5 w-5 text-white inline-block" /> 09
                  798 103 002{' '}
                </p>
              </div>
              {/* <ul>
                <li>
                  <span className="font-semibold">Address :</span> အခန်း(၄)၊
                  အမှတ်(၇၆)၊ နဝရတ်လမ်း၊ မန္တလေး-လားရှိုးလမ်းမကြီးအနီး၊
                  ပဒေသာမြို့သစ် ၊ ပြင်ဦးလွင်မြို့။
                </li>
                <li>
                  <span className="font-semibold">Phone :</span> 09 45131 5999
                </li>
                <li>
                  <p>
                    သန့်ရှင်းလတ်ဆတ်သော စစ်မှန်သောကုန်ကြမ်းများကိုသာ
                    အသုံးပြုထားပါသည်။
                  </p>
                </li>
              </ul> */}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();
  return {
    props: {
      product: product ? db.convertDocToObj(product) : null,
    },
  };
}
