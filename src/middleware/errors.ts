import { Application, Request, Response, NextFunction } from "express";
import { ApiError } from "../models/api-error";

export default class ErrorsMiddlewar {
  public static setup(app: Application){
    //catch 404
    app.use((req, res, next) => {
        res.locals.status = 404;
        next(new Error("Not Found!"));
    });
    //Application errors
    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        if (err instanceof ApiError) {
            return res.status(400).json({
                success: false,
                errors: {
                    type: err.type,
                    message: err.message,
                }
            });
        }
        next(err);
    });

    // Generic errors
    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        res.status(res.locals.status || 500).json({
            success: false,
            errors: {
                type: "generic",
                message: err.message
            }
        });
    });

  }
}