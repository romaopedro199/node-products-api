import pool from "../utils/database";
import { Product } from "../types/product";
import mysql from "mysql2/promise";

async function getAllProducts(
  page: number,
  limit: number,
  filter?: string
): Promise<Product[]> {
  const offset = (page - 1) * limit;
  let query = "SELECT * FROM products";
  let values: any[] = [];

  if (filter) {
    query += " WHERE name LIKE ?";
    values = [`%${filter}%`];
  }

  query += " LIMIT ? OFFSET ?";
  values.push(limit, offset);

  const [rows] = await pool.query<mysql.RowDataPacket[]>(query, values);
  return rows as Product[];
}

async function getProductById(id: number): Promise<Product | undefined> {
  const [rows] = await pool.query<mysql.RowDataPacket[]>(
    "SELECT * FROM products WHERE id = ?",
    [id]
  );
  return (rows as Product[])[0];
}

async function createProduct(product: Product): Promise<number> {
  const { name, description, price } = product;
  const [result] = await pool.query<mysql.OkPacket>(
    "INSERT INTO products (name, description, price) VALUES (?, ?, ?)",
    [name, description, price]
  );
  return result.insertId;
}

async function updateProduct(id: number, product: Product): Promise<void> {
  const { name, description, price } = product;
  await pool.query(
    "UPDATE products SET name = ?, description = ?, price = ? WHERE id = ?",
    [name, description, price, id]
  );
}

async function deleteProduct(id: number): Promise<void> {
  await pool.query("DELETE FROM products WHERE id = ?", [id]);
}

export default {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
