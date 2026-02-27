# La chouette violette - Site vitrine MAM

## Description
Site web vitrine pour "La chouette violette", une Maison d'Assistantes Maternelles (MAM). Design moderne et elegant inspire de sites professionnels de la petite enfance.

## Architecture
- **Frontend**: React + Vite + Tailwind CSS + Framer Motion
- **Backend**: Express.js (API contact uniquement)
- **Database**: PostgreSQL (messages de contact)
- **Styling**: Tailwind avec theme rose/violet, typographie Playfair Display (titres) + Inter (corps)

## Structure des fichiers
```
client/src/
  pages/home.tsx              - Page principale (single-page)
  components/
    layout/Navbar.tsx         - Navigation fixe avec liens centres
    layout/Footer.tsx         - Pied de page avec coordonnees
    sections/Hero.tsx         - Hero plein ecran avec photo
    sections/Gallery.tsx      - Galerie carousel + texte de presentation
    sections/Team.tsx         - Presentation de l'equipe
    sections/Project.tsx      - Projet pedagogique (4 piliers)
    sections/Contact.tsx      - Formulaire de contact + coordonnees
  hooks/use-messages.ts       - Hook mutation pour envoi de messages
shared/
  schema.ts                   - Schema DB (messages)
  routes.ts                   - Contrat API
server/
  routes.ts                   - API endpoints (POST /api/messages)
  storage.ts                  - Couche de persistance
  db.ts                       - Connexion PostgreSQL
```

## Design
- Palette: rose (#primary 340 55% 55%), violet (#secondary 270 40% 50%), fond blanc
- Typographie: Playfair Display (serif, elegant) pour les titres, Inter pour le corps
- Navigation centree avec logo au milieu, icones reseaux sociaux flottantes a droite
- Sections alternant fond blanc et fond gris clair (muted)
- Boutons rectangulaires (rounded-none), style editorial moderne
