import {StateCreator} from 'zustand';
import {AlertsType} from '@/types/homeTypes';

export type AlertsSliceType = {
  alerts: AlertsType[] | [];
  setAlerts: (alerts: AlertsType[] | []) => Promise<void>;
};

export const createAlertsSlice: StateCreator<
  AlertsSliceType & any,
  [['zustand/immer', never]],
  [],
  AlertsSliceType
> = set => ({
  alerts: [],
  setAlerts: async (alerts: AlertsType[] | []) => {
    try {
      set((state: AlertsSliceType) => {
        state.alerts = alerts;
      });
    } catch (error) {
      console.error('Failed to set alerts', error);
    }
  },
});
