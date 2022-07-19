import React from 'react';
import Layout from '../components/Layout';
import Image from 'next/image';

export default function Address() {
  return (
    <Layout title="Address">
      <div className="grid md:grid-cols-12 md:gap-2">
        <div className="rounded-lg shadow-lg m-5 p-5 md:col-span-4 ">
          <h3 className="text-gray-700 font-semibold mb-4">Address</h3>
          <p className="mb-2"> နဝရတ်လမ်း၊ ရပ်ကွက်ကြီး(၄)၊ ပြင်ဦးလွင်မြို့</p>
          <p> 09 451 315 999</p>
        </div>

        <div className="rounded-lg shadow-lg m-5 p-5 md:col-span-8">
          <h3 className="text-gray-700 font-semibold mb-4">Google Map</h3>
          <Image
            src="/images/address1.png"
            alt="Address photo"
            width={640}
            height={320}
            layout="responsive"
          ></Image>
        </div>
      </div>
    </Layout>
  );
}
