import { Request, Response } from "express";
import productModel from "../models/productModel";

async function getDashboardData(req: Request, res: Response): Promise<void> {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const filter = req.query.filter as string;

  try {
    const products = await productModel.getAllProducts(page, limit, filter);
    res.json(products);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export default {
  getDashboardData,
};
