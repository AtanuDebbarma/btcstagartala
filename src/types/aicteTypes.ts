import type {Timestamp} from 'firebase/firestore';

export type AICTEDocumentType = {
  id: string;
  name: string;
  url: string;
  createdAt: Timestamp | null;
};
