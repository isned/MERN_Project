import  express from "express";
import mongoose from "mongoose";
import  config from "config";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import tourRoute from './routes/tours.js';
import userRoute from './routes/users.js';
import authRoute from './routes/auth.js'; 
import reviewRoute from './routes/reviews.js';
import bookingRoute from './routes/booking.js';



dotenv.config()
const app = express()
const corsOptions = {
  origin:true,
  credentials:true
}

//Database connection
const mongo_url = config.get("mongo_url");
mongoose.set('strictQuery', true);

mongoose.connect(mongo_url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Bien connecté au MongoDB"))
  .catch((err) => console.log(err));


//middlware
app.use(express.json());  
app.use(cors(corsOptions));  // will be useful when you'll connect the react app with your Backend
//app.use(cookieParser); => causing the  problem
app.use("/api/v1/auth",authRoute);
app.use("/api/v1/tours",tourRoute);
app.use("/api/v1/users",userRoute);
app.use("/api/v1/review",reviewRoute);
app.use("/api/v1/booking",bookingRoute);


 
const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`bien connecté au serveur via port ${port}`);
});
