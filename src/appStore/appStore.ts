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
import {
  SmallAboutCardSliceType,
  createSmallAboutCardSlice,
} from './smallAboutCardSlice';
import {GallerySliceType, createGallerySlice} from './gallerySlice';
import {
  CollegeResourcesSliceType,
  createCollegeResourcesSlice,
} from './collegeResourcesSlice';

export type AppState = AdminSliceType &
  DimentionsSliceType &
  CarouselImagesSliceType &
  AdmissionFormType &
  NoticeBoardSliceType &
  AlertsSliceType &
  SmallAboutCardSliceType &
  GallerySliceType &
  CollegeResourcesSliceType;

export const appStore = createWithEqualityFn<AppState>()(
  immer((...store) => ({
    ...createAdminSlice(...store),
    ...createDimentionsSlice(...store),
    ...createCarouselImagesSlice(...store),
    ...createAdmissionFormSlice(...store),
    ...createNoticeBoardSlice(...store),
    ...createAlertsSlice(...store),
    ...createSmallAboutCardSlice(...store),
    ...createGallerySlice(...store),
    ...createCollegeResourcesSlice(...store),
  })),
  shallow,
);
