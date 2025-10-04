import { Router } from "express";
import { createPosition, getPositions } from "./postion.controller.js";
import jsonValidator from "../../common/middleware/json-valid.middleware.js";
import positionSchema from "./postion.schema.js";

const positionRouter = Router();

positionRouter.post("/",createPosition);
positionRouter.get("/",getPositions);

export default positionRouter;