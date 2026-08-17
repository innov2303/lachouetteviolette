---
name: React Query cache race condition
description: Pattern fiable pour suppression immédiate dans une liste avec refetchInterval actif
---

## Problème
Avec `refetchInterval` actif sur plusieurs observers partageant la même query key, `setQueryData` + `invalidateQueries` provoque une race condition : un GET déjà en vol revient après le setQueryData et écrase le cache avec les anciennes données. L'item "supprimé" réapparaît.

`cancelQueries` ne fonctionne pas non plus si le `queryFn` global ne passe pas `signal` au fetch (le fetch continue jusqu'au bout malgré l'annulation React Query).

## Fix appliqué dans ce projet

**1. Passer `signal` dans queryClient.ts :**
```ts
async ({ queryKey, signal }) => {
  const res = await fetch(queryKey.join("/"), { credentials: "include", signal });
```

**2. Gérer l'affichage avec du local state, indépendant du cache :**
```tsx
const [hiddenIds, setHiddenIds] = useState<Set<number>>(new Set());
const visibleItems = rawData.filter(p => !hiddenIds.has(p.id));

const deleteMutation = useMutation({
  mutationFn: ...,
  onMutate: (id) => setHiddenIds(prev => new Set(prev).add(id)),
  onError: (_err, id) => setHiddenIds(prev => { const s = new Set(prev); s.delete(id); return s; }),
  onSuccess: () => queryClient.invalidateQueries({ queryKey: [...] }),
  onSettled: (_data, _err, id) => {
    queryClient.invalidateQueries({ queryKey: [...] }).then(() => {
      setHiddenIds(prev => { const s = new Set(prev); s.delete(id); return s; });
    });
  },
});
```

**Why:** Le cache React Query peut être écrasé par des refetches en vol. Le local state `hiddenIds` est la source de vérité pour l'affichage jusqu'à ce que le refetch post-mutation confirme la suppression.

**How to apply:** Utiliser ce pattern pour toute liste avec polling (`refetchInterval`) où des mutations de suppression/restauration doivent être immédiatement visibles.
