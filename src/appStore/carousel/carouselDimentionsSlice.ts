import {StateCreator} from 'zustand';
import {Dimensions} from '@/services/carousel/fetchDimentions';

export const defaultDimValues: Dimensions = {
  default: 350,
  minWidth_410: 375,
  minWidth_430: 400,
  minWidth_820: 430,
  minWidth_1024: 480,
  objectFit: 'cover',
};

export type DimentionsSliceType = {
  dimensions: Dimensions | null;
  setDimensions: (dimensions: Dimensions | null) => Promise<void>;
  dimLoading: boolean;
  setDimLoading: (loading: boolean) => Promise<void>;
  dimError: boolean;
  setDimError: (error: boolean) => Promise<void>;
};

export const createDimentionsSlice: StateCreator<
  DimentionsSliceType & any,
  [['zustand/immer', never]],
  [],
  DimentionsSliceType
> = set => ({
  dimensions: null,
  dimLoading: false,
  dimError: false,

  setDimensions: async (dim: Dimensions | null) => {
    try {
      set((state: DimentionsSliceType) => ({
        ...state,
        dimensions: dim ? dim : defaultDimValues,
      }));
    } catch (error) {
      console.error('Error setting dimensions:', error);
      set((state: DimentionsSliceType) => ({
        ...state,
        dimensions: defaultDimValues,
      }));
    }
  },

  setDimLoading: async (loading: boolean) => {
    try {
      set((state: DimentionsSliceType) => ({
        ...state,
        dimLoading: loading,
      }));
    } catch (error) {
      set((state: DimentionsSliceType) => ({
        ...state,
        dimLoading: false,
      }));
      console.error('Error setting dimLoading:', error);
    }
  },

  setDimError: async (error: boolean) => {
    try {
      set((state: DimentionsSliceType) => ({
        ...state,
        dimError: error,
      }));
    } catch (err) {
      set((state: DimentionsSliceType) => ({
        ...state,
        dimError: false,
      }));
      console.error('Error setting dimError:', err);
    }
  },
});
