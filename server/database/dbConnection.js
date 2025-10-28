import mongoose from "mongoose";

export const dbConnection = ()=>{
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "Restaurant"
    }).then(()=>{
        console.log("Connected to database successfully.");
    }).catch(err=>{
        console.log(`Some Error Occured while connection to database ${err}`);
    });
}