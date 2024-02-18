import { nanoid } from "nanoid";

// Add application access to local storage starts ------
export const addAccessToLocalStorage = (access) => {
  localStorage.setItem("access", JSON.stringify(access));
};

export const removeAccessFromLocalStorage = () => {
  localStorage.removeItem("access");
};

export const getAccessFromLocalStorage = () => {
  const result = localStorage.getItem("access");
  const access = result ? JSON.parse(result) : null;
  return access;
};
// Add application access to local storage ends ------
