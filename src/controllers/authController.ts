import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../utils/database";
import dotenv from "dotenv";
import mysql from "mysql2/promise";

dotenv.config();

async function register(req: Request, res: Response): Promise<void> {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await pool.query("INSERT INTO users (username, password) VALUES (?, ?)", [
      username,
      hashedPassword,
    ]);
    res.status(201).json({ message: "Usuário registrado com sucesso" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

async function login(req: Request, res: Response): Promise<void> {
  const { username, password } = req.body;

  try {
    const [rows] = await pool.query<mysql.RowDataPacket[]>(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );
    const user = (rows as any)[0];

    if (!user) {
      res.status(401).json({ message: "Credenciais inválidas" });
      return;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      res.status(401).json({ message: "Credenciais inválidas" });
      return;
    }

    const token = jwt.sign(
      { username: user.username },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1h",
      }
    );
    res.json({ token });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export default {
  register,
  login,
};
