import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

/**
 * @description Class to run validation on given Joi schemas
 */
export class Validation {

    public static run(schema: Joi.Schema, property: "body" | "query" | "params") {
        
        return (req: Request, res: Response, next: NextFunction) => {
            const { error } = schema.validate(req[property], { abortEarly: false });
            if (error === null || error === undefined) {
                next();
            }
            else {
                const { details } = error as Joi.ValidationError;
                const message = details.map(i => i.message);
                res.status(422).json({ error: message });
            }
        }
    }
}