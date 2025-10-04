import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            sparse: true,
        },
        phoneNumber: {
            type: String,
            unique: true,
            sparse: true,
        },
        address: {
            type: String,
        },
        identity: {
            type: String,
        },
        dob: {
            type: Date,
        },
        role: {
            type: String,
            enum: ["ADMIN", "TEACHER", "STUDENT"],
            required: true,
        },
        isDeleted: {
            type: Boolean,
            default: false
        },
    },
    { timestamps: true }
);

userSchema.index({ email: 1 }, { unique: true, sparse: true });

userSchema.index({ phoneNumber: 1 }, { unique: true, sparse: true });


const User = mongoose.model("User1", userSchema);

export default User;

