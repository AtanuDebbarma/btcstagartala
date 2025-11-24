import {StateCreator} from 'zustand';
import {ProspectusAndAdmissionFormType} from '@/types/homeTypes';
import {AppState} from './appStore';

export type AdmissionFormType = {
  prospectusAndAdmission: ProspectusAndAdmissionFormType[] | [];
  setProspectusAndAdmission: (
    data: ProspectusAndAdmissionFormType[] | [],
  ) => Promise<void>;
};

export const createAdmissionFormSlice: StateCreator<
  AppState,
  [['zustand/immer', never]],
  [],
  AdmissionFormType
> = set => ({
  prospectusAndAdmission: [],
  setProspectusAndAdmission: async (
    data: ProspectusAndAdmissionFormType[] | [],
  ) => {
    try {
      set(state => {
        state.prospectusAndAdmission = data.length ? data : [];
      });
    } catch (error) {
      set(state => {
        state.prospectusAndAdmission = [];
      });
    }
  },
});
