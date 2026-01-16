import type {Timestamp} from 'firebase/firestore';

export type ResultType = {
  id: string;
  name: string;
  url: string;
  createdAt: Timestamp | null;
};
