import db from "../config/database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getCategories = async (req, res) => {
  try {
    const [categories] = await db.query(
      "SELECT id, name, img_url FROM categories"
    );

    return res.status(201).json({
      onSuccess: true,
      data: categories,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      onSuccess: false,
      message: "failed to fetch categories",
    });
  }
};
