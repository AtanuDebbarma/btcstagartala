import type {StateCreator} from 'zustand';
import type {NoticeBoardType} from '@/types/homeTypes';
import type {AppState} from './appStore';

export type NoticeBoardSliceType = {
  notices: NoticeBoardType[] | [];
  setNotices: (notices: NoticeBoardType[] | []) => Promise<void>;
};

export const createNoticeBoardSlice: StateCreator<
  AppState,
  [['zustand/immer', never]],
  [],
  NoticeBoardSliceType
> = set => ({
  notices: [],
  setNotices: async (notices: NoticeBoardType[] | []) => {
    try {
      set(state => {
        state.notices = notices;
      });
    } catch (error) {
      console.error('Failed to set notices', error);
    }
  },
});
