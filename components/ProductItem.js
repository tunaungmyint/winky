/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

export default function ProductItem({ product }) {
  return (
    <div className="card">
      <Link href={`/product/${product.slug}`}>
        <a>
          <Image
            src={product.image}
            alt={product.name}
            className="rounded shadow"
            width={400}
            height={400}
            layout="responsive"
          />
        </a>
      </Link>
      <div className="flex flex-col items-center justify-center p-5">
        <Link href={`/product/${product.slug}`}>
          <a>
            <h2 className="text-lg">{product.name}</h2>
          </a>
        </Link>
        <p className="mb-2">{product.brand}</p>
        <p>{product.price} kyats</p>

        <div className="mx-auto">
          <Link href={`/product/${product.slug}`}>
            <a>
              <button className="primary-button w-full">See More</button>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
