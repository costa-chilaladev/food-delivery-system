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

export const getProductsByCategoryId = async (req, res) => {
  try {
    const { categoryId } = req.body  

    if (!categoryId) {
      return res.status(400).json({
        onSuccess: false,
        message: "All fields are required",
      });
    }

    const [products] = await db.query("SELECT * FROM products WHERE category_id=?", [categoryId])

    return res.status(200).json({
      onSuccess: true,
      data: products
    })
  }

  catch (error) {
    return res.status(500).json({
      onSuccess: false,
      message: `Internal Server Error: ${error}`,
    })
  }
}
