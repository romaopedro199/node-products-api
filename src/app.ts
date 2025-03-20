import express from "express";
import productRoutes from "./routes/productRoutes";
import authRoutes from "./routes/authRoutes";

const app = express();

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/products", productRoutes);

export default app;
