// require('dotenv').config({path: './env'});
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config();

connectDB()
.then( () => {
    app.on('error', (error) => {
        console.log("ERRR",error);
        throw error;
    })
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("Mongo db connection is fa;iled",err)
})






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