import {useState} from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import {ClipLoader} from 'react-spinners';
import {appStore} from '@/appStore/appStore';
import {CarouselModal} from './carouselModal';
import {CarouselImage, CarouselModeType} from '@/types/homeTypes';
import {Timestamp} from 'firebase/firestore';
import {responsive} from '@/data/homeData/carouselData';
import {CustomLeftArrow, CustomRightArrow} from './carouselButtons';
import {CarouselImages} from './carouselImage';
import {CarouselFallback} from './carouselFallback';

export const CustomCarouselMain = () => {
  const {user} = appStore(state => ({
    user: state.user,
  }));
  const isAdmin = user?.email === import.meta.env.VITE_FIREBASE_ADMIN_EMAIL;
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [autoplay, setAutoPlay] = useState<boolean>(true);
  const [mode, setMode] = useState<CarouselModeType>('');

  const {dimensions, dimLoading, dimError, carouselImages, loading, error} =
    appStore(state => ({
      dimensions: state.dimensions,
      dimLoading: state.dimLoading,
      dimError: state.dimError,
      carouselImages: state.carouselImages,
      loading: state.loading,
      error: state.error,
    })); // app state

  const [mouseEnterDimensions, setMouseEnterDimensions] =
    useState<boolean>(false);

  const [selectedImage, setSelectedImage] = useState<CarouselImage>({
    id: '',
    imageUrl: '',
    imageOrder: 0,
    image_public_id: '',
    createdAt: null,
  });

  const handleModal = (
    id: string,
    type: CarouselModeType,
    order: number,
    url: string,
    image_public_id: string,
    createdAt: Timestamp | null,
  ) => {
    setAutoPlay(false);
    setTimeout(() => {
      setOpenModal(true);
      setMode(type);
      setSelectedImage({
        id: id,
        imageUrl: url,
        imageOrder: order,
        image_public_id,
        createdAt,
      });
    }, 200);
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
          <CarouselFallback
            isAdmin={isAdmin}
            setMouseEnterDimensions={setMouseEnterDimensions}
            handleModal={handleModal}
          />
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
          selectedImage={selectedImage}
          totalCount={
            (!loading && !error && carouselImages && carouselImages.length) || 0
          }
          setAutoPlay={setAutoPlay}
        />
      )}
    </div>
  );
};
