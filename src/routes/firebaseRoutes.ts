import express from "express";
import {
  getProductsMiddleware,
  getOrdersMiddleware,
} from "../middleware/middleware";

const firebaseRoute = express.Router();

firebaseRoute.get("/products", getProductsMiddleware);
firebaseRoute.get("/orders", getOrdersMiddleware);

export default firebaseRoute;