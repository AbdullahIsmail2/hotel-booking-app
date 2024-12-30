"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const hotels_1 = __importDefault(require("../models/hotels"));
const express_validator_1 = require("express-validator");
const router = express_1.default.Router();
// /api/hotels/search
router.get("/search", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const pageNumber = parseInt(req.query.page ? req.query.page.toString() : "1");
        // this variable holds how many hotels we are going to skip depending on the hotel chosen by the user
        const skip = (pageNumber - 1) * pageSize;
        // our query to get the hotels based on the page
        const hotels = yield hotels_1.default.find(query)
            .sort(sortOptions)
            .skip(skip)
            .limit(pageSize);
        const total = yield hotels_1.default.countDocuments();
        const response = {
            data: hotels,
            pagination: {
                total,
                page: pageNumber,
                pages: Math.ceil(total / pageSize),
            },
        };
        res.json(response);
    }
    catch (error) {
        console.log("error ", error);
        res.status(500).json({ message: "Something went wrong" });
    }
}));
router.get("/:id", [(0, express_validator_1.param)("id").notEmpty().withMessage("Hotel ID is required")], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const id = req.params.id.toString();
    try {
        const hotel = yield hotels_1.default.findById(id);
        res.json(hotel);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error fetching hotel" });
    }
}));
exports.default = router;
const constructSearchQuery = (queryParams) => {
    let constructedQuery = {};
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
            ? queryParams.stars.map((star) => parseInt(star))
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
