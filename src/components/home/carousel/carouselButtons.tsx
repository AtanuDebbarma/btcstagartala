import {AdminInteractionBtns} from '@/appComponents/adminInteractionBtns';
import {getCarouselBtnsConfig} from '@/helpers/carouselHelpers/getCarouselBtnsConfig';
import {CarouselImage, CarouselModeType} from '@/types/homeTypes';
import {Timestamp} from 'firebase/firestore';
import React from 'react';

export const CustomLeftArrow = ({onClick}: {onClick?: () => void}) => (
  <button
    className="absolute top-1/2 left-2 z-10 -translate-y-1/2 cursor-pointer rounded-full bg-white/80 p-3 shadow-lg transition-transform duration-150 ease-in-out hover:bg-white active:scale-95"
    onClick={onClick}>
    <i className="fas fa-chevron-left text-xl text-gray-700"></i>
  </button>
);

export const CustomRightArrow = ({onClick}: {onClick?: () => void}) => (
  <button
    className="absolute top-1/2 right-2 z-10 -translate-y-1/2 cursor-pointer rounded-full bg-white/80 p-3 shadow-lg transition-transform duration-150 ease-in-out hover:bg-white active:scale-95"
    onClick={onClick}>
    <i className="fas fa-chevron-right text-xl text-gray-700"></i>
  </button>
);

interface PROPS {
  image: CarouselImage;
  handleModal: (
    id: string,
    type: CarouselModeType,
    order: number,
    url: string,
    image_public_id: string,
    createdAt: Timestamp | null,
  ) => void;
}
export const CarouselEditButtons = React.memo(({image, handleModal}: PROPS) => {
  return (
    <div
      key={image.imageOrder}
      className="absolute top-5 left-1/2 z-50 flex -translate-x-1/2 -translate-y-1/2 cursor-default items-center rounded-full bg-white px-4 py-2 shadow-md">
      {getCarouselBtnsConfig(image, handleModal).map((btn, index) => (
        <React.Fragment key={btn.title}>
          <AdminInteractionBtns
            handleModal={btn.onClick}
            iconClass={btn.iconClass}
            title={btn.title}
            iconColor={btn.iconColor}
            hoverColor={btn.hoverColor}
          />
          {index < 2 && (
            <div className="mx-3 h-5 border-r border-gray-600"></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
});

export const CarouselCounter = React.memo(
  ({totalLength, image}: {totalLength: number; image: CarouselImage}) => {
    const renderCounter = () => {
      return (
        <div className="absolute top-5 left-10 z-50 rounded bg-white/80 shadow-md">
          <p className="px-2 py-2 text-sm font-bold text-[#900090]">
            {image.imageOrder + '/' + totalLength}
          </p>
        </div>
      );
    };
    return <>{renderCounter()}</>;
  },
);
