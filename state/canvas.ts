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
  imgHeight: number | null;
  imgWidth: number | null;
  isLockedAspectRatio: boolean;
  aspectRatio: number | null;
  isGrayscale: boolean;
  blurLevel: number;
  isCanvasInitialized: boolean;
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
  canvasContainerRef: React.MutableRefObject<HTMLDivElement | null>;
  srcImg: HTMLImageElement | null;
  srcImgWidth: number | null;
  srcImgHeight: number | null;
  srcImgAspectRatio: number | null;
  zoomLevel: number;
};

type Actions = {
  setImgHeight: (value: number | null) => void;
  setImgWidth: (value: number | null) => void;
  setIsLockedAspectRatio: (value: boolean) => void;
  setAspectRatio: (value: number | null) => void;
  setIsGrayscale: (value: boolean) => void;
  setBlurLevel: (value: number) => void;
  setCanvasInitialized: (value: boolean) => void;
  setCanvasRef: (value: React.MutableRefObject<HTMLCanvasElement | null>) => void;
  setCanvasContainerRef: (value: React.MutableRefObject<HTMLDivElement | null>) => void;
  setSrcImg: (value: HTMLImageElement | null) => void;
  setSrcImgWidth: (value: number | null) => void;
  setSrcImgHeight: (value: number | null) => void;
  setSrcImgAspectRatio: (value: number | null) => void;
  setZoomLevel: (value: number) => void;
  reset: () => void;
};

const initialState: State = {
  imgHeight: null,
  imgWidth: null,
  isLockedAspectRatio: false,
  aspectRatio: null,
  isGrayscale: false,
  blurLevel: 0,
  isCanvasInitialized: false,
  canvasRef: { current: null },
  canvasContainerRef: { current: null },
  srcImg: null,
  srcImgWidth: null,
  srcImgHeight: null,
  srcImgAspectRatio: null,
  zoomLevel: 1,
};

export const canvasStore = create<State & Actions>((set) => ({
  ...initialState,

  setImgHeight: (value) => set({ imgHeight: value }),
  setImgWidth: (value) => set({ imgWidth: value }),
  setIsLockedAspectRatio: (value) => set({ isLockedAspectRatio: value }),
  setAspectRatio: (value) => set({ aspectRatio: value }),
  setIsGrayscale: (value) => set({ isGrayscale: value }),
  setBlurLevel: (value) => set({ blurLevel: value }),
  setCanvasInitialized: (value) => set({ isCanvasInitialized: value }),
  setCanvasRef: (value) => set({ canvasRef: value }),
  setCanvasContainerRef: (value) => set({ canvasContainerRef: value }),
  setZoomLevel: (value) => set({ zoomLevel: value }),
  setSrcImg: (value) => set({ srcImg: value }),
  setSrcImgWidth: (value) => set({ srcImgWidth: value }),
  setSrcImgHeight: (value) => set({ srcImgHeight: value }),
  setSrcImgAspectRatio: (value) => set({ srcImgAspectRatio: value }),

  reset: () => {
    set(initialState);
  },
}));
