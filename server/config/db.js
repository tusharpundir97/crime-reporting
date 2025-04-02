import mongoose from "mongoose";

const connectDb = async() => {
try {
      await mongoose.connect(process.env.MONGO_URI, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true
      })
      console.log("MongoDb connected successfully");
      
} catch (error) {
      console.error("MongoDb connection Error:", error);
      process.exit(1);
}
}
export default connectDb;