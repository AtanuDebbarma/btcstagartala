import type {StateCreator} from 'zustand';
import type {
  PermanentAffiliationType,
  ProspectusAndAdmissionFormType,
} from '@/types/homeTypes';
import type {AppState} from './appStore';

export type AdmissionFormType = {
  prospectusAndAdmission: ProspectusAndAdmissionFormType[] | [];
  setProspectusAndAdmission: (
    data: ProspectusAndAdmissionFormType[] | [],
  ) => Promise<void>;
  permanentAffiliation: PermanentAffiliationType | null;
  setPermanentAffiliation: (
    data: PermanentAffiliationType | null,
  ) => Promise<void>;
};

export const createAdmissionFormSlice: StateCreator<
  AppState,
  [['zustand/immer', never]],
  [],
  AdmissionFormType
> = set => ({
  prospectusAndAdmission: [],
  permanentAffiliation: null,
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
      console.log('Error setting prospectusAndAdmission:', error);
    }
  },
  setPermanentAffiliation: async (data: PermanentAffiliationType | null) => {
    try {
      set(state => {
        state.permanentAffiliation = data ? data : null;
      });
    } catch (error) {
      set(state => {
        state.permanentAffiliation = null;
      });
      console.log('Error setting permanentAffiliation:', error);
    }
  },
});
