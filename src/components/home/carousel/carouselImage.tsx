import {Dimensions} from '@/services/carousel/fetchDimentions';
import {CarouselImage, CarouselModeType} from '@/types/homeTypes';
import backupCarousel from '@/assets/backup-carousel.jpg';
import {CarouselCounter, CarouselEditButtons} from './carouselButtons';
import {Timestamp} from 'firebase/firestore';
import styled from '@emotion/styled';
// Define valid objectFit values
type ObjectFit = 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';

interface PROPS {
  totalLength: number;
  image: CarouselImage;
  dimensions: Dimensions | null;
  dimError: boolean;
  isAdmin: boolean;
  handleModal: (
    id: string,
    type: CarouselModeType,
    order: number,
    url: string,
    createdAt: Timestamp | null,
  ) => void;
  mouseEnterDimensions: boolean;
}
export const CarouselImages = ({
  totalLength,
  image,
  dimensions,
  dimError,
  isAdmin,
  handleModal,
  mouseEnterDimensions,
}: PROPS) => {
  // Calculate styles based on dimensions
  const CarouselContainer = styled.div<{dimensions: Dimensions | null}>`
    height: ${({dimensions}) => dimensions?.default || 350}px;

    @media (min-width: 410px) {
      height: ${({dimensions}) => dimensions?.minWidth_410 || 375}px;
    }

    @media (min-width: 430px) {
      height: ${({dimensions}) => dimensions?.minWidth_430 || 400}px;
    }

    @media (min-width: 820px) {
      height: ${({dimensions}) => dimensions?.minWidth_820 || 430}px;
    }

    @media (min-width: 1024px) {
      height: ${({dimensions}) => dimensions?.minWidth_1024 || 480}px;
    }
  `;

  // Safely get objectFit value with fallback
  const objectFitValue = (dimensions?.objectFit as ObjectFit) || 'cover';

  return (
    <CarouselContainer
      dimensions={dimensions}
      key={image.imageOrder}
      style={{border: mouseEnterDimensions ? '10px solid #043f9e' : 'none'}}
      className="flex w-full items-center justify-center">
      {isAdmin && (
        <>
          <CarouselCounter image={image} totalLength={totalLength} />
          <CarouselEditButtons image={image} handleModal={handleModal} />
        </>
      )}

      <img
        src={image.imageUrl}
        alt={`Carousel ${image.imageOrder}`}
        style={{objectFit: !dimError ? objectFitValue : 'cover'}}
        className="h-full w-full shadow-md"
        onError={e => {
          e.currentTarget.onerror = null; // prevent infinite loop
          e.currentTarget.src = backupCarousel;
        }}
      />
    </CarouselContainer>
  );
};
