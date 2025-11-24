import {StateCreator} from 'zustand';
import {AlertsType} from '@/types/homeTypes';
import {AppState} from './appStore';

export type AlertsSliceType = {
  alerts: AlertsType[] | [];
  setAlerts: (alerts: AlertsType[] | []) => Promise<void>;
};

export const createAlertsSlice: StateCreator<
  AppState,
  [['zustand/immer', never]],
  [],
  AlertsSliceType
> = set => ({
  alerts: [],
  setAlerts: async (alerts: AlertsType[] | []) => {
    try {
      set(state => {
        state.alerts = alerts;
      });
    } catch (error) {
      console.error('Failed to set alerts', error);
    }
  },
});
