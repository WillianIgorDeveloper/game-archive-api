import "dotenv/config";
import { sql } from "../database/postgres";

export const loadGroups = async ({ userID }: { userID: string }) => {
  try {
    const groupsResponse = await sql`
			SELECT
        *
      FROM  users_groups
      WHERE user_id = ${userID}
		`;

    return {
      success: true,
      message: "Groups loaded successfully",
      body: {
        groups: groupsResponse,
      },
    };
  } catch (error) {
    throw new Error(`# loadGroups Error => ${error}`);
  }
};
