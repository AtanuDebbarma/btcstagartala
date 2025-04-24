import {StateCreator} from 'zustand';
import {ProspectusAndAdmissionFormType} from '@/types/homeTypes';

export type AdmissionFormType = {
  prospectusAndAdmission: ProspectusAndAdmissionFormType[] | [];
  setProspectusAndAdmission: (
    data: ProspectusAndAdmissionFormType[] | [],
  ) => Promise<void>;
};

export const createAdmissionFormSlice: StateCreator<
  AdmissionFormType & any,
  [['zustand/immer', never]],
  [],
  AdmissionFormType
> = set => ({
  prospectusAndAdmission: [],
  setProspectusAndAdmission: async (
    data: ProspectusAndAdmissionFormType[] | [],
  ) => {
    try {
      if (data) {
        set((state: AdmissionFormType) => ({
          ...state,
          prospectusAndAdmission: data,
        }));
        console.log('prospectusAndAdmission fetched successfully');
      } else {
        set((state: AdmissionFormType) => ({
          ...state,
          prospectusAndAdmission: [],
        }));
        console.log('prospectusAndAdmission fetch error!!');
      }
    } catch (error) {
      set((state: AdmissionFormType) => ({
        ...state,
        prospectusAndAdmission: [],
      }));
      console.log('prospectusAndAdmission fetch error!!', error);
    }
  },
});
