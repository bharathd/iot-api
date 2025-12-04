import express from "express";
import { ApiError } from "../models/api-error";
import { Container } from "typedi";
import PublicController from "../controllers/public.controller";

const publicRouter = express.Router();
const publicController = Container.get(PublicController)

publicRouter.get("/organization-config/:organizationId",
  async (req, res, next) => {
    try {
      const { organizationId } = req.params;
      const results = await publicController.getOrganizationConfigById(organizationId);
      res.send(results).status(200);
    } catch (e: any) {
      console.error(e?.message);
      next(new ApiError("Public.getOrganizationConfigById", e?.message));
    }
  });

export default publicRouter;