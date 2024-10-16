import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import authRouter from "./routers/auth_router";
import companyRouter from "./routers/company_router";
import reportRouter from "./routers/report_router";
import { errorHandlingMiddleware, loggerMiddleware } from "./middlewares/middleware";

const app = express();
const PORT = 3000;

/* env config */
dotenv.config();

/* mongodb connection */
mongoose
  .connect("mongodb://localhost/reportingcompany")
  .then(() => console.log("connected to mongodb"))
  .catch((e) => console.log(`cannot connect mongodb: ${e}`));

/* parser */
app.use(bodyParser.json());

/* general error handler */
app.use(errorHandlingMiddleware);

/* logging */
app.use(loggerMiddleware);

/* routes */
app.use("/auth", authRouter);
app.use("/company", companyRouter);
app.use("/report", reportRouter);

app.listen(PORT, () => {
  console.log("running...");
});
