import type {StateCreator} from 'zustand';
import type {AISHEDocumentType} from '@/types/aisheTypes';
import type {AppState} from './appStore';

export interface AISHESlice {
  aisheDocuments: AISHEDocumentType[] | [];
  setAISHEDocuments: (
    aisheDocuments: AISHEDocumentType[] | [],
  ) => Promise<void>;
}

export const createAISHESlice: StateCreator<
  AppState,
  [['zustand/immer', never]],
  [],
  AISHESlice
> = set => ({
  aisheDocuments: [],
  setAISHEDocuments: async (aisheDocuments: AISHEDocumentType[] | []) => {
    set(state => {
      state.aisheDocuments = aisheDocuments;
    });
  },
});
