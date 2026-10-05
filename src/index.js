import dotenv from "dotenv";
import app from "./app.js";
import { connectDB } from "./db/db_connection.js";

dotenv.config({
    path: "./.env",
});
const port = process.env.PORT ?? 8000;

connectDB().then(()=>{
    app.listen(port, () => {
        console.log("server running on port :" + port);

    })
}).catch((error)=>{
    console.log("MongoDB Connection Error");

});


console.log("Hey Backend project");
