import { v4 as uuidv4 } from "uuid";
import { db } from "../database/firebaseconfig";
import { Product, Order } from "../types/types";
import { COLLECTION_1, COLLECTION_2 } from "../utils/consts";

export const saveProduct = async (product: Product) => {
  try {
    const docId = String(product.platform_id);
    await db.collection(COLLECTION_1).doc(docId).set(product);

    console.log("Product successfully stored in Firestore");
  } catch (error) {
    console.error("Error adding the Product: ", error);
  }
};

export const saveOrder = async (order: Order) => {
  try {
    const uuid: string = uuidv4();
    await db.collection(COLLECTION_2).doc(uuid).set(order);

    console.log("Order successfully stored in Firestore");
  } catch (error) {
    console.error("Error adding the Order: ", error);
  }
};

export const isProductSaved = async (productId: string ): Promise<boolean> => {
  const docId = String(productId);
  const product = await db.collection(COLLECTION_1).doc(docId).get();
  return product.exists;
};

export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const data: Product[] = [];
    const snapshot = await db.collection(COLLECTION_1).get();
    snapshot.forEach((doc) => {
      data.push(doc.data() as Product);
    });

    console.log("Order successfully stored in Firestore");
    return data;
  } catch (error) {
    console.error("Error getting Products:");
    throw error;
  }
};

export const getAllOrders = async (): Promise<Order[]> => {
  try {
    const data: Order[] = [];
    const snapshot = await db.collection(COLLECTION_2).get();
    snapshot.forEach((doc) => {
      data.push(doc.data() as Order);
    });

    return data;
  } catch (error) {
    console.error("Error getting Orders:");
    throw error;
  }
};
