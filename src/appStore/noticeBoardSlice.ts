import {StateCreator} from 'zustand';
import {NoticeBoardType} from '@/types/homeTypes';
import {AppState} from './appStore';

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
