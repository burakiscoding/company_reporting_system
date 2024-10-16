import jwt from "jsonwebtoken";

export function generateJWT(id: String, username: String): String {  
  return jwt.sign({ id, username }, process.env.JWT_SECRET!, { expiresIn: "7d" });
}

export function verifyJWT(token: String): TokenPayload {
  const decoded = jwt.verify(token as string, process.env.JWT_SECRET!) as TokenPayload;
  return decoded;
}

export interface TokenPayload {
  id: String;
  username: String;
  iat: number;
  exp: number;
}
