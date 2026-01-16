import type {StateCreator} from 'zustand';
import type {ResultType} from '@/types/resultsTypes';
import type {AppState} from './appStore';

export interface ResultsSlice {
  results: ResultType[];
  setResults: (documents: ResultType[]) => Promise<void>;
}

export const createResultsSlice: StateCreator<
  AppState,
  [['zustand/immer', never]],
  [],
  ResultsSlice
> = set => ({
  results: [],
  setResults: async (documents: ResultType[]) => {
    set(state => {
      state.results = documents;
    });
  },
});
