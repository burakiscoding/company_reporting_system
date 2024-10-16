import { Request, Response } from "express-serve-static-core";
import { LoginDto, RegisterDto } from "../dtos/auth_dtos";
import { login, register } from "../repositories/auth_repository";

export async function loginHandler(
  req: Request<{}, {}, LoginDto>,
  res: Response
) {
  const { username, password } = req.body;
  try {
    const token = await login(username, password);
    return res.status(200).send({ token });
  } catch (error) {
    return res.sendStatus(400);
  }
}

export async function registerHandler(
  req: Request<{}, {}, RegisterDto>,
  res: Response
) {
  const { username, password, displayName } = req.body;
  try {
    await register(username, password, displayName);
    return res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(400);
  }
}
