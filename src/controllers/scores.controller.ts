import "dotenv/config";
import { sql } from "../database/postgres";

export const loadScores = async ({ userID }: { userID: string }) => {
  try {
    const scoresResponse = await sql`
			SELECT
        *
      FROM scores
      WHERE user_id = ${userID}
		`;

    return {
      success: true,
      message: "Scores loaded successfully",
      body: {
        scores: scoresResponse,
      },
    };
  } catch (error) {
    throw new Error(`# loadScores Error => ${error}`);
  }
};
