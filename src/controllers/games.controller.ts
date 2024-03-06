import { sql } from "../database/postgres";
import "dotenv/config";

export const loadGames = async () => {
  try {
    const gamesResponse = await sql`
			SELECT
        *
      FROM games
		`;

    return {
      success: true,
      message: "Games loaded successfully",
      body: {
        games: gamesResponse,
      },
    };
  } catch (error) {
    throw new Error("# loadGames Error");
  }
};

export const createGame = async ({ name }: { name: string }) => {
  try {
    await sql`
			INSERT INTO games 
        (name)
      VALUES
        (${name})
		`;

    return {
      success: true,
      message: "Game created successfully",
      body: {},
    };
  } catch (error) {
    throw new Error("# createGame Error");
  }
};
