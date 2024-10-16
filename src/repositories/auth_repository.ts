import { comparePasswords, hashPassword } from "../helpers/hashing";
import { generateJWT } from "../helpers/jwt_helper";
import { User } from "../models/user";

export async function login(
  username: String,
  password: String
): Promise<String> {
  const user = await User.findOne({ username });
  if (!user) throw new Error("bad credentials");

  const isPasswordCorrect = await comparePasswords(password, user.password);
  if (!isPasswordCorrect) throw new Error("bad credentials");

  const token = generateJWT(user.id, user.username);
  return token;
}

export async function register(
  username: String,
  password: String,
  displayName: String
) {
  const hashedPassword = await hashPassword(password);
  const newUser = new User({ username, password: hashedPassword, displayName });
  const savedUser = await newUser.save();

  return savedUser;
}
