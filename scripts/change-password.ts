import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";
import pg from "pg";

const scryptAsync = promisify(scrypt);

async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

async function main() {
  const username = process.argv[2];
  const newPassword = process.argv[3];

  if (!username || !newPassword) {
    console.log("Usage: npx tsx scripts/change-password.ts <username> <nouveau_mot_de_passe>");
    console.log("Exemple: npx tsx scripts/change-password.ts admin MonNouveauMotDePasse");
    process.exit(1);
  }

  if (!process.env.DATABASE_URL) {
    console.error("Erreur: la variable DATABASE_URL n'est pas définie.");
    process.exit(1);
  }

  const client = new pg.Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();

  const result = await client.query("SELECT id FROM users WHERE username = $1", [username]);
  if (result.rows.length === 0) {
    console.error(`Erreur: l'utilisateur "${username}" n'existe pas.`);
    await client.end();
    process.exit(1);
  }

  const hashed = await hashPassword(newPassword);
  await client.query("UPDATE users SET password = $1 WHERE username = $2", [hashed, username]);

  console.log(`Mot de passe de "${username}" mis à jour avec succès.`);
  await client.end();
}

main().catch((err) => {
  console.error("Erreur:", err.message);
  process.exit(1);
});
