import type {StateCreator} from 'zustand';
import type {AICTEDocumentType} from '@/types/aicteTypes';
import type {AppState} from './appStore';

export interface AICTESlice {
  aicteDocuments: AICTEDocumentType[];
  setAICTEDocuments: (documents: AICTEDocumentType[]) => Promise<void>;
}

export const createAICTESlice: StateCreator<
  AppState,
  [['zustand/immer', never]],
  [],
  AICTESlice
> = set => ({
  aicteDocuments: [],
  setAICTEDocuments: async (documents: AICTEDocumentType[]) => {
    set(state => {
      state.aicteDocuments = documents;
    });
  },
});
