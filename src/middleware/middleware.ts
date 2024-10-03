import { Request, Response, NextFunction } from "express";
import {
  getProductsFromFirestore,
  getOrdersFromFirestore,
} from "../services/firebase.service";

export const getProductsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await getProductsFromFirestore();
    res.json(products);
  } catch (error) {
    next(error);
  }
};

export const getOrdersMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await getOrdersFromFirestore();
    res.json(products);
  } catch (error) {
    next(error);
  }
};
