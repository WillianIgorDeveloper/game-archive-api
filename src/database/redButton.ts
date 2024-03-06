import { sql } from "./postgres";

const redButton = async () => {
  try {
    await sql`
      DROP TABLE IF EXISTS users;
		`;
    await sql`
      DROP TABLE IF EXISTS games;
		`;
    console.log("🔥  Tables deleted successfully!");
  } catch (error) {
    console.log(error);
    console.log("✖️  Error deleting tables!");
  }
};

redButton();
