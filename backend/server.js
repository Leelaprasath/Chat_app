import express from "express";
import path from "path";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import AuthRoutes from "./routes/auth.routes.js";
import MessageRoutes from "./routes/message.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";
import UserRoutes from "./routes/user.routes.js";
import { app, server } from "./socket/socket.js";

dotenv.config();



app.use(express.json());
app.use(cookieParser());

const PORT=process.env.PORT

const __dirname = path.resolve()

app.use("/api/v1/auth",AuthRoutes);
app.use("/api/v1/messages",MessageRoutes);
app.use("/api/v1/users",UserRoutes);

app.use(express.static(path.join(__dirname,"/frontend/dist")))

app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"frontend","dist","index.html"))
})

server.listen(PORT,()=>{
    connectToMongoDB();
    console.log(`Server is listening to Port ${PORT}`)
})
