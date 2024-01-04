import mongoose from "mongoose";

const userModel = new mongoose.Schema({
    id: { type : Number},
    username: { type: String},
    age: { type: Number },
    hobbies: { type: []}
})

export default mongoose.models.User || mongoose.model('User', userModel);
