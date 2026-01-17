import type {StateCreator} from 'zustand';
import type {DHEDocumentType} from '@/types/dheTypes';
import type {AppState} from './appStore';

export interface DHESlice {
  dheDocuments: DHEDocumentType[] | [];
  setDHEDocuments: (dheDocuments: DHEDocumentType[] | []) => Promise<void>;
}

export const createDHESlice: StateCreator<
  AppState,
  [['zustand/immer', never]],
  [],
  DHESlice
> = set => ({
  dheDocuments: [],
  setDHEDocuments: async (dheDocuments: DHEDocumentType[] | []) => {
    set(state => {
      state.dheDocuments = dheDocuments;
    });
  },
});
