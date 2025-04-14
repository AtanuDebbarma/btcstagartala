import {createWithEqualityFn} from 'zustand/traditional';
import {immer} from 'zustand/middleware/immer';
import {shallow} from 'zustand/shallow';
import {AdminSliceType, createAdminSlice} from './adminSlice';

export type AppState = AdminSliceType;

export const appStore = createWithEqualityFn<AppState>()(
  immer((...store) => ({
    ...createAdminSlice(...store),
  })),
  shallow,
);
