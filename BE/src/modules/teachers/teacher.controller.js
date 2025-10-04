import HandleAsync from "../../common/utils/handle-async.util.js";
import { getTeachersService, createTeacherService } from "./teacher.service.js";
import { createResponse } from "../../common/configs/response.config.js";

export const getTeachers = HandleAsync(async (req,res)=>{
    const {page, limit} = req.query;
    const teachers = await getTeachersService({page, limit});
    return createResponse(res,200,"Success",teachers);
});

export const createTeacher = HandleAsync(async (req,res)=>{
    const teachers = await createTeacherService(req.body);
    return createResponse(res,200,"Success",teachers);
});

export const getUsers = HandleAsync(async (req,res)=>{
    const users = await getUsersService();
    return createResponse(res,200,"Success",users);
});