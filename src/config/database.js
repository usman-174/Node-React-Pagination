import {config} from "dotenv"
if(process.env.NODE_ENV !== "production"){
    config()
}

import mongoose from "mongoose"
const URI = process.env.URI


const connectDB =async()=>{
    mongoose.connect(URI).then(()=>{
        console.log("Connected to DATABASE");
    })

}

export {connectDB}