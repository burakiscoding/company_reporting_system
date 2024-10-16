import { Request, Response, NextFunction } from "express-serve-static-core";
import { verifyJWT } from "../helpers/jwt_helper";

export async function authenticationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader?.split(" ")[1];

  if (!token) return res.sendStatus(401);

  try {
    const decoded = verifyJWT(token);
    req.decodedToken = decoded;
    next();
  } catch (error) {
    return res.sendStatus(401);
  }
}

export async function loggerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(`${req.method} request made to ${req.path}`);
  next();
}

export async function errorHandlingMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
}
