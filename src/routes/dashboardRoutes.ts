import express from "express";
import dashboardController from "../controllers/dashboardController";
import authenticateToken from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/", authenticateToken, dashboardController.getDashboardData);

export default router;
