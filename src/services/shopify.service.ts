import { createAdminRestApiClient } from "@shopify/admin-api-client";
import { clientParams } from "../utils/consts";

const client = createAdminRestApiClient(clientParams);

export const fetchProducts = async () => {
  try {
    const response = await client.get(
      `/admin/api/${clientParams.apiVersion}/products.json`,
      { searchParams: { limit: 250 } }
    );

    if (!response.ok)
      throw new Error(`Error during request: ${response.statusText}`);
    const products = await response.json();

    return products;
  } catch (error) {
    console.error("Error during product fetching: ", error);
    throw error;
  }
};
