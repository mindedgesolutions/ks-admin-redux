import pool from "../../../db.js";
import path from "path";

// Document upload functions start ------
export const uploadDocument = async (req, res) => {
  const { mobile, applicationId } = req.appUser;
  const { photo, aadhaar, passbook, selfCertificate } = req.files;

  const uploadPath = path.resolve() + "/uploads/" + photo.name;
  photo.mv(uploadPath);

  // aadhaar.mv(path.join(assets, aadhaar.name));
  // passbook.mv(path.join(assets, passbook.name));
  // selfCertificate.mv(path.join(assets, selfCertificate.name));

  res.status(StatusCodes.OK).json({ data: `OK` });
};
// Document upload functions end ------
