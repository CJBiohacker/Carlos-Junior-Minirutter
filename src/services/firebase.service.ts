import { Product, Order } from "../types/types";
import { getAllProducts, getAllOrders } from "../utils/queries";

export const getProductsFromFirestore = async (): Promise<Product[] | undefined> => {
  try {
    const data = await getAllProducts();

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getOrdersFromFirestore = async (): Promise<Order[] | undefined> => {
  try {
    const data = await getAllOrders();

    return data;
  } catch (error) {
    console.error(error);
  }
};
