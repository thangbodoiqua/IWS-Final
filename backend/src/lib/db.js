import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`connected to MongoDB ${conn.connection.host}`);        
    } catch (error) {
        console.log(`failed to connect to MongoDB: ${error.message}`);
        process.exit(1);
    }
}