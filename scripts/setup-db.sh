#!/bin/bash
# =============================================================================
# Script d'initialisation de la base de données - La Chouette Violette
# =============================================================================
# Usage:
#   1. Créez une base PostgreSQL sur votre serveur Debian
#   2. Modifiez les variables ci-dessous avec vos informations
#   3. Exécutez: chmod +x setup-db.sh && ./setup-db.sh
# =============================================================================

# --- Configuration -----------------------------------------------------------
# Modifiez ces variables selon votre configuration PostgreSQL
DB_HOST="localhost"
DB_PORT="5432"
DB_NAME="lachouetteviolette"
DB_USER="lachouetteviolette"
DB_PASS="CHANGEZ_MOI"
# -----------------------------------------------------------------------------

export PGPASSWORD="$DB_PASS"

echo "=== Initialisation de la base de données La Chouette Violette ==="
echo ""

# Création des tables
echo "[1/3] Création des tables..."
psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" <<'SQL'

-- Table des utilisateurs (admin)
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
);

-- Table des messages de contact
CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Table des pré-inscriptions
CREATE TABLE IF NOT EXISTS preinscriptions (
  id SERIAL PRIMARY KEY,
  last_name TEXT NOT NULL,
  first_name TEXT NOT NULL,
  address TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  family_situation TEXT NOT NULL,
  family_situation_other TEXT,
  employment TEXT NOT NULL,
  child_name TEXT NOT NULL,
  child_birthdate TEXT NOT NULL,
  has_siblings TEXT,
  on_waiting_list TEXT,
  start_date TEXT NOT NULL,
  schedule_days TEXT NOT NULL,
  expectations TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Table du contenu du site (sections éditables)
CREATE TABLE IF NOT EXISTS site_content (
  id SERIAL PRIMARY KEY,
  section TEXT NOT NULL UNIQUE,
  content JSONB NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Table des sessions (express-session avec connect-pg-simple)
CREATE TABLE IF NOT EXISTS "session" (
  "sid" VARCHAR NOT NULL COLLATE "default",
  "sess" JSON NOT NULL,
  "expire" TIMESTAMP(6) NOT NULL,
  CONSTRAINT "session_pkey" PRIMARY KEY ("sid")
);
CREATE INDEX IF NOT EXISTS "IDX_session_expire" ON "session" ("expire");

SQL

echo "   Tables créées avec succès."

# Création du compte admin
echo ""
echo "[2/3] Création du compte administrateur..."
echo "   Le mot de passe admin sera hashé au premier démarrage de l'application."
echo "   Identifiants par défaut: admin / admin123"
echo "   (Changez le mot de passe depuis l'application après le premier login)"

# Insertion du contenu par défaut
echo ""
echo "[3/3] Le contenu par défaut sera injecté automatiquement au premier"
echo "   démarrage de l'application (seed-content.ts)."

echo ""
echo "=== Configuration terminée ==="
echo ""
echo "Variables d'environnement à configurer sur votre serveur :"
echo "  DATABASE_URL=postgresql://$DB_USER:$DB_PASS@$DB_HOST:$DB_PORT/$DB_NAME"
echo "  SESSION_SECRET=<une_chaine_aleatoire_longue>"
echo "  RESEND_API_KEY=<votre_cle_api_resend>"
echo "  RESEND_FROM_EMAIL=contact@lachouetteviolette.fr"
echo ""
echo "Commandes pour démarrer :"
echo "  npm install"
echo "  npm run build"
echo "  NODE_ENV=production node dist/index.js"
echo ""
