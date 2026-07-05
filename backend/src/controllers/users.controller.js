import db from "../config/database.js";
import bcrypt from "bcrypt";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, phoneNumber, whatsappPhoneNumber, province } = req.body;

    if (!name || !email || !password || !phoneNumber || !whatsappPhoneNumber || !province) {
      return res.status(400).json({
        onSuccess: false,
        message: "All fields are required",
      });
    }

    const [existingUser] = await db.query("SELECT id FROM users WHERE email=? OR phone_number = ? LIMIT 1", [email, phoneNumber])

    if (existingUser.length > 0) {
      return res.status(409).json({
        onSuccess: false,
        message: "User already exists with this email or phone number"
      })
    }

    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    const [result] = await db.query(
      "INSERT INTO users (name, email, password_hash, phone_number, whatsapp_phone_number, province) VALUES (?, ?, ?, ?, ?, ?)",
      [name, email, hashedPassword, phoneNumber, whatsappPhoneNumber, province]
    );

    return res.status(201).json({
      onSuccess: true,
      message: "User created successfully",
      userId: result.insertId,
    });

  } catch (error) {
    return res.status(500).json({
      onSuccess: false,
      message: "Error registering user",
      error: error.message,
    });
  }
};