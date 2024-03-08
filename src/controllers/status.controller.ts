import "dotenv/config";
import { sql } from "../database/postgres";

export const loadStatus = async ({ userID }: { userID: string }) => {
  try {
    const statusResponse = await sql`
			SELECT
        *
      FROM status
      WHERE user_id = ${userID}
		`;

    return {
      success: true,
      message: "Status loaded successfully",
      body: {
        status: statusResponse,
      },
    };
  } catch (error) {
    throw new Error(`# loadStatus Error => ${error}`);
  }
};
