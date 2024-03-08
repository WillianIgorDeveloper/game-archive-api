import { sql } from "./postgres";

const redButton = async () => {
  try {
    await sql`
      DROP TABLE IF EXISTS status;
    `;

    await sql`
      DROP TABLE IF EXISTS scores;
    `;

    await sql`
      DROP TABLE IF EXISTS games;
    `;

    await sql`
      DROP TABLE IF EXISTS users;
		`;

    console.log("🟢 Tables deleted successfully!");
  } catch (error) {
    console.log(`🔴 Error deleting tables! => ${error}`);
  }
};

redButton();
