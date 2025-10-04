import { Router } from "express";
import { createTeacher, getTeachers} from "./teacher.controller.js";

const teacherRouter = Router();

teacherRouter.post("/",createTeacher);
teacherRouter.get("/",getTeachers);

export default teacherRouter;
