import { Context, Next } from "koa";
import {
  getProductsFromFirestore,
  getOrdersFromFirestore,
} from "../services/firebase.service";

export const getProductsMiddleware = async (
  ctx: Context, next: Next
) => {
  try {
    const products = await getProductsFromFirestore();
    ctx.body = products;
  } catch (error) {
    ctx.throw(500, error);
  }
  await next();
};

export const getOrdersMiddleware = async (
  ctx: Context, next: Next
) => {
  try {
    const products = await getOrdersFromFirestore();
    ctx.body = orders;
  } catch (error) {
    ctx.throw(500, error); 
  }
  await next();
};
