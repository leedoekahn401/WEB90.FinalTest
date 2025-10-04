import HandleAsync from "../../common/utils/handle-async.util.js";
import { createPositionService, getPositionsService } from "./postion.service.js";
import { createResponse } from "../../common/configs/response.config.js";


export const createPosition = HandleAsync(async (req,res)=>{
    const positions = await createPositionService(req.body);
    return createResponse(res,200,"Success",positions);
});

export const getPositions = HandleAsync(async (req,res)=>{
    const {page, limit} = req.query;
    const positions = await getPositionsService({page, limit});
    return createResponse(res,200,"Success",positions);
});
