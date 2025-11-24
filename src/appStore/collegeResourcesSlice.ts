import {StateCreator} from 'zustand';
import {CollegeResourceType} from '@/types/collegeResourcesTypes';
import {AppState} from './appStore';

export type CollegeResourcesSliceType = {
  collegeResources: CollegeResourceType[] | [];
  setCollegeResources: (data: CollegeResourceType[] | []) => Promise<void>;
};

export const createCollegeResourcesSlice: StateCreator<
  AppState,
  [['zustand/immer', never]],
  [],
  CollegeResourcesSliceType
> = set => ({
  collegeResources: [],
  setCollegeResources: async (data: CollegeResourceType[] | []) => {
    try {
      set(state => {
        state.collegeResources = data.length ? data : [];
      });
    } catch (error) {
      set(state => {
        state.collegeResources = [];
      });
    }
  },
});
