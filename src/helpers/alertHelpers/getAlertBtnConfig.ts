import {AlertsType, CarouselModeType} from '@/types/homeTypes';
import {Timestamp} from 'firebase/firestore';

export const getAlertBtnsConfig = (
  alert: AlertsType,
  handleModal: (
    type: CarouselModeType,
    id: string,
    title: string,
    content: string,
    fileName: string,
    fileURL: string,
    file_public_id: string,
    link1Name: string,
    link1Url: string,
    link2Name: string,
    link2Url: string,
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
        alert.id,
        alert.title,
        alert.content,
        alert.fileName,
        alert.fileURL,
        alert.file_public_id,
        alert.link1Name,
        alert.link1Url,
        alert.link2Name,
        alert.link2Url,
        alert.createdAt,
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
        alert.id,
        alert.title,
        alert.content,
        alert.fileName,
        alert.fileURL,
        alert.file_public_id,
        alert.link1Name,
        alert.link1Url,
        alert.link2Name,
        alert.link2Url,
        alert.createdAt,
      ),
  },
  {
    title: 'ADD' as const,
    iconClass: 'fa-solid fa-plus' as const,
    iconColor: 'text-green-600',
    hoverColor: 'hover:text-green-800',
    onClick: () =>
      handleModal('ADD', '', '', '', '', '', '', '', '', '', '', null),
  },
];
