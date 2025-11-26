import express from "express";
import testRouter from "./test.router";

const mainRouter = express.Router();

mainRouter.use("/test", testRouter);

export default mainRouter;