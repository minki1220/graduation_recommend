'use client'

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // Swiper CSS
import 'swiper/css/navigation'; // Swiper CSS
import SwiperCore, { Autoplay, Navigation, Pagination, Loop } from 'swiper';

SwiperCore.use([Autoplay, Navigation, Pagination, Loop]);

const imageUrls = [
  '/img/image1.jpg',
  '/img/image2.jpg',
  '/img/image3.jpg',
  '/img/image4.jpg',
  '/img/image5.jpg',
  '/img/image6.jpg',
  '/img/image7.jpg',
  // 나머지 이미지 URL을 추가하세요.
];

const MySwiper = () => {
  return (
    <Swiper 
      spaceBetween={0}
      slidesPerView={5}
      navigation
      pagination={{ clickable: true }}
      loop={true} // 무한 반복 설정
      autoplay={{ delay: 3000 }} // 자동 재생 설정
      className='slider'
    >
      {imageUrls.map((imageUrl, index) => (
        <SwiperSlide className="img" key={index}>
          <img
            src={imageUrl}
            alt={`Image ${index + 1}`}
            width={200}
            height={200}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MySwiper;
