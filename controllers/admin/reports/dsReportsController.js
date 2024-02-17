import * as dotenv from "dotenv";
dotenv.config();
import pool from "../../../db.js";
import { StatusCodes } from "http-status-codes";
import { formatEndDate, formatStartDate } from "../../../utils/functions.js";
import {
  appAllDist,
  appBlock,
  appDist,
  appSubdiv,
  appWard,
} from "../../../models/admin/dsAppStatusModel.js";
import {
  migAllDist,
  migBlock,
  migDist,
  migSubdiv,
  migWard,
} from "../../../models/admin/dsMigStatusModel.js";

// Duare Sarkar (DS) Application report starts ---
export const dsApplicationStatusReport = async (req, res) => {
  const { dist, subdiv, block, ward, startDate, endDate } = req.query;

  const start = formatStartDate(startDate);
  const end = formatEndDate(endDate);
  const values = [1, start, end, "P", "A", "C", "R", 1];

  if (dist === process.env.ALL_DISTRICTS_CODE) {
    const text = appAllDist();
    const data = await pool.query(text, values);
    res.status(StatusCodes.OK).json({ data });
  } else {
    let data;
    if (dist && !subdiv) {
      const text = appDist(dist);
      data = await pool.query(text, values);
    }
    if (subdiv && !block) {
      const text = appSubdiv(subdiv);
      data = await pool.query(text, values);
    }
    if (block && !ward) {
      const text = appBlock(block);
      data = await pool.query(text, values);
    }
    if (ward) {
      const text = appWard(ward);
      data = await pool.query(text, values);
    }
    res.status(StatusCodes.OK).json({ data });
  }
};
// Duare Sarkar (DS) Application report ends ---

// Duare Sarkar (DS) Migration report starts ---
export const dsMigrationStatusReport = async (req, res) => {
  const { dist, subdiv, block, ward, startDate } = req.query;

  const start = formatStartDate(startDate);
  const values = [1, start];

  if (dist === process.env.ALL_DISTRICTS_CODE) {
    const text = migAllDist();
    const data = await pool.query(text, values);
    res.status(StatusCodes.OK).json({ data });
  } else {
    let data;
    if (dist && !subdiv) {
      const text = migDist(dist);
      data = await pool.query(text, values);
    }
    if (subdiv && !block) {
      const text = migSubdiv(subdiv);
      data = await pool.query(text, values);
    }
    if (block && !ward) {
      const text = migBlock(block);
      data = await pool.query(text, values);
    }
    if (ward) {
      const text = migWard(ward);
      data = await pool.query(text, values);
    }
    res.status(StatusCodes.OK).json({ data });
  }
};
// Duare Sarkar (DS) Migration report ends ---
