import express, { Request, Response } from "express";
import Hotel from "../models/hotels";
import { HotelSearchResponse } from "../shared/types";
import { param, validationResult } from "express-validator";

const router = express.Router();


// /api/hotels/search
router.get("/search", async (req: Request, res: Response) => {
	try {
		const query = constructSearchQuery(req.query);

		let sortOptions = {};

		switch (req.query.sortOption) {
			case "starRating":
				sortOptions = { starRating: -1 };
				break;
			case "pricePerNightAsc":
				sortOptions = { pricePerNight: 1 };
				break;
			case "pricePerNightDesc":
				sortOptions = { pricePerNight: -1 };
				break;
		}

		// how many hotels a page of the pagination will hold
		const pageSize = 5;

		// pageNumber is chosen by user, it we will be sent from client-side
		const pageNumber = parseInt(
			req.query.page ? req.query.page.toString() : "1"
		);

		// this variable holds how many hotels we are going to skip depending on the hotel chosen by the user
		const skip = (pageNumber - 1) * pageSize;

		// our query to get the hotels based on the page
		const hotels = await Hotel.find(query)
			.sort(sortOptions)
			.skip(skip)
			.limit(pageSize);

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

router.get(
	"/:id",
	[param("id").notEmpty().withMessage("Hotel ID is required")],
	async (req: Request, res: Response) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const id = req.params.id.toString();

		try {
			const hotel = await Hotel.findById(id);
			res.json(hotel);
		} catch (error) {
			console.log(error);
			res.status(500).json({ message: "Error fetching hotel" });
		}
	}
);

export default router;

const constructSearchQuery = (queryParams: any) => {
	let constructedQuery: any = {};

	// Search Input Filters

	if (queryParams.destination) {
		constructedQuery.$or = [
			{ city: new RegExp(queryParams.destination, "i") },
			{ country: new RegExp(queryParams.destination, "i") },
		];
	}

	if (queryParams.adultCount) {
		constructedQuery.adultCount = {
			$gte: parseInt(queryParams.adultCount),
		};
	}

	if (queryParams.childCount) {
		constructedQuery.childCount = {
			$gte: parseInt(queryParams.childCount),
		};
	}

	// Checkbox Filters

	if (queryParams.facilities) {
		constructedQuery.facilities = {
			$all: Array.isArray(queryParams.facilities)
				? queryParams.facilities
				: [queryParams.facilities],
		};
	}

	if (queryParams.types) {
		constructedQuery.type = {
			$in: Array.isArray(queryParams.types)
				? queryParams.types
				: [queryParams.types],
		};
	}

	if (queryParams.stars) {
		const starRatings = Array.isArray(queryParams.stars)
			? queryParams.stars.map((star: string) => parseInt(star))
			: parseInt(queryParams.stars.toString());

		constructedQuery.starRating = {
			$in: starRatings,
		};
	}

	if (queryParams.maxPrice) {
		constructedQuery.pricePerNight = {
			$lte: parseInt(constructedQuery.maxPrice).toString(),
		};
	}

	return constructedQuery;
};
