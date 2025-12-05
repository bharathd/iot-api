import express from "express";
import { ApiError } from "../models/api-error";
import { Container } from "typedi";
import { Validation } from "../middleware/validation";
import AuthController from "../controllers/auth.controller";
import { AuthSchema } from "../models/joi-schemas/auth";
import { OrganizationSchema } from "../models/joi-schemas/organization";

const authRouter = express.Router();
const authController = Container.get(AuthController);

authRouter.post("/register",
  Validation.run(OrganizationSchema.create(), "body"),
  async (req, res, next) => {
    try {
      const organization = await authController.createOrganization(req.body);
      res.status(201).json(organization);
    } catch (e: any) {
      console.error(e?.message);
      next(new ApiError("Auth.createOrganization", e?.message));
    }
  }
);

authRouter.post("/login",
  Validation.run(AuthSchema.login(), "body"),
  async (req, res, next) => {
    try {
      const result = await authController.loginUser(req.body);
      res.status(200).send({
        message: 'Login successful',
        userDetails: result.userDetails,
        token: result.token
      });
    } catch (e: any) {
      console.error(e?.message);
      next(new ApiError("Auth.loginUser", e?.message));
    }
  }
);

export default authRouter;