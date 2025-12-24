import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.route.js';
import noteRouter from './routes/note.route.js';


dotenv.config();



const app = express();

//to make input in jason
app.use(express.json());
app.use(cookieParser())

// Configure CORS: reflect the request origin if CORS_ORIGIN is not set,
// enable credentials so cookies / auth headers work when needed,
// and handle preflight requests.
const corsOptions = {
  origin: process.env.CORS_ORIGIN || true,
  credentials: true,
  methods: ['GET','HEAD','PUT','PATCH','POST','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization']
}

app.use(cors(corsOptions)); // to allow cross origin requests
app.options('/*', cors(corsOptions)); // enable preflight handling
 


let isConnected = false;
const connectDB = async () => {
  if (isConnected) {
    console.log("MongoDB is already connected.");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log("MongoDB connected successfully.");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

connectDB();

app.use('/api/auth',authRouter) //app.use(path, router)
app.use('/api/note',noteRouter)

//error handler middleware
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
});

export default app;
