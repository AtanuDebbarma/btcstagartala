import {AdminInteractionBtns} from '@/appComponents/adminInteractionBtns';
import {appStore} from '@/appStore/appStore';
import backupCarousel from '@/assets/backup-carousel.jpg';
import {CarouselModeType} from '@/types/homeTypes';
import {Timestamp} from 'firebase/firestore';
import React from 'react';
import {Dispatch, SetStateAction} from 'react';

// Define valid objectFit values
type ObjectFit = 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';

interface Props {
  isAdmin: boolean;
  setMouseEnterDimensions: Dispatch<SetStateAction<boolean>>;
  handleModal: (
    id: string,
    type: CarouselModeType,
    order: number,
    url: string,
    image_public_id: string,
    createdAt: Timestamp | null,
  ) => void;
}
export const CarouselFallback = React.memo(
  ({isAdmin, setMouseEnterDimensions, handleModal}: Props) => {
    const dimensions = appStore(state => state.dimensions);
    const dimLoading = appStore(state => state.dimLoading);
    const dimError = appStore(state => state.dimError);
    const carouselImages = appStore(state => state.carouselImages);

    const objectFitValue =
      (!dimLoading &&
        !dimError &&
        dimensions &&
        dimensions.objectFit &&
        (dimensions.objectFit as ObjectFit)) ||
      'cover';

    return (
      <div>
        {isAdmin && (
          <button
            onMouseEnter={() => setMouseEnterDimensions(true)}
            onMouseLeave={() => setMouseEnterDimensions(false)}
            onClick={() => handleModal('', 'DIM', 0, '', '', null)}
            className="absolute top-5 right-10 z-50 cursor-pointer rounded bg-white/80 pr-2.5 shadow-md transition-all duration-200 hover:bg-white hover:text-purple-800 focus:outline-none active:scale-90 active:bg-white/90"
            title="Adjust dimensions">
            <i className="fa-solid fa-expand text-md px-2 py-2 font-bold text-[#900090]" />
          </button>
        )}
        {isAdmin && carouselImages && carouselImages.length === 0 && (
          <div className="absolute top-5 left-1/2 z-50 flex -translate-x-1/2 -translate-y-1/2 items-center rounded-full bg-white px-4 py-2 shadow-md">
            <AdminInteractionBtns
              handleModal={() => handleModal('', 'ADD', 0, '', '', null)}
              iconClass="fa-solid fa-plus"
              title="ADD"
              iconColor="text-green-600"
              hoverColor="hover:text-green-800"
            />
          </div>
        )}
        {carouselImages && carouselImages.length === 0 && (
          <div className="flex h-[400px] w-full items-center justify-center">
            <img
              src={backupCarousel}
              alt="Carousel image"
              style={{objectFit: !dimError ? objectFitValue : 'cover'}}
              className="h-full w-full shadow-md"
            />
          </div>
        )}
      </div>
    );
  },
);
