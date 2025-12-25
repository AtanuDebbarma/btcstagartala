import type {StateCreator} from 'zustand';
import type {CollegeResourceType} from '@/types/collegeResourcesTypes';
import type {AppState} from './appStore';

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
      console.log('Error setting collegeResources:', error);
    }
  },
});
