import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";

export function useAllContent() {
  return useQuery({
    queryKey: ["/api/content"],
    staleTime: 30000,
  });
}

export function useSectionContent<T = unknown>(section: string) {
  return useQuery<T>({
    queryKey: ["/api/content", section],
    staleTime: 30000,
  });
}

export function useUpdateContent(section: string) {
  return useMutation({
    mutationFn: async (data: unknown) => {
      const res = await apiRequest("PUT", `/api/content/${section}`, data);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/content"] });
      queryClient.invalidateQueries({ queryKey: ["/api/content", section] });
    },
  });
}

export function useMessages() {
  return useQuery({
    queryKey: ["/api/messages"],
  });
}

export function usePreinscriptions() {
  return useQuery({
    queryKey: ["/api/preinscriptions"],
  });
}
