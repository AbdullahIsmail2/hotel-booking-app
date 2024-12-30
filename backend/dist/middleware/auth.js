"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    const token = req.cookies['auth_token'];
    // req.cookies is achieved using cookie-parser package
    if (!token) {
        return res.status(401).json({ message: 'unauthorised' });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY);
        req.userId = decoded.userId;
        next();
    }
    catch (_a) {
        return res.status(401).json({ message: 'unauthorised' });
    }
};
exports.verifyToken = verifyToken;
