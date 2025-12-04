import express from "express";
import Container from "typedi";
import FasController from "../controllers/fas.controller";
import { ApiError } from "../models/api-error";
import { Validation } from "../middleware/validation";
import { FasSchema } from "../models/joi-schemas/fas";


const fasRouter = express.Router();
const fasController = Container.get(FasController)

fasRouter.post("/init", Validation.run(FasSchema.customerAuthInit(), "body"), async (req, res, next) => {
  try {
    const result = await fasController.customerAuthInit(req.body);
    res.status(200).send(result);
  } catch (e: any) {
    next(new ApiError("Fas.customerAuthInit", e?.message));
  }
});

fasRouter.post("/verify-otp", Validation.run(FasSchema.verifyCustomerOtp(), "body"), async (req, res, next) => {
  try {
    const result = await fasController.verifyCustomerOtp(req.body);
    res.status(200).send(result);
  } catch (e: any) {
    next(new ApiError("Fas.verifyCustomerOtp", e?.message));
  }
});

export default fasRouter;