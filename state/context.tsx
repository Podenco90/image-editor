import { createContext, Dispatch } from 'react';

export type State = {
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

export type Action =
  | { type: 'set_img_height'; payload: number | null }
  | { type: 'set_img_width'; payload: number | null }
  | { type: 'set_is_locked_aspect_ratio'; payload: boolean }
  | { type: 'set_aspect_ratio'; payload: number | null }
  | { type: 'set_is_grayscale'; payload: boolean }
  | { type: 'set_blur_level'; payload: number }
  | { type: 'set_canvas_initialized'; payload: boolean }
  | { type: 'set_canvas_ref'; payload: React.MutableRefObject<HTMLCanvasElement | null> }
  | { type: 'set_canvas_container_ref'; payload: React.MutableRefObject<HTMLDivElement | null> }
  | { type: 'set_src_img'; payload: HTMLImageElement | null }
  | { type: 'set_src_img_width'; payload: number | null }
  | { type: 'set_src_img_height'; payload: number | null }
  | { type: 'set_src_img_aspect_ratio'; payload: number | null }
  | { type: 'set_zoom_level'; payload: number }
  | { type: 'reset' };

export const createInitialState: () => State = () => ({
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
});

export const CanvasContext = createContext<null | State>(null);
export const CanvasDispatchContext = createContext<null | Dispatch<Action>>(null);

export const canvasReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'set_img_height':
      return {
        ...state,
        imgHeight: action.payload,
      };
    case 'set_img_width':
      return {
        ...state,
        imgWidth: action.payload,
      };
    case 'set_is_locked_aspect_ratio':
      return {
        ...state,
        isLockedAspectRatio: action.payload,
      };
    case 'set_aspect_ratio':
      return {
        ...state,
        aspectRatio: action.payload,
      };
    case 'set_is_grayscale':
      return {
        ...state,
        isGrayscale: action.payload,
      };
    case 'set_blur_level':
      return {
        ...state,
        blurLevel: action.payload,
      };
    case 'set_canvas_initialized':
      console.log('setting canvas initialized');
      return {
        ...state,
        isCanvasInitialized: action.payload,
      };
    case 'set_canvas_ref':
      return {
        ...state,
        canvasRef: action.payload,
      };
    case 'set_canvas_container_ref':
      return {
        ...state,
        canvasContainerRef: action.payload,
      };
    case 'set_zoom_level':
      return {
        ...state,
        zoomLevel: action.payload,
      };
    case 'set_src_img':
      return {
        ...state,
        srcImg: action.payload,
      };
    case 'set_src_img_width':
      return {
        ...state,
        srcImgWidth: action.payload,
      };
    case 'set_src_img_height':
      return {
        ...state,
        srcImgHeight: action.payload,
      };
    case 'set_src_img_aspect_ratio':
      return {
        ...state,
        srcImgAspectRatio: action.payload,
      };
    case 'reset':
      return { ...createInitialState() };
  }
};
