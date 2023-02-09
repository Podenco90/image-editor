import { create } from 'zustand';

interface SearchParams {
  width: number | null;
  height: number | null;
  lockedAspectRatio: string | null;
  blur: number | null;
  grayscale: string | null;
  page: number | undefined;
}
type Nullable<T> = { [K in keyof T]: T[K] | null };

type State = {
  params: Nullable<SearchParams>;
};

type Actions = {
  setParams: (params: Nullable<SearchParams>) => void;
};

export const appStore = create<State & Actions>((set) => ({
  params: {
    width: null,
    height: null,
    lockedAspectRatio: null,
    blur: null,
    grayscale: null,
    page: undefined,
  },
  setParams: (params) => set({ params }),
}));
