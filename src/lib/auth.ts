import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

type User = {
  id: string;
  email: string;
  username: string;
};

type Session = {
  user: User;
};

type JWTPayload = {
  sub: string;
  email: string;
  username: string;
  iat: number;
  exp: number;
};

export async function auth(): Promise<Session | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;

    return {
      user: {
        id: decoded.sub,
        email: decoded.email,
        username: decoded.username,
      },
    };
  } catch (error) {
    console.error("JWT verification error:", error);
    return null;
  }
}
