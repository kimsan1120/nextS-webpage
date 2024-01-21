// Components/Gallery.js
"use client";
import React, { useEffect, useState } from "react";
import { AiOutlineExpandAlt } from "react-icons/ai";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import Image from "next/image";

export default function Gallery() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const previousImage = () => {
    const isFirstImage = currentImageIndex === 0;
    const newIndex = isFirstImage ? images.length - 1 : currentImageIndex - 1;
    setCurrentImageIndex(newIndex);
  };

  const nextImage = () => {
    const isLastImage = currentImageIndex === images.length - 1;
    const newIndex = isLastImage ? 0 : currentImageIndex + 1;
    setCurrentImageIndex(newIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 5000);

    return () => clearInterval(interval);
  }, []);
  const images = [
    {
      imageUrl: "https://themewagon.github.io/snapshot/images/model-1.jpg",
      alt: "공유해주세요!",
      description:
        "In block-level layouts, it aligns an item inside its containing block on the inli inside its containing block on the inline axis, accounting for the offset values of top, left, bottom, and right.",
      address: "/meals",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1503424886307-b090341d25d1?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Spicy curry",
      description:
        "발 등을 위해 시작되는 것이 일반적이죠. 보통 토이프로젝트는 제한된 예산과 시간 내에서 구현될 수 있는 것들로 구성되며, 짧으면 1개월에서 길면 3개월 이내에 완성을 목표로 하는 비교적 간단한 프로젝트라고 할 수 있어요.",
      address: "/community",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?q=80&w=2011&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "말파이트를 찾아봐",
      description:
        "  3개월 이내에 완성을 목표로 시간 내에서  프로젝트라고 할 수 있는 것들로 구성되며, 짧으면 1개월에서 길면 3개월 이내에 완성을 목표로 하는 비교적 간단한 프로젝트는 제한된  예산과 시간 내에서 구현될 수 있어요. 보통 토이프로젝트라고 할 수 있어요.있는 것들로 구성되며, 짧으면 1개월에서 길면 3개월 이",
      address: "/community",
    },
  //  {
  //    imageUrl:
  //      "https://www.kenyaadultblog.com/wp-content/uploads/2022/08/photo_2022-08-30_14-25-17.webp",
  //    alt: "Porn Image?",
  //    description:
  //      "  3개월 이내에 완성을 목표로 시간 내에서  프로젝트라고 할 수 있는 것들로 구성되며, 짧으면 1개월에서 길면 3개월 이내에 완성을 목표로 하는 비교적 간단한 프로젝트는 제한된  예산과 시간 내에서 구현될 수 있어요. 보통 토이프로젝트라고 할 수 있어요.있는 것들로 구성되며, 짧으면 1개월에서 길면 3개월 이",
  //    address: "/community",
  //  },
  ];

  return (
    <>
      <div className="flex justify-center items-center my-4 p-20 bg-gray-300">
        <div className="text-left w-1/6">
          <h3 className="text-3xl font-bold">
            {images[currentImageIndex].alt}
          </h3>
          <br />
          <span className="text-l">
            {images[currentImageIndex].description}
          </span>
          <br />
          <br />
          <a
            href={images[currentImageIndex].address}
            className="inline-block bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300"
          >
            자세히보기
          </a>
        </div>
        <button
          onClick={previousImage}
          className="text-black p-20 rounded text-3xl  transition duration-300"
        >
          &#10094;
        </button>
        <div className="relative w-[600px] h-[400px] overflow-hidden mx-2 rounded-none">
          <Image
            src={images[currentImageIndex].imageUrl}
            alt={images[currentImageIndex].alt}
            objectFit="cover"
            objectPosition="center"
            className="w-full h-full"
            layout="fill"
          />
        </div>

        <button
          onClick={nextImage}
          className=" text-black p-20 text-3xl rounded transition duration-300"
        >
          &#10095;
        </button>
      </div>
      <div className="text-center"></div>
    </>
  );
}
