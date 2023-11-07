'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function ReactQuery({ children }) {
  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      {children}
    </QueryClientProvider>
  );
}
