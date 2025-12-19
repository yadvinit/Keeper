import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.route.js';
import noteRouter from './routes/note.route.js';


dotenv.config();
mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("MongoDB connected");
})
.catch((err)=>{
    console.log(err)
})

const app = express();

//to make input in jason
app.use(express.json());
app.use(cookieParser())
app.use(cors({origin:["http://localhost:5173"],credentials:true})); //to allow cross origin requests
 

app.use('/api/auth',authRouter) //app.use(path, router)
app.use('/api/note',noteRouter)

//error handler middleware
app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({
        status: "error",
        statusCode,
        message
    })
    next();
}
)
app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})