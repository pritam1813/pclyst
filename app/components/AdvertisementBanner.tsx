import Image from "next/image";
import Link from "next/link";
import React from "react";

const AdvertisementBanner = () => {
  return (
    <div className="container mx-auto w-11/12 lg:w-8/12">
      <div className="py-4  text-center rounded-xl ">
        <Link
          href="https://bigrock-in.sjv.io/c/4724667/1491221/5632"
          target="_top"
          id="1491221"
        >
          <Image
            src="/adbanner.jpeg"
            alt="Advertisement Banner"
            width={729}
            height={91}
            className="w-full h-full rounded-xl"
          />
        </Link>
        <Image
          height="0"
          width="0"
          src="/adbanner.jpeg"
          alt="Advertisement Banner"
          className="absolute hidden"
        />
      </div>
    </div>
  );
};

export default AdvertisementBanner;
