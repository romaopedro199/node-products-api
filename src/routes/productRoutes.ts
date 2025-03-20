import express from "express";
import productController from "../controllers/productController";
import authenticateToken from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/", authenticateToken, productController.getAllProducts);
router.get("/:id", authenticateToken, productController.getProductById);
router.post("/", authenticateToken, productController.createProduct);
router.put("/:id", authenticateToken, productController.updateProduct);
router.delete("/:id", authenticateToken, productController.deleteProduct);

export default router;
