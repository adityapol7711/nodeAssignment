import { number, string } from "joi";
import mongoose from "mongoose";

const userModel = new mongoose.Schema({
    id: { type : number},
    username: { type: string},
    age: { type: number },
    hobbies: { type: []}
})

export default mongoose.models.user || mongoose.model('user', userModel);
