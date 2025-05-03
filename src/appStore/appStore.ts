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
import {AlertsSliceType, createAlertsSlice} from './alertsSlice';

export type AppState = AdminSliceType &
  DimentionsSliceType &
  CarouselImagesSliceType &
  AdmissionFormType &
  NoticeBoardSliceType &
  AlertsSliceType;

export const appStore = createWithEqualityFn<AppState>()(
  immer((...store) => ({
    ...createAdminSlice(...store),
    ...createDimentionsSlice(...store),
    ...createCarouselImagesSlice(...store),
    ...createAdmissionFormSlice(...store),
    ...createNoticeBoardSlice(...store),
    ...createAlertsSlice(...store),
  })),
  shallow,
);
