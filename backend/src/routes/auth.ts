import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";
import { verifyToken } from "../middleware/auth";

const router = express.Router();

router.post(
	"/login",
	[
		check("email", "Email is required").isEmail(),
		check("password", "Password with 6 or more characters required").isLength({
			min: 6,
		}),
	],
	async (req: Request, res: Response) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			res.status(400).json({ message: errors.array() });
		}

		const { email, password } = req.body;

		try {
			const user = await User.findOne({ email });

			if (!user) {
				return res.status(400).json({ message: "Invalid Credentials" });
			}

			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch) {
				return res.status(400).json({ message: "Invalid Credentials" });
			}

			// Token And Cookie For Authentication

			const token = jwt.sign(
				{ userId: user.id },
				process.env.JWT_SECRET_KEY as string,
				{ expiresIn: "1d" }
			);

			res.cookie("auth_token", token, {
				httpOnly: true,
				secure: true,
				maxAge: 86400000,
				sameSite: "none",
			});

			res.status(200).json({ userId: user._id });
		} catch (error) {
			console.log(error);
			res.status(500).json({ message: "Something went wrong" });
		}
	}
);

router.get("/validate-token", verifyToken, (req: Request, res: Response) => {
	res.status(200).send({ userId: req.userId });
	// if token is valid through check from verifyToken middleware 200 ok will be sent
});

router.post("/logout", (req: Request, res: Response) => {
	res.cookie("auth_token", "", {
		expires: new Date(0),
	});
	res.send()
	// we created an empty token that expires at the time of creation
});

export default router;
