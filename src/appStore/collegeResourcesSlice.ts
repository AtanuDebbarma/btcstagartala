import {StateCreator} from 'zustand';
import {CollegeResourceType} from '@/types/collegeResourcesTypes';

export type CollegeResourcesSliceType = {
  collegeResources: CollegeResourceType[] | [];
  setCollegeResources: (data: CollegeResourceType[] | []) => Promise<void>;
};

export const createCollegeResourcesSlice: StateCreator<
  CollegeResourcesSliceType & any,
  [['zustand/immer', never]],
  [],
  CollegeResourcesSliceType
> = set => ({
  collegeResources: [],
  setCollegeResources: async (data: CollegeResourceType[] | []) => {
    try {
      set((state: CollegeResourcesSliceType) => {
        state.collegeResources = data.length ? data : [];
      });
    } catch (error) {
      set((state: CollegeResourcesSliceType) => {
        state.collegeResources = [];
      });
    }
  },
});
