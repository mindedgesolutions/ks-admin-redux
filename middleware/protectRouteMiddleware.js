import { UnauthenticatedError } from "../errors/customErrors.js";
import { verifyJWT, verifyUserJWT } from "../utils/tokenUtils.js";

export const protectRoute = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) throw new UnauthenticatedError("Login required");
  try {
    const { userId, role } = verifyJWT(token);
    req.user = { userId, role };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Login required");
  }
};

export const protectUserRoute = (req, res, next) => {
  const { usertoken } = req.cookies;
  if (!usertoken) throw new UnauthenticatedError("Login required");
  try {
    const { mobile, applicationId } = verifyUserJWT(usertoken);
    req.appUser = { mobile, applicationId };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Login required");
  }
};
