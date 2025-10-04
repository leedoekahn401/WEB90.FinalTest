import express from "express";
import teacherRouter from "../modules/teachers/teacher.router.js";
import positionRouter from "../modules/postions/position.router.js";

const router = express.Router();

router.use("/teachers", teacherRouter);
router.use("/positions", positionRouter);

export default router;
