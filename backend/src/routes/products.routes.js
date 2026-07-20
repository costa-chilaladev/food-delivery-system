import express from "express";
import { getCategories } from "../controllers/products.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/categories", auth, getCategories);

export default router;