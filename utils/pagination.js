import * as dotenv from "dotenv";
dotenv.config();

export const paginationLogic = (page, limit) => {
  const pageLimit = limit || process.env.ITEMS_PER_PAGE;
  const pageNo = Number(page) || 1;
  const offset = (pageNo - 1) * Number(pageLimit);

  return { pageLimit, offset, pageNo };
};
