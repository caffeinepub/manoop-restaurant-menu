import { useQuery } from "@tanstack/react-query";
import type { MenuItem } from "../backend.d";
import { Category } from "../backend.d";
import { useActor } from "./useActor";

export function useAllMenuItems() {
  const { actor, isFetching } = useActor();
  return useQuery<MenuItem[]>({
    queryKey: ["menu", "all"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllItems();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useMenuItemsByCategory(category: Category | null) {
  const { actor, isFetching } = useActor();
  return useQuery<MenuItem[]>({
    queryKey: ["menu", "category", category],
    queryFn: async () => {
      if (!actor) return [];
      if (!category) return actor.getAllItems();
      return actor.getItemsByCategory(category);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSearchMenuItems(query: string) {
  const { actor, isFetching } = useActor();
  return useQuery<MenuItem[]>({
    queryKey: ["menu", "search", query],
    queryFn: async () => {
      if (!actor || !query.trim()) return [];
      return actor.searchByName(query);
    },
    enabled: !!actor && !isFetching && query.trim().length > 0,
  });
}

export { Category };
