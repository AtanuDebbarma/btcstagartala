import type {StateCreator} from 'zustand';
import type {MiscDocumentType} from '@/types/miscDocumentsTypes';
import type {AppState} from './appStore';

export interface MiscDocumentsSlice {
  miscDocuments: MiscDocumentType[];
  setMiscDocuments: (documents: MiscDocumentType[]) => Promise<void>;
}

export const createMiscDocumentsSlice: StateCreator<
  AppState,
  [['zustand/immer', never]],
  [],
  MiscDocumentsSlice
> = set => ({
  miscDocuments: [],
  setMiscDocuments: async (documents: MiscDocumentType[]) => {
    set(state => {
      state.miscDocuments = documents;
    });
  },
});
