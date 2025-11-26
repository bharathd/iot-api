import express from "express";
import { ApiError } from "../models/api-error";
import { Container } from "typedi";
import TestController from "../controllers/test.controller";
import { Validation } from "../middleware/validation";
import { GetTestDataWithPaging } from "../models/joi-schemas/getTestDataWithPaging";


const testRouter = express.Router();
const testController = Container.get(TestController)

testRouter.get("/",
  async (req, res, next) => {
    try {
      const { name } = req.query;
      const results = await testController.getTestResp(name as string);
      res.send(results).status(200);
    } catch (e: any) {
      console.error(e?.message);
      next(new ApiError("Test.test", e?.message));
    }
  });

testRouter.get("/pagination",
  Validation.run(GetTestDataWithPaging.schema(), "query"),
  async (req, res, next) => {
    try {
      const { page, pageSize, sortBy, sortDir } = req.query;
      const getData = await testController.getTestDataWithPaging(
        page as string,
        pageSize as string,
        sortBy as string,
        sortDir as string,
      );
      res.status(200).send(getData);
    } catch (e: any) {
      console.error(e?.message);
      next(new ApiError("Test.getTestDataWithPaging", e?.message));
    }
  }
);


export default testRouter;
