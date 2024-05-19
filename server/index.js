import express from "express";
import { Connection } from "./database/database.js";
import router from "./router/router.js";



const app = express(); //Initializing Epress App.

app.use(express.json());

Connection();


//App routes
app.use("/", router);


app.listen(3000,() => {
    console.log("Server Running");
});