import Koa, { Context, Next } from "koa";
import bodyParser from "koa-bodyparser";
import "dotenv/config";
import { PORT } from "./utils/consts";
import {
  fetchAndSaveProducts,
  fetchAndSaveOrders,
} from "./services/shopify.service";
import firebaseRoute from "./routes/firebaseRoutes";

const app = new Koa();

app.use(bodyParser());

const initializeShopifyData = async (): Promise<void> => {
  try {
    await fetchAndSaveProducts();
    await fetchAndSaveOrders();
  } catch (error) {
    console.error("Error initializing Shopify data:", error);
  }
};

initializeShopifyData();

app.use(firebaseRoute.routes());
app.use(firebaseRoute.allowedMethods());

app.use(async (ctx: Context, next: Next): Promise<void> => {
  try {
    await next();
  } catch (err) {
    console.error(err.stack);
    ctx.status = 500;
    ctx.body = { message: "Internal Server Error" };
  }
});

app.listen(PORT, (): void => {
  console.log(`Server is running on localhost:${PORT}`);
});
