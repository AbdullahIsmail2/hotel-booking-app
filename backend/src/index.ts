import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoutes from "./routes/users";

mongoose
	.connect(process.env.MONGODB_CONNECTION_STRING as string)
	.then(() => console.log("connected to db"))
	.catch(() => console.log("couldnt connect to mongo db"));

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes

app.get("/api/test", async (req: Request, res: Response) => {
	res.json({ message: "hello from express endpoint!" });
});

app.use("/api/user", userRoutes);

app.listen(7000, () => {
	console.log("server is running on localhost:7000");
});
