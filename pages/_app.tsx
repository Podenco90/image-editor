import '@podenco/styles/globals.css';
import 'antd/dist/reset.css';

import {
  CanvasContext,
  CanvasDispatchContext,
  canvasReducer,
  createInitialState,
} from '@podenco/state/context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppProps } from 'next/app';
import { useReducer, useState } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  const [state, dispatch] = useReducer(canvasReducer, null, createInitialState);
  return (
    <QueryClientProvider client={queryClient}>
      <CanvasContext.Provider value={state}>
        <CanvasDispatchContext.Provider value={dispatch}>
          <Component {...pageProps} />
          <ReactQueryDevtools initialIsOpen={true} />
        </CanvasDispatchContext.Provider>
      </CanvasContext.Provider>
    </QueryClientProvider>
  );
}
