import { v4 as uuidv4 } from "uuid";
import { db } from "../database/firebaseconfig";
import { Product, Order } from "../types/types";
import { COLLECTION_1, COLLECTION_2 } from "../utils/consts";

export const saveProduct = async (product: Product) => {
  try {
    const uuid: string = uuidv4();
    await db.collection(COLLECTION_1).doc(uuid).set(product);

    console.log("Product successfully stored in Firestore");
  } catch (error) {
    console.error("Error adding the Product: ", error);
  }
}

export const saveOrder = async (order: Order) => {
  try {
    const uuid: string = uuidv4();
    await db.collection(COLLECTION_2).doc(uuid).set(order);

    console.log("Order successfully stored in Firestore");
  } catch (error) {
    console.error("Error adding the Order: ", error);
  }
}

export const getAllProducts = async () => {
  try {
    const data: Product[] = [];
    const snapshot = await db.collection(COLLECTION_1).get();
    snapshot.forEach((doc) => {
      data.push(doc.data() as Product);
    });

    console.log("Order successfully stored in Firestore");
    return data;
  } catch (error) {
    console.error("Error getting Products: ", error);
  }
}

export const getAllOrders = async () => {
  try {
    const data: Order[] = [];
    const snapshot = await db.collection(COLLECTION_2).get();
    snapshot.forEach((doc) => {
      data.push(doc.data() as Order);
    });

    return data;
  } catch (error) {
    console.error("Error getting Orders: ", error);
  }
}