import jwt from "jsonwebtoken";

const jwtSecret = "TOP_SECRET_JWT_KEY";

export function generateJWT(id: String, username: String): String {
  return jwt.sign({ id, username }, jwtSecret, { expiresIn: "7d" });
}

export function verifyJWT(token: String): TokenPayload {
  const decoded = jwt.verify(token as string, jwtSecret) as TokenPayload;
  return decoded;
}

export interface TokenPayload {
  id: String;
  username: String;
  iat: number;
  exp: number;
}
