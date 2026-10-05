import express from "express";
import { healthCheck } from "../controllers/healthcheck.controller.js";

const router = express.Router();

//health check route
router.get('/', healthCheck)

export default router;