import { NextFunction, Request, Response } from "express";
import StandardResponse from "../../util/StandardResponse";
import { StatusCodes } from "http-status-codes";
import InternalServerError from "../InternalServerError";

const errorMiddleware = async (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let customError: any = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || "Something went wrong!",
    data: {},
  };
  console.log(err);

  // handle internal server errors
  if (
    err instanceof InternalServerError ||
    customError.statusCode === StatusCodes.INTERNAL_SERVER_ERROR
  ) {
    customError.message = "Something went wrong!";
  }

  // handle mongodb validation errors
  if (err.name === "ValidationError") {
    let validatorKeyValuePairs: any = {};

    Object.values(err.errors).forEach((error: any) => {
      validatorKeyValuePairs[error.properties.path] = error.properties.message;
    });

    customError.statusCode = StatusCodes.BAD_REQUEST;
    customError.message = "Validation Error";
    customError.data = validatorKeyValuePairs;
  }

  // handle mongo db cast errors
  if (err.name === "CastError") {
    customError.message = `No item found with ID "${err.value}"!`;
    customError.statusCode = StatusCodes.NOT_FOUND;
  }

  return StandardResponse(
    res,
    customError.statusCode,
    false,
    customError.message,
    customError.data
  );
};

export default errorMiddleware;
