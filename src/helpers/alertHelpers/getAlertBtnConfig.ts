import {AlertsType, CarouselModeType} from '@/types/homeTypes';
import {Timestamp} from 'firebase/firestore';
import {createButtonConfig} from '../shared/genericButtonConfig';

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
) =>
  createButtonConfig(
    alert,
    handleModal,
    item => [
      'EDIT',
      item.id,
      item.title,
      item.content,
      item.fileName,
      item.fileURL,
      item.file_public_id,
      item.link1Name,
      item.link1Url,
      item.link2Name,
      item.link2Url,
      item.createdAt,
    ],
    item => [
      'DELETE',
      item.id,
      item.title,
      item.content,
      item.fileName,
      item.fileURL,
      item.file_public_id,
      item.link1Name,
      item.link1Url,
      item.link2Name,
      item.link2Url,
      item.createdAt,
    ],
    () => ['ADD', '', '', '', '', '', '', '', '', '', '', null],
  );
