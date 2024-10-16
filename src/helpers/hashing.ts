import bcrypt from "bcrypt";

const saltRounds = 10;

export async function hashPassword(password: String): Promise<String> {
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password as string, salt);
  return hashedPassword;
}

export async function comparePasswords(
  password: String,
  encryptedPassword: String
): Promise<boolean> {
  const matched = await bcrypt.compare(
    password as string,
    encryptedPassword as string
  );
  return matched;
}
