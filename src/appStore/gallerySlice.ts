import {StateCreator} from 'zustand';
import {GalleryImageType} from '@/types/galleryTypes';

export type GallerySliceType = {
  galleryImages: GalleryImageType[] | [];
  setGalleryImages: (data: GalleryImageType[] | []) => Promise<void>;
};

export const createGallerySlice: StateCreator<
  GallerySliceType,
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
