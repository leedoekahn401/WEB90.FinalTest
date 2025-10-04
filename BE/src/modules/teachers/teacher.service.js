import Teacher from "./teacher.model.js";
import User from "../users/user.model.js";
import Position from "../postions/position.model.js";
import randomCode from "../../common/utils/rand-code.util.js";
import pageUtil from "../../common/utils/page.util.js";

export const getTeachersService = async ({ page, limit }) => {
    const pageNumber = parseInt(page, 10) || 1;
    const pageSize = parseInt(limit, 10) || 10;
    const skip = (pageNumber - 1) * pageSize;

    const results = await Teacher.aggregate([
        {
            $addFields: {
                "convertedUserId": { "$toObjectId": "$userId" }
            }
        },
        {
            $lookup: {
              from: 'user1',
              localField: 'userId',
              foreignField: '_id',
              as: 'user'
            }
          },
          
        {
            $unwind: {
                path: '$user',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $lookup: {
                from: 'positions',
                localField: 'positions',
                foreignField: '_id',
                as: 'positions'
            }
        },
        {
            $facet: {
                metadata: [{ $count: 'totalModels' }],
                data: [
                    { $skip: skip },
                    { $limit: pageSize },
                    {
                        $project: {
                            _id: 1,
                            code: 1,
                            startDate: 1,
                            degrees: 1,
                            isActive: 1,
                            name: { $ifNull: ['$user.name', 'N/A'] },
                            address: { $ifNull: ['$user.address', 'N/A'] },
                            email: { $ifNull: ['$user.email', 'N/A'] },
                            phoneNumber: { $ifNull: ['$user.phoneNumber', 'N/A'] },
                            dob: { $ifNull: ['$user.dob', null] },
                            positions: '$positions'
                        }
                    }
                ]
            }
        }
    ]);

    const teachers = results[0].data;
    const totalModels = results[0].metadata[0] ? results[0].metadata[0].totalModels : 0;
    const numberOfPages = Math.ceil(totalModels / pageSize);

    const data = {
        teachers,
        totalModels,
        numberOfPages,
        pageNumber,
        pageSize,
    };

    return data;
};
export const createTeacherService = async (data) => {
    const {userInfo,teacherInfo,positionInfo} = data;
    const position = await Position.findOne({name: positionInfo.name});
    let randCode = randomCode(10);
    while(await Teacher.findOne({code: randCode})){
        randCode = randomCode(10);
    }
    const user = await User.create({...userInfo,role: "TEACHER"});
    const teacher = await Teacher.create({...teacherInfo,code: randCode,userId: user._id,positions: [position._id]});

    return teacher;
}
