import express from "express";
import { login, registerUser, getUserInfo, getDeliveryZones } from "../controllers/users.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", login);
router.get("/delivery_zones", getDeliveryZones)
router.get("/me", auth, getUserInfo);


export default router;