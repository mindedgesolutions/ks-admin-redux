import bcrypt from "bcrypt";

export const hashPassword = async (value) => {
  const salt = bcrypt.genSaltSync(10);
  const password = await bcrypt.hash(value, salt);
  return password;
};

export const checkPassword = async (value, hashedPassword) => {
  const check = await bcrypt.compare(value, hashedPassword);
  return check;
};
