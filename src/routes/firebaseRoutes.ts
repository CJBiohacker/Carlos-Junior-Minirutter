import Router from "@koa/router";
import {
  getProductsMiddleware,
  getOrdersMiddleware,
} from "../middleware/middleware";

const firebaseRoute = new Router();

firebaseRoute.get("/products", getProductsMiddleware);
firebaseRoute.get("/orders", getOrdersMiddleware);

export default firebaseRoute;
