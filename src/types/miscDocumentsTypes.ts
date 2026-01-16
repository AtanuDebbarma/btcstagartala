import type {Timestamp} from 'firebase/firestore';

export type MiscDocumentType = {
  id: string;
  name: string;
  url: string;
  createdAt: Timestamp | null;
};
