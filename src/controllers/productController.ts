import { Request, Response } from "express";
import productModel from "../models/productModel";

async function getAllProducts(req: Request, res: Response): Promise<void> {
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

async function getProductById(req: Request, res: Response): Promise<void> {
  try {
    const product = await productModel.getProductById(parseInt(req.params.id));
    if (!product) {
      res.status(404).json({ message: "Produto não encontrado" });
      return;
    }
    res.json(product);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

async function createProduct(req: Request, res: Response): Promise<void> {
  try {
    const productId = await productModel.createProduct(req.body);
    res.status(201).json({ id: productId, ...req.body });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

async function updateProduct(req: Request, res: Response): Promise<void> {
  try {
    await productModel.updateProduct(parseInt(req.params.id), req.body);
    res.json({ message: "Produto atualizado com sucesso" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteProduct(req: Request, res: Response): Promise<void> {
  try {
    await productModel.deleteProduct(parseInt(req.params.id));
    res.json({ message: "Produto excluído com sucesso" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export default {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
