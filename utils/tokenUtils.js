import jwt from "jsonwebtoken";

export const createJWT = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET_ADMIN, {
    expiresIn: process.env.JWT_EXPIRY,
  });
  return token;
};

export const verifyJWT = (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET_ADMIN);
  return decoded;
};

export const createUserJWT = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET_USER, {
    expiresIn: process.env.JWT_EXPIRY,
  });
  return token;
};

export const verifyUserJWT = (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET_USER);
  return decoded;
};
