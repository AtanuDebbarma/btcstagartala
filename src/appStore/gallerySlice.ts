import type {StateCreator} from 'zustand';
import type {GalleryImageType} from '@/types/galleryTypes';
import type {AppState} from './appStore';

export type GallerySliceType = {
  galleryImages: GalleryImageType[] | [];
  setGalleryImages: (data: GalleryImageType[] | []) => Promise<void>;
};

export const createGallerySlice: StateCreator<
  AppState,
  [['zustand/immer', never]],
  [],
  GallerySliceType
> = set => ({
  galleryImages: [],
  setGalleryImages: async (data: GalleryImageType[] | []) => {
    set(state => {
      state.galleryImages = data;
    });
  },
});
