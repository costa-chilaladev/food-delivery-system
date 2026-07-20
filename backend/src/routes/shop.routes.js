import express from "express";
import { getCategories, getProductsByCategoryId } from "../controllers/shop.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/categories", auth, getCategories);
router.post("/products", auth, getProductsByCategoryId)

export default router;