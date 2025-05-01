import {CarouselModeType, NoticeBoardType} from '@/types/homeTypes';
import {Timestamp} from 'firebase/firestore';

export const getNoticeBtnsConfig = (
  notice: NoticeBoardType,
  handleModal: (
    type: CarouselModeType,
    id: string,
    name: string,
    url: string,
    public_id: string,
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
        'EDIT',
        notice.id,
        notice.name,
        notice.url,
        notice.public_id,
        notice.createdAt,
      ),
  },
  {
    title: 'DELETE' as const,
    iconClass: 'fa-solid fa-trash' as const,
    iconColor: 'text-red-600',
    hoverColor: 'hover:text-red-800',
    onClick: () =>
      handleModal(
        'DELETE',
        notice.id,
        notice.name,
        notice.url,
        notice.public_id,
        notice.createdAt,
      ),
  },
  {
    title: 'ADD' as const,
    iconClass: 'fa-solid fa-plus' as const,
    iconColor: 'text-green-600',
    hoverColor: 'hover:text-green-800',
    onClick: () => handleModal('ADD', '', '', '', '', null),
  },
];
