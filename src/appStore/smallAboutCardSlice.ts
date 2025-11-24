import {StateCreator} from 'zustand';
import {SmallAboutCardimageType, SmallAboutCardType} from '@/types/homeTypes';
import {AppState} from './appStore';

export type SmallAboutCardSliceType = {
  smallAboutCard: SmallAboutCardType | null;
  smallAboutCardImage: SmallAboutCardimageType | null;
  principalText: SmallAboutCardType | null;
  principalImage: SmallAboutCardimageType | null;
  setSmallAboutCard: (data: SmallAboutCardType | null) => Promise<void>;
  setSmallAboutCardImage: (
    data: SmallAboutCardimageType | null,
  ) => Promise<void>;
  setPrincipalText: (data: SmallAboutCardType | null) => Promise<void>;
  setPrincipalImage: (data: SmallAboutCardimageType | null) => Promise<void>;
};

export const createSmallAboutCardSlice: StateCreator<
  AppState,
  [['zustand/immer', never]],
  [],
  SmallAboutCardSliceType
> = set => ({
  smallAboutCard: null,
  smallAboutCardImage: null,
  principalText: null,
  principalImage: null,
  setSmallAboutCard: async (data: SmallAboutCardType | null) => {
    try {
      set(state => {
        state.smallAboutCard = data;
      });
    } catch (error) {
      set(state => {
        state.smallAboutCard = null;
      });
    }
  },
  setSmallAboutCardImage: async (data: SmallAboutCardimageType | null) => {
    try {
      set((state: AppState) => {
        state.smallAboutCardImage = data;
      });
    } catch (error) {
      set((state: AppState) => {
        state.smallAboutCardImage = null;
      });
    }
  },
  setPrincipalText: async (data: SmallAboutCardType | null) => {
    try {
      set((state: AppState) => {
        state.principalText = data;
      });
    } catch (error) {
      set((state: AppState) => {
        state.principalText = null;
      });
    }
  },
  setPrincipalImage: async (data: SmallAboutCardimageType | null) => {
    try {
      set((state: AppState) => {
        state.principalImage = data;
      });
    } catch (error) {
      set((state: AppState) => {
        state.principalImage = null;
      });
    }
  },
});
