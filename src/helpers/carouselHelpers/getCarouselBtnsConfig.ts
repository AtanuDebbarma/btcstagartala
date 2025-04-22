import {CarouselImage, CarouselModeType} from '@/types/homeTypes';
import {Timestamp} from 'firebase/firestore';

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
) => [
  {
    title: 'EDIT' as const,
    iconClass: 'fa-solid fa-pen' as const,
    iconColor: 'text-blue-600',
    hoverColor: 'hover:text-blue-800',
    onClick: () =>
      handleModal(
        image.id,
        'EDIT',
        image.imageOrder,
        image.imageUrl,
        image.image_public_id,
        image.createdAt,
      ),
  },
  {
    title: 'DELETE' as const,
    iconClass: 'fa-solid fa-trash' as const,
    iconColor: 'text-red-600',
    hoverColor: 'hover:text-red-800',
    onClick: () =>
      handleModal(
        image.id,
        'DELETE',
        image.imageOrder,
        image.imageUrl,
        image.image_public_id,
        image.createdAt,
      ),
  },
  {
    title: 'ADD' as const,
    iconClass: 'fa-solid fa-plus' as const,
    iconColor: 'text-green-600',
    hoverColor: 'hover:text-green-800',
    onClick: () => handleModal(image.id, 'ADD', 0, '', '', null),
  },
];
