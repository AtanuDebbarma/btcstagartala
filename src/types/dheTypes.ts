import type {Timestamp} from 'firebase/firestore';

export type DHEDocumentType = {
  id: string;
  name: string;
  url: string;
  createdAt: Timestamp | null;
};
