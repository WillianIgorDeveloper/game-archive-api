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
			CREATE TABLE IF NOT EXISTS groups (
				id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
				createdby uuid NOT NULL REFERENCES users(id),
				tag TEXT NOT NULL,
				createdat TIMESTAMP DEFAULT NOW()
			);
		`;

    await sql`
			CREATE TABLE IF NOT EXISTS users_groups (
				user_id uuid NOT NULL REFERENCES users(id),
				group_id uuid NOT NULL REFERENCES groups(id),
				joinedat TIMESTAMP DEFAULT NOW()
			);
		`;

    await sql`
			CREATE TABLE IF NOT EXISTS games (
				id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
				user_id uuid NOT NULL REFERENCES users(id),
				name TEXT NOT NULL,
				status_id uuid REFERENCES status(id),
				score_id uuid REFERENCES score(id),
				game_link TEXT,
				createdat TIMESTAMP DEFAULT NOW()
			);
		`;

    await sql`
			CREATE TABLE IF NOT EXISTS status (
				id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
				user_id uuid NOT NULL REFERENCES users(id),
				name TEXT NOT NULL,
				color TEXT NOT NULL
			);
		`;

    await sql`
			CREATE TABLE IF NOT EXISTS scores (
				id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
				user_id uuid NOT NULL REFERENCES users(id),
				name TEXT NOT NULL
			);
		`;

    console.log("🟢 Tables created successfully!");
  } catch (error) {
    console.log(`🔴 Error creating tables! => ${error}`);
  }
};

createTable();
