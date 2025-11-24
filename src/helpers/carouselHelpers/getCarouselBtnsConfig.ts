import {CarouselImage, CarouselModeType} from '@/types/homeTypes';
import {Timestamp} from 'firebase/firestore';
import {createButtonConfig} from '../shared/genericButtonConfig';

export const getCarouselBtnsConfig = (
  image: CarouselImage,
  handleModal: (
    id: string,
    type: CarouselModeType,
    order: number,
    url: string,
    image_public_id: string,
    createdAt: Timestamp | null,
  ) => void,
) =>
  createButtonConfig(
    image,
    handleModal,
    item => [
      item.id,
      'EDIT',
      item.imageOrder,
      item.imageUrl,
      item.image_public_id,
      item.createdAt,
    ],
    item => [
      item.id,
      'DELETE',
      item.imageOrder,
      item.imageUrl,
      item.image_public_id,
      item.createdAt,
    ],
    () => ['', 'ADD', 0, '', '', null],
  );
