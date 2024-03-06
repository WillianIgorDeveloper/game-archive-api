import { sql } from "./postgres";

const createTable = async () => {
  try {
    await sql`
			CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
		`;
    await sql`
			CREATE TABLE IF NOT EXISTS users (
				id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
				tag TEXT NOT NULL UNIQUE,
				password TEXT NOT NULL,
				createdat TIMESTAMP DEFAULT NOW()
			);
		`;
    await sql`
			CREATE TABLE IF NOT EXISTS games (
				id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
				name TEXT NOT NULL,
				createdat TIMESTAMP DEFAULT NOW()
			);
		`;
    console.log("✔️  Tables created successfully!");
  } catch (error) {
    console.log(error);
    console.log("✖️  Error creating tables!");
  }
};

createTable();
