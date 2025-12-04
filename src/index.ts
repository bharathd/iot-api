import express, { Application } from "express";
import * as DotEnv from 'dotenv';
DotEnv.config();

import mainRouter from "./routes"
import dbConfig from "./config/db";
import CorsMiddlewareConfig from "./middleware/cors";
import SwaggerMiddlewareConfig from "./middleware/swagger";
import ErrorsMiddlewar from "./middleware/errors";
import { authMiddleware } from "./middleware/auth";
import authRouter from "./routes/auth.router";
import fasRouter from "./routes/fas.router";

const PORT = process.env.PORT || 8000;
const app: Application = express();

app.use(express.json());
app.use(express.static("public"));
CorsMiddlewareConfig.setup(app);
SwaggerMiddlewareConfig.setup(app);

app.route("/api/health-check").get(async (req, res) => {
  try {
    const result = await dbConfig.query('SELECT COUNT(*) as count;');
  return res.status(200).json({ message: "Healthy", count: result[0].count });  
  } catch (error) {
    return res.status(500).json({ message: "Unhealthy", error });
  }
});

app.use("/api/auth", authRouter)
app.use("/api/fas", fasRouter)
app.use("/api", authMiddleware, mainRouter)

//Call Error Middleware
ErrorsMiddlewar.setup(app)

dbConfig.initialize().then(() => {
    console.log("Data Source has been initialized! Started the server now ....");
    app.listen(PORT, () => console.log("Server is running on port", PORT));
}).catch((err: any) => {
    console.log("Server startup failed. Error during Data Source initialization: ", err);
});