import type {CarouselModeType, NoticeBoardType} from '@/types/homeTypes';
import type {Timestamp} from 'firebase/firestore';
import {createButtonConfig} from '../shared/genericButtonConfig';

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
) =>
  createButtonConfig(
    notice,
    handleModal,
    item => [
      'EDIT',
      item.id,
      item.name,
      item.url,
      item.public_id,
      item.createdAt,
    ],
    item => [
      'DELETE',
      item.id,
      item.name,
      item.url,
      item.public_id,
      item.createdAt,
    ],
    () => ['ADD', '', '', '', '', null],
  );
