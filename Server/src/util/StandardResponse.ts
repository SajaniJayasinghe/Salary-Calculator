import { Response } from "express";
import { StatusCodes } from "http-status-codes";

const StandardResponse = (
  res: Response,
  statusCode: StatusCodes,
  isSuccessful: boolean,
  message: string,
  data: any
) => {
  let timestamp: any = new Date().toISOString();

  return res.status(statusCode).json({
    isSuccessful,
    message,
    timestamp,
    data,
  });
};

export default StandardResponse;
