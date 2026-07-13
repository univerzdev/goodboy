"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";
import { createQueryClient } from "@/lib/query-client";

type ReactQueryProviderProps = {
  children: ReactNode;
};

const ReactQueryProvider = ({ children }: ReactQueryProviderProps) => {
  const [queryClient] = useState<QueryClient>(() => createQueryClient());

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default ReactQueryProvider;
