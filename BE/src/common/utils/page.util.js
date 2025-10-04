const pageUtil = async (model,{page, limit}) => {
    const pageNumber = parseInt(page) || 1;
    const pageSize = parseInt(limit) || 10;

    const skip = (pageNumber - 1) * pageSize;
    
    const models = await model.find().skip(skip).limit(pageSize);
    const totalModels = await model.countDocuments();
    const numberOfPages = Math.ceil(totalModels / pageSize);

    return {models, totalModels, numberOfPages, pageNumber, pageSize};
}

export default pageUtil;