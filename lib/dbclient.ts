import { createClient } from "@libsql/client";

export const turso = createClient({
  url: process.env.DB_URL!,
  authToken: process.env.DB_TOKEN!,
});