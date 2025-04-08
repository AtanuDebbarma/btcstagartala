import React, {useEffect, useMemo, useState} from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import {ClipLoader} from 'react-spinners';
import {Assets} from '../../assets/assetData';

const CustomLeftArrow = ({onClick}: {onClick?: () => void}) => {
  return (
    <button
      className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow-lg p-3 rounded-full"
      onClick={onClick}>
      <i className="fas fa-chevron-left text-xl text-gray-700"></i>
    </button>
  );
};

const CustomRightArrow = ({onClick}: {onClick?: () => void}) => {
  return (
    <button
      className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow-lg p-3 rounded-full"
      onClick={onClick}>
      <i className="fas fa-chevron-right text-xl text-gray-700"></i>
    </button>
  );
};

export const CustomCarousel: React.FC = () => {
  const images = useMemo(
    () => [
      Assets.carousel.Image1,
      Assets.carousel.Image2,
      Assets.carousel.Image3,
      Assets.carousel.Image4,
      Assets.carousel.Image5,
      Assets.carousel.Image6,
      Assets.carousel.Image7,
      Assets.carousel.Image8,
      Assets.carousel.Image9,
    ],
    [],
  );

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let loadedCount = 0;
    const handleImageLoad = () => {
      loadedCount++;
      if (loadedCount === images.length) {
        setIsLoading(false);
      }
    };

    images.forEach(image => {
      const img = new Image();
      img.src = image;
      img.onload = handleImageLoad;
      img.onerror = handleImageLoad;
    });
  }, [images]);

  const responsive = {
    desktop: {
      breakpoint: {max: 3000, min: 1024},
      items: 1,
    },
    tablet: {
      breakpoint: {max: 1024, min: 820},
      items: 1,
    },
    mobile: {
      breakpoint: {max: 820, min: 766},
      items: 1,
    },
    smallMobile: {
      breakpoint: {max: 766, min: 580},
      items: 1,
    },
    extraSmall: {
      breakpoint: {max: 580, min: 430},
      items: 1,
    },
    tiny: {
      breakpoint: {max: 430, min: 350},
      items: 1,
    },
  };

  return (
    <div className="relative w-full">
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <ClipLoader size={50} color={'#0029af'} loading={isLoading} />
        </div>
      ) : (
        <Carousel
          swipeable
          draggable
          showDots={true}
          responsive={responsive}
          infinite
          autoPlay
          autoPlaySpeed={4000}
          keyBoardControl
          customTransition="all 1s"
          transitionDuration={1000}
          removeArrowOnDeviceType={[
            'tablet',
            'mobile',
            'smallMobile',
            'extraSmall',
            'tiny',
          ]}
          customLeftArrow={<CustomLeftArrow />}
          customRightArrow={<CustomRightArrow />}
          dotListClass="custom-dot-list-style">
          {images.map((image, index) => (
            <div
              key={index}
              className="w-full h-92 sm:h-[380px] md:h-[430px] lg:h-[480px] flex justify-center items-center">
              <img
                src={image}
                alt={`Carousel ${index + 1}`}
                className="w-full h-full object-cover shadow-md"
              />
            </div>
          ))}
        </Carousel>
      )}
    </div>
  );
};
