import {
  extractPageInfo,
  formatProductObjectForStorage,
  formatOrderObjectForStorage,
} from "../utils/helpers";
import { Product, Order } from "../types/types";

describe("Helpers", () => {
  describe("extractPageInfo", () => {
    test("should extract page_info from link header", () => {
      const linkHeader = '<https://example.com?page_info=abc123>; rel="next"';
      const pageInfo = extractPageInfo(linkHeader);
      expect(pageInfo).toBe("abc123");
    });

    test("should return undefined if no next link is present", () => {
      const linkHeader = '<https://example.com>; rel="prev"';
      const pageInfo = extractPageInfo(linkHeader);
      expect(pageInfo).toBeUndefined();
    });

    test("should return undefined if link header is null", () => {
      const pageInfo = extractPageInfo(null);
      expect(pageInfo).toBeUndefined();
    });
  });

  describe("formatProductObjectForStorage", () => {
    test("should format product object for storage", () => {
      const product = { id: "123", title: "Test Product" };
      const formattedProduct: Product = formatProductObjectForStorage(product);

      expect(formattedProduct).toHaveProperty("id");
      expect(formattedProduct.platform_id).toBe("123");
      expect(formattedProduct.name).toBe("Test Product");
    });
  });

  describe("formatOrderObjectForStorage", () => {
    test("should format order object for storage", () => {
      const order = { id: "456", line_items: [{ product_id: "789" }] };
      const formattedOrder: Order = formatOrderObjectForStorage(order);

      expect(formattedOrder).toHaveProperty("id");
      expect(formattedOrder.platform_id).toBe("456");
      expect(formattedOrder.line_items.product_id).toBe("789");
    });
  });
});
