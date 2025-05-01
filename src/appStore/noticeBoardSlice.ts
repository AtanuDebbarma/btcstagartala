import {StateCreator} from 'zustand';
import {NoticeBoardType} from '@/types/homeTypes';

export type NoticeBoardSliceType = {
  notices: NoticeBoardType[] | [];
  setNotices: (notices: NoticeBoardType[] | []) => Promise<void>;
};

export const createNoticeBoardSlice: StateCreator<
  NoticeBoardSliceType & any,
  [['zustand/immer', never]],
  [],
  NoticeBoardSliceType
> = set => ({
  notices: [],
  setNotices: async (notices: NoticeBoardType[] | []) => {
    try {
      set((state: NoticeBoardSliceType) => {
        state.notices = notices;
      });
    } catch (error) {
      console.error('Failed to set notices', error);
    }
  },
});
