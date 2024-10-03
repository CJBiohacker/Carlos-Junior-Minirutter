import { Product, Order } from "../types/types";
import { getAllProducts, getAllOrders } from "../utils/queries";

export const getProductsFromFirestore = async () => {
  try {
    const data: Product[] = (await getAllProducts()) as Product[];
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getOrdersFromFirestore = async () => {
  try {
    const data: Order[] = (await getAllOrders()) as Order[];

    return data;
  } catch (error) {
    console.error(error);
  }
};
