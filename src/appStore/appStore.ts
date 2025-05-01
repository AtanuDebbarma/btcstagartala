import {createWithEqualityFn} from 'zustand/traditional';
import {immer} from 'zustand/middleware/immer';
import {shallow} from 'zustand/shallow';
import {AdminSliceType, createAdminSlice} from './adminSlice';
import {
  DimentionsSliceType,
  createDimentionsSlice,
} from './carousel/carouselDimentionsSlice';
import {
  CarouselImagesSliceType,
  createCarouselImagesSlice,
} from './carousel/carouselImageSlice';
import {
  AdmissionFormType,
  createAdmissionFormSlice,
} from './admissionFormSlice';
import {NoticeBoardSliceType, createNoticeBoardSlice} from './noticeBoardSlice';

export type AppState = AdminSliceType &
  DimentionsSliceType &
  CarouselImagesSliceType &
  AdmissionFormType &
  NoticeBoardSliceType;

export const appStore = createWithEqualityFn<AppState>()(
  immer((...store) => ({
    ...createAdminSlice(...store),
    ...createDimentionsSlice(...store),
    ...createCarouselImagesSlice(...store),
    ...createAdmissionFormSlice(...store),
    ...createNoticeBoardSlice(...store),
  })),
  shallow,
);
