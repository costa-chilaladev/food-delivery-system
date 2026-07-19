import db from "../config/database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        onSuccess: false,
        message: "All fields are required",
      });
    }

    const [users] = await db.query(
      "SELECT id, name, role, password_hash FROM users WHERE email=?",
      [email],
    );

    if (users.length === 0) {
      return res.status(401).json({
        onSuccess: false,
        message: "User does not exist",
      });
    }

    const user = users[0];

    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(401).json({
        onSuccess: false,
        message: "invalid Email or Password",
      });
    }

    const token = jwt.sign(
        {
            id: user.id,
            role: user.role,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d"
        }
    );

    return res.status(200).json({
      onSuccess: true,
      token: token,
      userName: user.name,
      message: "user logged successfully",
    });
  } catch (error) {
    return res.status(500).json({
      onSuccess: false,
      message: `login error`,
      error: error.message,
    });
  }
};

export const registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phoneNumber,
      whatsappPhoneNumber,
      delivery_zone,
    } = req.body;

    if (
      !name ||
      !email ||
      !password ||
      !phoneNumber ||
      !whatsappPhoneNumber ||
      !delivery_zone
    ) {
      return res.status(400).json({
        onSuccess: false,
        message: "All fields are required",
      });
    }

    const [existingUser] = await db.query(
      "SELECT id FROM users WHERE email=? OR phone_number = ? LIMIT 1",
      [email, phoneNumber],
    );

    if (existingUser.length > 0) {
      return res.status(409).json({
        onSuccess: false,
        message: "User already exists with this email or phone number",
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const [result] = await db.query(
      "INSERT INTO users (name, email, password_hash, phone_number, whatsapp_phone_number, delivery_zone) VALUES (?, ?, ?, ?, ?, ?)",
      [name, email, hashedPassword, phoneNumber, whatsappPhoneNumber, delivery_zone],
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

export const getDeliveryZones = async (req, res) => {
  const [cities] = await db.query("SELECT * FROM delivery_zones")

  return res.status(200).json({
    onSucces: true,
    data: cities
  })
}

export const getUserInfo = async (req, res) => {
  return res.status(200).json({
    onSuccess: true,
    user: req.user
  })
}