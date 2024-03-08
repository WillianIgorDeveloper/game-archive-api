import "dotenv/config";
import { sql } from "../database/postgres";

export const loadUser = async ({ userID }: { userID: string }) => {
  try {
    const [usersResponse] = await sql`
			SELECT
        id,
        tag
      FROM users
      WHERE id = ${userID}
		`;

    return {
      success: true,
      message: "User loaded successfully",
      body: {
        user: usersResponse,
      },
    };
  } catch (error) {
    throw new Error(`# loadUsers Error => ${error}`);
  }
};
