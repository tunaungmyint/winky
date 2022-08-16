import React from 'react';

import Image from 'next/image';
import { PhoneIcon, LocationMarkerIcon } from '@heroicons/react/outline';

export default function Address() {
  return (
    <div className="grid md:grid-cols-12 md:gap-2">
      <div className="rounded-lg shadow-lg mt-2 mb-2 pt-2 pb-2 pl-2 md:col-span-4 bg-gray-700">
        <h3 className="text-white font-semibold mb-4 text-lg">
          <LocationMarkerIcon className="h-5 w-5 text-white inline-block" />
          လိပ်စာ
        </h3>
        <h3 className="text-white font-semibold mb-4 text-lg">
          WINKY&apos;s Foods Family{' '}
        </h3>
        <p className="mb-2 text-white">မန္တလေး-လားရှိုးလမ်းမကြီးအနီး၊</p>
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
          <PhoneIcon className="h-5 w-5 text-white inline-block" /> 09 259 053
          432{' '}
        </p>
        <p className="text-white">
          <PhoneIcon className="h-5 w-5 text-white inline-block" /> 09 451 315
          999{' '}
        </p>
        <p className="text-white">
          <PhoneIcon className="h-5 w-5 text-white inline-block" /> 09 798 103
          002{' '}
        </p>
      </div>

      <div className="rounded-lg shadow-lg m-2 p-2 md:m-5 md:p-5 md:col-span-8 bg-gray-700">
        <Image
          src="/images/address1.jpg"
          alt="Address photo"
          width={640}
          height={320}
          layout="responsive"
        ></Image>
      </div>
    </div>
  );
}
