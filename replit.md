# La chouette violette - Site vitrine MAM

## Description
Site web vitrine pour "La chouette violette", une Maison d'Assistantes Maternelles (MAM). Design moderne et elegant inspire de sites professionnels de la petite enfance. Inclut un panneau d'administration pour modifier le contenu de chaque section.

## Architecture
- **Frontend**: React + Vite + Tailwind CSS + Framer Motion
- **Backend**: Express.js + Passport (auth sessions) + PostgreSQL
- **Database**: PostgreSQL (messages, users, site_content)
- **Styling**: Tailwind avec theme rose/violet, typographie Playfair Display (titres) + Inter (corps)

## Structure des fichiers
```
client/src/
  pages/
    home.tsx                    - Page principale (single-page)
    admin.tsx                   - Panneau d'administration
    admin-login.tsx             - Page de connexion admin
    not-found.tsx               - Page 404
  components/
    layout/Navbar.tsx           - Navigation avec logo a gauche
    layout/Footer.tsx           - Pied de page avec coordonnees
    sections/Hero.tsx           - Hero plein ecran (contenu dynamique)
    sections/Gallery.tsx        - Galerie carousel (contenu dynamique)
    sections/Team.tsx           - Presentation equipe (contenu dynamique)
    sections/Project.tsx        - Projet pedagogique (contenu dynamique)
    sections/Contact.tsx        - Formulaire contact (contenu dynamique)
  hooks/
    use-messages.ts             - Hook mutation pour envoi de messages
    use-auth.ts                 - Hooks auth (login, logout, session)
    use-content.ts              - Hooks lecture/ecriture contenu sections
shared/
  schema.ts                     - Schemas DB (messages, users, site_content) + Zod schemas par section
  routes.ts                     - Contrat API
server/
  routes.ts                     - API endpoints
  storage.ts                    - Couche de persistance (CRUD complet)
  auth.ts                       - Auth Passport + sessions + seed admin
  seed-content.ts               - Contenu par defaut pour chaque section
  db.ts                         - Connexion PostgreSQL
```

## API Endpoints
- `POST /api/messages` - Envoi formulaire contact (public)
- `GET /api/messages` - Liste messages (auth requise)
- `GET /api/content` - Tout le contenu (public)
- `GET /api/content/:section` - Contenu d'une section (public)
- `PUT /api/content/:section` - Mise a jour section (auth requise)
- `POST /api/auth/login` - Connexion
- `POST /api/auth/logout` - Deconnexion
- `GET /api/auth/me` - User courant

## Admin
- Acces: `/admin/login` (identifiants: admin / admin123)
- Panneau: `/admin` - Edition de toutes les sections + vue des messages recus
- Contenu stocke en JSONB dans la table `site_content`

## Design
- Palette: rose (#primary 340 55% 55%), violet lavande (#c9a0dc pour titres)
- Fond: blanc casse violet (270 20% 97%)
- Typographie: Playfair Display (serif) pour titres, Inter pour corps
- Navigation: logo La chouette violette a gauche, liens centres
- Sections alternant fond clair et fond muted violet
- Boutons rectangulaires (rounded-none), style editorial moderne
