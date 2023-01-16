import mongoose from "mongoose";

const CharacterSchema = new mongoose.Schema({
    username: { type: String },
    name: { type: String, required: true },
    race: { type: String, required: true },
    level: { type: Number, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

export default mongoose.model('Character', CharacterSchema);