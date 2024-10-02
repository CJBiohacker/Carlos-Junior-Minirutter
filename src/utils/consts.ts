import "dotenv/config";

const accessToken: string = process.env.SHOPIFY_ACCESS_TOKEN!;
const storeDomain: string = process.env.SHOPIFY_STORE_URL!;
const apiVersion: string = "2022-04";

export const PORT: string = process.env.PORT ?? "3000";
export const COLLECTION_1: string = process.env.FIREBASE_COLLECTION_1!;
export const COLLECTION_2: string = process.env.FIREBASE_COLLECTION_2!;

export const clientParams = {
  storeDomain,
  apiVersion,
  accessToken,
  retries: 3,
};