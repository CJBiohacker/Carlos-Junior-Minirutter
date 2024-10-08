import { createAdminRestApiClient } from "@shopify/admin-api-client";
import { clientParams } from "../utils/consts";
import {
  extractPageInfo,
  formatProductObjectForStorage,
  formatOrderObjectForStorage,
} from "../utils/helpers";
import {
  isProductSaved,
  saveProduct,
  isOrderSaved,
  saveOrder,
} from "../utils/queries";

const client = createAdminRestApiClient(clientParams);

export const fetchAndSaveProducts = async () => {
  try {
    let pageInfo: string | undefined | null = "";
    let page: string | number = 1;

    console.time("Fetch and save products time");
    do {
      const response = await client.get(
        `/admin/api/${clientParams.apiVersion}/products.json`,
        { searchParams: { limit: 250, page_info: pageInfo } }
      );

      const linkHeader = response.headers.get("link");
      pageInfo = extractPageInfo(linkHeader);

      if (!response.ok) {
        throw new Error(`Error during request: ${response.statusText}`);
      }

      const data = await response.json();

      for (const product of data.products) {
        const isSaved = await isProductSaved(product.id);

        if (!isSaved) {
          const formattedProduct = formatProductObjectForStorage(product);
          await saveProduct(formattedProduct);
        }
      }

      page += 1;
    } while (pageInfo);
    console.timeEnd("Fetch and save products time");
  } catch (error) {
    console.error("Error during product fetching: ", error);
    throw error;
  }
};

export const fetchAndSaveOrders = async () => {
  try {
    let pageInfo: string | undefined | null = "";
    let page: string | number = 1;

    console.time("Fetch and save orders time");
    do {
      const response = await client.get(
        `/admin/api/${clientParams.apiVersion}/orders.json`,
        { searchParams: { limit: 1, page_info: pageInfo } }
      );

      const linkHeader = response.headers.get("link");
      pageInfo = extractPageInfo(linkHeader);

      if (!response.ok) {
        throw new Error(`Error during request: ${response.statusText}`);
      }

      const data = await response.json();

      for (const order of data.orders) {
        const isSaved = await isOrderSaved(order.id);
        if (!isSaved) {
          const formattedOrder = formatOrderObjectForStorage(order);
          await saveOrder(formattedOrder);
        }
      }

      page += 1;
    } while (pageInfo);
    console.timeEnd("Fetch and save orders time");
  } catch (error) {
    console.error("Error during product fetching: ", error);
    throw error;
  }
};
