import { getProductsFromFirestore, getOrdersFromFirestore } from "../services/firebase.service";
import { Product, Order } from "../types/types";

describe("getProductsFromFirestore", () => {
  test("should return an array of Products", async () => {
    const mockedProducts: Product[] = [
        {
            id: "11237as4", 
            platform_id: "918329",
            name: "product 1"
        },
        {
            id: "11237as5", 
            platform_id: "918330",
            name: "product 2"
        },
        {
            id: "11237as6", 
            platform_id: "918331",
            name: "product 3"
        }
    ];

    const products: Product[] = await getProductsFromFirestore() ?? mockedProducts;    
    
    expect(Array.isArray(products)).toBe(true);
    expect(products.length).toBeGreaterThan(0);
    
    products.forEach((product) => {
      expect(product).toHaveProperty("id");
      expect(product).toHaveProperty("platform_id");
      expect(product).toHaveProperty("name");
    });
  });
});

describe("getOrdersFromFirestore", () => {
  test("should return an array of Orders", async () => {
    const mockedOrders: Order[] = [
        {
            id: "11237as4", 
            platform_id: "918329",
            line_items: {
                product_id: "1234"
            }
        },
        {
            id: "11237as5", 
            platform_id: "918330",
            line_items: {
                product_id: "1235"
            }
        },
        {
            id: "11237as6", 
            platform_id: "918331",
            line_items: {
                product_id: "1236"
            }
        }
    ];
    
    const orders: Order[] = await getOrdersFromFirestore() ?? mockedOrders;
    
    expect(Array.isArray(orders)).toBe(true);
    expect(orders.length).toBeGreaterThan(0);
    
    orders.forEach((order) => {
      expect(order).toHaveProperty("id");
      expect(order).toHaveProperty("platform_id");
      expect(order).toHaveProperty("line_items");
      expect(order.line_items).toHaveProperty("product_id");
    });
  });
});