import date from "date-and-time";

export const generateRandomNumber = () => {
  const min = 100000;
  const max = 999999;
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber;
};

export const applicationStatus = (value) => {
  let label;
  switch (value) {
    case "P":
      label = "Provisional application";
      break;
    case "A":
      label = "Pending for approval";
      break;
    case "BA":
      label = "Pending for approval";
      break;
    case "C":
      label = "Approved";
      break;
    case "B":
      label = "Back for correction";
      break;
    case "BP":
      label = "Back for correction";
      break;
    case "I":
      label = "Initiated";
      break;
    case "BI":
      label = "Re-initiated";
      break;
    case "R":
      label = "Rejected";
      break;
  }
  return label;
};

export const dateFormat = (value) => {
  const formatted = new Date(value);
  return date.format(formatted, "DD-MM-YYYY");
};

export const dateFormatFancy = (value) => {
  const formatted = new Date(value);
  return date.format(formatted, "ddd, MMM DD YYYY");
};

export const datePickerFormat = (value) => {
  const formatted = new Date(value);
  return date.format(formatted, "YYYY-MM-DD");
};

export const genderFormat = (value) => {
  let label;
  switch (value) {
    case "M":
      label = "Male";
      break;
    case "F":
      label = "Female";
      break;
    case "O":
      label = "Other";
      break;
  }
  return label;
};

export const documentFormat = (value) => {
  let label;
  switch (value) {
    case "selfcertificate":
      label = "Self certificate";
      break;
    case "passbook":
      label = "Passbook";
      break;
    case "aadhar":
      label = "Aadhaar no.";
      break;
    case "photo":
      label = "Applicant's photo";
      break;
  }
  return label;
};

export const getFileExtension = (fileName) => {
  return fileName.split(".").pop();
};
