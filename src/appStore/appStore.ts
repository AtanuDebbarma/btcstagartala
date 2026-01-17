import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';
import type {AdminSliceType} from './adminSlice';
import {createAdminSlice} from './adminSlice';
import type {DimentionsSliceType} from './carousel/carouselDimentionsSlice';
import {createDimentionsSlice} from './carousel/carouselDimentionsSlice';
import type {CarouselImagesSliceType} from './carousel/carouselImageSlice';
import {createCarouselImagesSlice} from './carousel/carouselImageSlice';
import type {AdmissionFormType} from './admissionFormSlice';
import {createAdmissionFormSlice} from './admissionFormSlice';
import type {NoticeBoardSliceType} from './noticeBoardSlice';
import {createNoticeBoardSlice} from './noticeBoardSlice';
import type {AlertsSliceType} from './alertsSlice';
import {createAlertsSlice} from './alertsSlice';
import type {SmallAboutCardSliceType} from './smallAboutCardSlice';
import {createSmallAboutCardSlice} from './smallAboutCardSlice';
import type {GallerySliceType} from './gallerySlice';
import {createGallerySlice} from './gallerySlice';
import type {CollegeResourcesSliceType} from './collegeResourcesSlice';
import {createCollegeResourcesSlice} from './collegeResourcesSlice';
import type {AICTESlice} from './aicteSlice';
import {createAICTESlice} from './aicteSlice';
import type {MiscDocumentsSlice} from './miscDocumentsSlice';
import {createMiscDocumentsSlice} from './miscDocumentsSlice';
import type {ResultsSlice} from './resultsSlice';
import {createResultsSlice} from './resultsSlice';
import type {AISHESlice} from './aisheSlice';
import {createAISHESlice} from './aisheSlice';
import type {DHESlice} from './dheSlice';
import {createDHESlice} from './dheSlice';

export type AppState = AdminSliceType &
  DimentionsSliceType &
  CarouselImagesSliceType &
  AdmissionFormType &
  NoticeBoardSliceType &
  AlertsSliceType &
  SmallAboutCardSliceType &
  GallerySliceType &
  CollegeResourcesSliceType &
  AICTESlice &
  MiscDocumentsSlice &
  ResultsSlice &
  AISHESlice &
  DHESlice;

export const appStore = create<AppState>()(
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
    ...createAICTESlice(...store),
    ...createMiscDocumentsSlice(...store),
    ...createResultsSlice(...store),
    ...createAISHESlice(...store),
    ...createDHESlice(...store),
  })),
);
