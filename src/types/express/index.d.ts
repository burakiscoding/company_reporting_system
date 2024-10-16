import { TokenPayload } from "../../helpers/jwt_helper";

declare module "express-serve-static-core" {
  interface Request {
    decodedToken?: TokenPayload;
  }
}
