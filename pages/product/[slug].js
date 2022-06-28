import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import Layout from '../../components/Layout';
import data from '../../utils/data';

export default function ProductScreen() {
  const { query } = useRouter();
  const { slug } = query;
  const product = data.products.find((x) => x.slug === slug);
  if (!product) {
    return <div>Produt Not Found</div>;
  }
  return (
    <Layout title={product.name}>
      <div className="py-2 font-semibold text-slate-700">
        <Link href="/">back to Winky Menu</Link>
      </div>
      <div className="grid md:grid-cols-4 md:gap-3 text-slate-700">
        <div className="md:col-span-2">
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            layout="responsive"
          ></Image>
        </div>
        <div className="ml-6">
          <ul>
            <li>
              <h1 className="text-lg">{product.name}</h1>
            </li>
            <li>Category: {product.category}</li>
            <li>Brand: {product.brand}</li>
            <li>
              {product.rating} of {product.numReviews} reviews
            </li>
            <li>Description: {product.description}</li>
          </ul>
        </div>
        <div>
          <div>
            <div className="card p-5">
              <div className="mb-2 flex justify-between">
                <div>Price</div>
                <div>{product.price} kyats</div>
              </div>
              <div className="mb-2 flex justify-between">
                <div>Status</div>
                <div>
                  {product.countInStock > 0 ? 'In stock' : 'Unavailable'}
                </div>
              </div>
            </div>

            <div className="card p-5 ">
              <ul>
                <li>
                  <span className="font-semibold">Address :</span> 76,Nawarat
                  Street Maymyo, Mandalay, Myanmar
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
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
