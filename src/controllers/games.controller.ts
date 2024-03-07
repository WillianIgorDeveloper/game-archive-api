import "dotenv/config";
import { sql } from "../database/postgres";

export const loadGames = async ({ userID, search }: { userID: string; search?: string }) => {
  try {
    const gamesResponse = await sql`
			SELECT
        *
      FROM games
      WHERE name ILIKE ${search ? `%${search}%` : "%%"}
      AND user_id = ${userID}
		`;

    return {
      success: true,
      message: "Games loaded successfully",
      body: {
        games: gamesResponse,
      },
    };
  } catch (error) {
    throw new Error(`# loadGames Error => ${error}`);
  }
};

export const createGame = async ({ userID, name }: { userID: string; name: string }) => {
  try {
    await sql`
			INSERT INTO games 
        (name, user_id)
      VALUES
        (${name}, ${userID})
		`;

    return {
      success: true,
      message: "Game created successfully",
      body: {},
    };
  } catch (error) {
    throw new Error(`# createGame Error => ${error}`);
  }
};
