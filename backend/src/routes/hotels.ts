import express, { Request, Response } from "express";
import Hotel from "../models/hotels";
import { HotelSearchResponse } from "../shared/types";

const router = express.Router();

// /api/hotels/search
router.get("/search", async (req: Request, res: Response) => {
	try {
		// how many hotels a page of the pagination will hold
		const pageSize = 10;

		// pageNumber is chosen by user, it we will be sent from client-side
		const pageNumber = parseInt(
			req.query.page ? req.query.page.toString() : "1"
		);

		// this variable holds how many hotels we are going to skip depending on the hotel chosen by the user
		const skip = (pageNumber - 1) * pageSize;

		// our query to get the hotels based on the page
		const hotels = await Hotel.find().skip(skip).limit(pageSize);

		const total = await Hotel.countDocuments();

		const response: HotelSearchResponse = {
			data: hotels,
			pagination: {
				total,
				page: pageNumber,
				pages: Math.ceil(total / pageSize),
			},
		};

		res.json(response);
	} catch (error) {
		console.log("error ", error);
		res.status(500).json({ message: "Something went wrong" });
	}
});


export default router