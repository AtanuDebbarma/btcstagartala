import {StateCreator} from 'zustand';
import {CarouselImage} from '@/types/homeTypes';
export type CarouselImagesSliceType = {
  carouselImages: CarouselImage[] | [];
  setCarouselImages: (carouselImages: CarouselImage[] | []) => Promise<void>;
  loading: boolean;
  setLoading: (loading: boolean) => Promise<void>;
  error: string | null;
  setError: (error: string | null) => Promise<void>;
};

export const createCarouselImagesSlice: StateCreator<
  CarouselImagesSliceType & any,
  [['zustand/immer', never]],
  [],
  CarouselImagesSliceType
> = set => ({
  carouselImages: [],
  loading: false,
  error: null,

  setCarouselImages: async (carouselImages: CarouselImage[] | []) => {
    try {
      set((state: CarouselImagesSliceType) => ({
        ...state,
        carouselImages: carouselImages ? carouselImages : [],
      }));
    } catch (error) {
      console.error('Error setting carousel images:', error);
      set((state: CarouselImagesSliceType) => ({
        ...state,
        carouselImages: null,
      }));
    }
  },

  setLoading: async (loading: boolean) => {
    try {
      set((state: CarouselImagesSliceType) => ({
        ...state,
        loading,
      }));
    } catch (error) {
      console.error('Error setting loading state:', error);
      set((state: CarouselImagesSliceType) => ({
        ...state,
        loading: false,
      }));
    }
  },

  setError: async (error: string | null) => {
    try {
      set((state: CarouselImagesSliceType) => ({
        ...state,
        error,
      }));
    } catch (err) {
      console.error('Error setting error state:', err);
      set((state: CarouselImagesSliceType) => ({
        ...state,
        error: null,
      }));
    }
  },
});
