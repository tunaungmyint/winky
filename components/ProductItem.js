/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

export default function ProductItem({ product, addToCartHandler }) {
  return (
    <div className="card">
      <Link href={`/product/${product.slug}`}>
        <a>
          <Image
            src={product.image}
            alt={product.name}
            className="rounded shadow object-cover h-64 w-full"
            width={400}
            height={400}
            layout="responsive"
          />
        </a>
      </Link>
      <div className="flex flex-col items-center justify-center p-3">
        <Link href={`/product/${product.slug}`}>
          <a>
            <h2 className="text-md">{product.name}</h2>
          </a>
        </Link>
        {/* <p>{product.brand}</p> */}
        <p className="mb-1">{product.price} ကျပ်</p>
        <button
          className="primary-button"
          type="button"
          onClick={() => addToCartHandler(product)}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
