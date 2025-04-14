import {StateCreator} from 'zustand';
import {User} from 'firebase/auth';

export type AdminSliceType = {
  user: User | null;
  setUser: (user: User | null) => void;
};

export const createAdminSlice: StateCreator<
  AdminSliceType & any,
  [['zustand/immer', never]],
  [],
  AdminSliceType
> = set => ({
  user: null,
  setUser: (user: User | null) => set({user}),
});
