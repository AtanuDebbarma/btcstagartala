import {CarouselImage, CarouselModeType} from '@/types/homeTypes';
import {Dispatch, SetStateAction, useEffect, useRef, useState} from 'react';
import {ImageForm} from './imageForm';
import {ClipLoader} from 'react-spinners';
import {Dimensions} from '@/services/carousel/fetchDimentions';
import {DimentionsAdjustForm} from './dimentionsAdjust';

interface Props {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  mode: CarouselModeType;
  dimensions: Dimensions;
  setDimensions: Dispatch<SetStateAction<Dimensions>>;
  selectedImage: CarouselImage;
  totalCount: number;
  setCarouselImages: Dispatch<SetStateAction<CarouselImage[]>>;
  setAutoPlay: Dispatch<SetStateAction<boolean>>;
}
export const CarouselModal = ({
  openModal,
  setOpenModal,
  mode,
  dimensions,
  setDimensions,
  selectedImage,
  totalCount,
  setCarouselImages,
  setAutoPlay,
}: Props) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [processSuccess, setProcessSuccess] = useState<boolean>(false);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setOpenModal(false);
        setAutoPlay(true);
      }
    };

    if (openModal) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openModal, setOpenModal, setAutoPlay]);

  const handleClose = () => {
    setOpenModal(false);
    setAutoPlay(true);
  };

  return (
    <div className="fixed inset-0 z-999999 flex items-center justify-center bg-black/30">
      <div
        ref={modalRef}
        className="relative flex w-[90%] max-w-md flex-col items-center rounded-xl bg-white p-6 text-black shadow-lg">
        {!loading && !processSuccess && (
          <div>
            <i
              onClick={handleClose}
              className="fa-solid fa-times absolute top-4 right-4 cursor-pointer text-gray-500 hover:text-black"></i>
            {mode !== 'DIM' && (
              <h2 className="text-center text-lg font-semibold">
                {mode} IMAGE
              </h2>
            )}
            {mode === 'DIM' && (
              <h2 className="text-center text-lg font-semibold">
                Edit Carousel Dimentions
              </h2>
            )}
          </div>
        )}
        {loading && (
          <div className="flex h-70 w-full items-center justify-center">
            <ClipLoader
              className="mt-5"
              size={40}
              color="#1a3bdf"
              loading={loading}
            />
          </div>
        )}
        {processSuccess && (
          <div className="flex flex-col items-center justify-center">
            <h2 className="mb-8 text-center text-4xl font-bold text-black">
              SUCCESS
            </h2>
            <p className="mt-5 text-4xl">✅</p>
          </div>
        )}
        {(mode === 'ADD' || mode === 'EDIT' || mode === 'DELETE') &&
          !loading &&
          !processSuccess && (
            <ImageForm
              mode={mode}
              setOpenModal={setOpenModal}
              selectedImage={selectedImage}
              totalCount={totalCount}
              setLoading={setLoading}
              setCarouselImages={setCarouselImages}
              setAutoPlay={setAutoPlay}
              setProcessSuccess={setProcessSuccess}
            />
          )}
        {mode === 'DIM' && !loading && (
          <DimentionsAdjustForm
            setOpenModal={setOpenModal}
            dimensions={dimensions}
            setDimensions={setDimensions}
            setLoading={setLoading}
            setAutoPlay={setAutoPlay}
            setProcessSuccess={setProcessSuccess}
          />
        )}
      </div>
    </div>
  );
};
