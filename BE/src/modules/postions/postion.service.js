import Position from "./position.model.js"; 

import pageUtil from "../../common/utils/page.util.js";


export const createPositionService = async (data) => {
    const position = await Position.create(data);
    return position;
}

export const getPositionsService = async ({page, limit}) => {
    const positions = await pageUtil(Position,{page, limit});
    const data = {
        positions: positions.models,
        totalModels: positions.totalModels,
        numberOfPages: positions.numberOfPages,
        pageNumber: positions.pageNumber,
        pageSize: positions.pageSize,
    }
    return data;
}