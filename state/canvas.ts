import { create } from 'zustand';

export const canvasStore = create<{
  scalingFactor: number;
  setScalingFactor: (value: number) => void;
  imgHeight: number | null;
  setImgHeight: (value: number | null) => void;
  imgWidth: number | null;
  setImgWidth: (value: number | null) => void;
  isLockedAspectRatio: boolean;
  setIsLockedAspectRatio: (value: boolean) => void;
  aspectRatio: number | null;
  setAspectRatio: (value: number | null) => void;
  isGrayscale: boolean;
  setIsGrayscale: (value: boolean) => void;
  blurLevel: number;
  setBlurLevel: (value: number) => void;
  canvasInitialized: boolean;
  setCanvasInitialized: (value: boolean) => void;
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
  setCanvasRef: (value: React.MutableRefObject<HTMLCanvasElement | null>) => void;
  srcImg: HTMLImageElement | null;
  setSrcImg: (value: HTMLImageElement | null) => void;
  srcImgWidth: number | null;
  setSrcImgWidth: (value: number | null) => void;
  srcImgHeight: number | null;
  setSrcImgHeight: (value: number | null) => void;
  srcImgAspectRatio: number | null;
  setSrcImgAspectRatio: (value: number | null) => void;
}>((set) => ({
  scalingFactor: 1,
  setScalingFactor: (value) => set({ scalingFactor: value }),
  imgHeight: null,
  setImgHeight: (value) => set({ imgHeight: value }),
  imgWidth: null,
  setImgWidth: (value) => set({ imgWidth: value }),
  isLockedAspectRatio: false,
  setIsLockedAspectRatio: (value) => set({ isLockedAspectRatio: value }),
  aspectRatio: null,
  setAspectRatio: (value) => set({ aspectRatio: value }),
  isGrayscale: false,
  setIsGrayscale: (value) => set({ isGrayscale: value }),
  blurLevel: 0,
  setBlurLevel: (value) => set({ blurLevel: value }),
  canvasInitialized: false,
  setCanvasInitialized: (value) => set({ canvasInitialized: value }),
  canvasRef: { current: null },
  setCanvasRef: (value) => set({ canvasRef: value }),
  srcImg: null,
  setSrcImg: (value) => set({ srcImg: value }),
  srcImgWidth: null,
  setSrcImgWidth: (value) => set({ srcImgWidth: value }),
  srcImgHeight: null,
  setSrcImgHeight: (value) => set({ srcImgHeight: value }),
  srcImgAspectRatio: null,
  setSrcImgAspectRatio: (value) => set({ srcImgAspectRatio: value }),
}));
