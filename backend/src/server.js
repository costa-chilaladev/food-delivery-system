import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/users.routes.js";
import productRoutes from "./routes/shop.routes.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/shop", productRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});