import {StateCreator} from 'zustand';
import {User} from 'firebase/auth';
import {AppState} from './appStore';

export type AdminSliceType = {
  user: User | null;
  setUser: (user: User | null) => void;
};

export const createAdminSlice: StateCreator<
  AppState,
  [['zustand/immer', never]],
  [],
  AdminSliceType
> = set => ({
  user: null,
  setUser: (user: User | null) => {
    set(state => {
      state.user = user; // ✅ mutate directly — immer handles it
    });
  },
});
