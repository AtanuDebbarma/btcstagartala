import React, {useState} from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import {ClipLoader} from 'react-spinners';
import {appStore} from '@/appStore/appStore';
import {useFetchCarouselImages} from '@/services/carousel/carouselFetchHook';
import {CarouselModal} from './carouselModal';
import {CarouselImage, CarouselModeType} from '@/types/homeTypes';
import {Timestamp} from 'firebase/firestore';
import {responsive} from '@/data/homeData/carouselData';
import {
  defaultDimValues,
  Dimensions,
  useCarouselDimensions,
} from '@/services/carousel/fetchDimentions';
import {CustomLeftArrow, CustomRightArrow} from './carouselButtons';
import {CarouselImages} from './carouselImage';

export const CustomCarouselMain: React.FC = () => {
  const {user} = appStore(state => ({
    user: state.user,
  }));
  const isAdmin = user?.email === import.meta.env.VITE_FIREBASE_ADMIN_EMAIL;
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [autoplay, setAutoPlay] = useState<boolean>(true);
  const [mode, setMode] = useState<CarouselModeType>('');
  const [dimensions, setDimensions] = useState<Dimensions>(defaultDimValues);
  const [mouseEnterDimensions, setMouseEnterDimensions] =
    useState<boolean>(false);
  const [carouselImages, setCarouselImages] = useState<CarouselImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<CarouselImage>({
    id: '',
    imageUrl: '',
    imageOrder: 0,
    image_public_id: '',
    createdAt: null,
  });
  const {loading: dimLoading, error: dimError} =
    useCarouselDimensions(setDimensions);

  const {loading, error} = useFetchCarouselImages(setCarouselImages);

  const handleModal = (
    id: string,
    type: CarouselModeType,
    order: number,
    url: string,
    image_public_id: string,
    createdAt: Timestamp | null,
  ) => {
    setAutoPlay(false);
    setOpenModal(true);
    setMode(type);
    setSelectedImage({
      id: id,
      imageUrl: url,
      imageOrder: order,
      image_public_id,
      createdAt,
    });
  };

  return (
    <div className="relative w-full">
      {loading || dimLoading ? (
        <div className="flex h-64 items-center justify-center">
          <ClipLoader size={50} color={'#0029af'} loading={loading} />
        </div>
      ) : error ? (
        <div className="flex h-64 items-center justify-center">
          <p className="font-medium text-red-600">{error}</p>
        </div>
      ) : (
        <div>
          {isAdmin && (
            <button
              onMouseEnter={() => setMouseEnterDimensions(true)}
              onMouseLeave={() => setMouseEnterDimensions(false)}
              onClick={() => handleModal('', 'DIM', 0, '', '', null)}
              className="absolute top-5 right-10 z-50 cursor-pointer rounded bg-white/80 shadow-md transition-all duration-200 hover:bg-white hover:text-blue-800 focus:outline-none active:scale-90 active:bg-white/90"
              title="Adjust dimensions">
              <i className="fa-solid fa-expand text-md px-2 py-2 font-bold text-blue-600" />
            </button>
          )}
          <Carousel
            swipeable
            draggable
            showDots
            responsive={responsive}
            infinite
            autoPlay={autoplay}
            autoPlaySpeed={3000}
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
            pauseOnHover={isAdmin}
            customLeftArrow={<CustomLeftArrow />}
            customRightArrow={<CustomRightArrow />}
            dotListClass="custom-dot-list-style">
            {carouselImages &&
              carouselImages.map(image => (
                <CarouselImages
                  totalLength={carouselImages && carouselImages.length}
                  image={image}
                  dimensions={dimensions}
                  dimError={dimError}
                  isAdmin={isAdmin}
                  handleModal={handleModal}
                  mouseEnterDimensions={mouseEnterDimensions}
                />
              ))}
          </Carousel>
        </div>
      )}
      {openModal && isAdmin && (
        <CarouselModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          mode={mode}
          dimensions={dimensions}
          setDimensions={setDimensions}
          selectedImage={selectedImage}
          totalCount={(carouselImages && carouselImages.length) || 0}
          setCarouselImages={setCarouselImages}
          setAutoPlay={setAutoPlay}
        />
      )}
    </div>
  );
};
