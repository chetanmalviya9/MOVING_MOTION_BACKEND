import express from "express";
import mongoose from 'mongoose';
import bodyParser from "body-parser";
import userRouter from './routes/user.route.js'
import bookingRouter from './routes/bookings.route.js'
import driverRouter from './routes/driver.route.js'
import cors from "cors";
import path from 'path';
const app = express();

app.use(express.static(path.join(process.cwd(), "public")));
app.use(express.static('images'));

mongoose.set('strictQuery', true);
mongoose.connect("mongodb+srv://chetanmalviya9:Chetan%40123@cluster0.uwyx1lm.mongodb.net/MovingMotion?retryWrites=true&w=majority", err => {
    if (err)
        console.log(err);
    else {
        app.use(cors());
        console.log("mongo-db connected");
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use("/user", userRouter);
        app.use("/driver", driverRouter);
        app.use("/booking",bookingRouter);
        app.listen(3000, () => {
            console.log("Server started at port 3000 http://localhost:3000/");
        })
    }
});