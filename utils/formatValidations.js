export const isValidName = (value) => {
  const regex = /^[A-Za-z\s./]+$/;
  return regex.test(value);
};

export const isMobileNumber = (value) => {
  const regex = /^[6789]\d{9}$/;
  return regex.test(value);
};

export const isAadhaarNumber = (value) => {
  const regex = /^\d{4}\d{4}\d{4}$/;
  return regex.test(value);
};

export const isValidPin = (value) => {
  const regex = /^[1-9][0-9]{5}$/;
  return regex.test(value);
};

export const isValidPassport = (value) => {
  const regex = /^[A-Z]{1}[0-9]{7}$/;
  return regex.test(value);
};
