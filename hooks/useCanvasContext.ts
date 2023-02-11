import { CanvasContext } from '@podenco/state/context';
import { useContext } from 'react';

export default function useCanvasContext() {
  const currentUserContext = useContext(CanvasContext);

  if (!currentUserContext) {
    throw new Error('useCanvasContext has to be used within <CanvasContext.Provider>');
  }

  return currentUserContext;
}
