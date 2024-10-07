import { Product, Order } from "../types/types";
import { v4 as uuidv4 } from "uuid";

export const extractPageInfo = (linkHeader: string | null | undefined) => {
  let pageInfo: string | undefined | null;

  if (linkHeader) {
    const match = /<([^>]+)>;\s*rel="next"/.exec(linkHeader);

    if (match) {
      const nextUrl = new URL(match[1]);

      pageInfo = nextUrl.searchParams.get("page_info") ?? undefined;
    } else {
      pageInfo = undefined;
    }
  } else {
    pageInfo = undefined;
  }

  return pageInfo;
};

export const formatProductObjectForStorage = (product: any): Product => {
  const data = {
    id: uuidv4(),
    platform_id: product.id,
    name: product.title,
  }
  return data;
};
