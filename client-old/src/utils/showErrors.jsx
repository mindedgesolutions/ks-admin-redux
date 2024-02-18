import { toast } from "react-toastify";

export const splitErrors = (text) => {
  const array = text?.split(",");
  array?.map((err) => {
    return toast.error(err);
  });
};
