import mongoose from "mongoose";

export const Connection = async() => {
    try{
        const URL = "mongodb://localhost/menu_management"

    await mongoose.connect(URL);

    console.log("Database Connected");

    }catch(error){
        console.log(error.message);
    }
}