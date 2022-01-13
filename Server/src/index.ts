import express from "express";
import cors from "cors";
import {Routes} from "./Routes/Routes";

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

Routes(app);

app.listen(PORT,()=>{
    console.log("Listening on: http://localhost:" + PORT);
});