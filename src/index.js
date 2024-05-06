// require('dotenv').config({path: './env'});
import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config();

connectDB()





















//  this first method of adding connecting database

// import mongoose from "mongoose";
// import { DB_NAME } from './contants';
// import express from 'express';
// const app = express();

// (async() => {
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//         app.on('error',(error) => {
//             console.log("ERROR:",error);
//             throw error;
//         });
//         app.listen(process.env.PORT,()=> {
//             console.log(`App is running on the port ${process.env.PORT}`);
//         });
        
//     } catch (error) {
//         console.error("Error",error);
//         throw error
        
//     }
// })()