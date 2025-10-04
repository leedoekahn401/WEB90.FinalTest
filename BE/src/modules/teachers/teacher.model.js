import mongoose from "mongoose";

const degreeSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ["Bachelor", "Master", "Doctorate", "Associate", "Professor"],
        required: true,
    },
    school: {
        type: String,
        required: true,
    },
    major: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    isGraduated: {
        type: Boolean,
        default: true,
        required: true,
    },
});

const teacherSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        positions: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Position",
        }],
        isActive: {
            type: Boolean,
            default: true,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
        code: {
            type: String,
            required: true,
            unique: true,
        },
        startDate: {
            type: Date,
        },
            degrees: {
            type: [degreeSchema],
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Teacher = mongoose.model("Teacher", teacherSchema);

export default Teacher;
