---
name: Routes Express non chargées après ajout
description: tsx ne redémarre pas toujours auto; routes nouvelles invisibles jusqu'au redémarrage manuel
---

## Problème
Après ajout de nouvelles routes dans `server/routes.ts`, le serveur peut continuer à tourner sur l'ancienne version du fichier. Les nouvelles routes retournent du HTML (200) au lieu de 401/données — elles ne sont pas chargées.

Test rapide : `curl -o /dev/null -w "%{http_code}" -X DELETE http://localhost:5000/api/preinscriptions/1` — si retourne 200 avec HTML, routes pas chargées.

**Why:** `tsx` en mode watch peut manquer des changements selon le timing et les dépendances de module.

**Fix:** Redémarrer le workflow manuellement via `WorkflowsRestart` après tout ajout de routes côté serveur. Vérifier ensuite que toutes les routes retournent 401 (non authentifié) et non 200 HTML.
