import { createAdminRestApiClient } from "@shopify/admin-api-client";
import { clientParams } from "../utils/consts";
import { extractPageInfo, formatProductObjectForStorage } from "../utils/helpers";
import { isProductSaved, saveProduct } from "../utils/queries";

const client = createAdminRestApiClient(clientParams);

export const fetchAndSaveProducts = async () => {
  try {
    let pageInfo: string | undefined | null = "";
    let page: string | number = 1;

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

      const products = await response.json();

      for (const product of products.products) {
        const isSaved = await isProductSaved(product.id);

        if (!isSaved) {
          const formattedProduct = formatProductObjectForStorage(product);
          await saveProduct(formattedProduct);
        }
      }

      page += 1;
    } while (pageInfo);
  } catch (error) {
    console.error("Error during product fetching: ", error);
    throw error;
  }
};
