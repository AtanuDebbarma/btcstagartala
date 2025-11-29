import {Timestamp} from 'firebase/firestore';

export type GalleryImageType = {
  id: string;
  url: string;
  title: string;
  createdAt: Timestamp;
  order: number;
};
