import mongoose from "mongoose";

const USerSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        }
    },
    { timestamps: true },
)

export default mongoose.model('User', USerSchema);