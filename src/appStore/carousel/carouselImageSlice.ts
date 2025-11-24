import {StateCreator} from 'zustand';
import {CarouselImage} from '@/types/homeTypes';
import {AppState} from '../appStore';

export type CarouselImagesSliceType = {
  carouselImages: CarouselImage[] | [];
  setCarouselImages: (carouselImages: CarouselImage[] | []) => Promise<void>;
  loading: boolean;
  setLoading: (loading: boolean) => Promise<void>;
  error: string | null;
  setError: (error: string | null) => Promise<void>;
};

export const createCarouselImagesSlice: StateCreator<
  AppState,
  [['zustand/immer', never]],
  [],
  CarouselImagesSliceType
> = set => ({
  carouselImages: [],
  loading: false,
  error: null,

  setCarouselImages: async (carouselImages: CarouselImage[] | []) => {
    try {
      set(state => {
        state.carouselImages = carouselImages ? carouselImages : [];
      });
    } catch (error) {
      console.error('Error setting carousel images:', error);
      set(state => {
        state.carouselImages = [];
      });
    }
  },

  setLoading: async (loading: boolean) => {
    try {
      set(state => {
        state.loading = loading;
      });
    } catch (error) {
      console.error('Error setting loading state:', error);
      set(state => {
        state.loading = false;
      });
    }
  },

  setError: async (error: string | null) => {
    try {
      set(state => {
        state.error = error;
      });
    } catch (err) {
      console.error('Error setting error state:', err);
      set(state => {
        state.error = null;
      });
    }
  },
});
