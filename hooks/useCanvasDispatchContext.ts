import { CanvasDispatchContext } from '@podenco/state/context';
import { useContext } from 'react';

export default function useCanvasDispatchContext() {
  const currentUserContext = useContext(CanvasDispatchContext);

  if (!currentUserContext) {
    throw new Error('useCanvasDispatch has to be used within <CanvasContextDispatch.Provider>');
  }

  return currentUserContext;
}
