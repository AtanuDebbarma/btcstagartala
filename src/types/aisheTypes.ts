import type {Timestamp} from 'firebase/firestore';

export type AISHEDocumentType = {
  id: string;
  name: string;
  url: string;
  createdAt: Timestamp | null;
};
