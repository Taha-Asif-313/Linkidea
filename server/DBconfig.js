import mongoose from "mongoose";

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

const connectDB = async ()=>{
    try {
       await mongoose.connect(process.env.MONGO_URI,clientOptions)
         .then(() => console.log('Connected!'))
         .catch(()=> console.log("not connected!"))
       } catch (error) {
         console.log(error)
       }
       
}

export default connectDB
