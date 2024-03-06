import { sql } from "../database/postgres";
import "dotenv/config";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";

export const verifyToken = async ({ token }: { token: string }) => {
  try {
    jwt.verify(token, `${process.env.JWT_KEY}`);
    return {
      success: true,
      message: "Valid token",
      data: {
        isTokenValid: true,
      },
    };
  } catch (error) {
    throw new Error("VerifyToken Error");
  }
};

export const signUp = async ({ tag, password }: { tag: string; password: string }) => {
  try {
    const [isTagAlreadyRegistered] = await sql`
			SELECT id FROM users WHERE tag = ${tag}
		`;

    if (isTagAlreadyRegistered) {
      return {
        success: false,
        message: "Tag already registered",
        body: {
          token: null,
        },
      };
    }

    const hash = bcrypt.hashSync(password, Number(process.env.SALT));

    const newUserID = await sql`
			INSERT INTO users (tag, password) 
			VALUES (${tag}, ${hash}) 
			RETURNING id
    `;

    const token = jwt.sign({ id: newUserID }, `${process.env.JWT_KEY}`, {
      expiresIn: "30d",
    });

    return {
      success: true,
      message: "User created successfully",
      body: {
        token: token,
      },
    };
  } catch (error) {
    throw new Error("SignUp Error");
  }
};

export const signIn = async ({ tag, password }: { tag: string; password: string }) => {
  try {
    const [userData] = await sql`
			SELECT * FROM users WHERE tag = ${tag}
		`;

    if (!userData) {
      return {
        success: false,
        message: "Tag or Password is invalid",
        body: {
          token: null,
        },
      };
    }

    const { id, password: hash } = userData;

    const isValid = bcrypt.compareSync(password, hash);

    if (!isValid)
      return {
        success: false,
        message: "Email or password invalid",
        body: {
          token: null,
        },
      };

    const token = jwt.sign({ id }, `${process.env.JWT_KEY}`, { expiresIn: "30d" });

    return {
      success: true,
      message: "User logged successfully",
      body: {
        token,
      },
    };
  } catch (error) {
    throw new Error("SignIn Error");
  }
};
