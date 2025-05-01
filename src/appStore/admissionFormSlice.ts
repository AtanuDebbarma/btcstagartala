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
      set((state: AdmissionFormType) => {
        state.prospectusAndAdmission = data.length ? data : [];
      });
      console.log(
        data.length
          ? 'prospectusAndAdmission fetched successfully'
          : 'prospectusAndAdmission fetch error!!',
      );
    } catch (error) {
      set((state: AdmissionFormType) => {
        state.prospectusAndAdmission = [];
      });
      console.log('prospectusAndAdmission fetch error!!', error);
    }
  },
});
