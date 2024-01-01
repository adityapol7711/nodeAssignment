import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";


export default async function connectMongoDB() {
    const memoryServer = await MongoMemoryServer.create();
    const mongoUri = memoryServer.getUri();

    await mongoose.connect(mongoUri,  {
        dbName: 'assignment'
    })
}

