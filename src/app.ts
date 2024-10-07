import express, { Request, Response, NextFunction } from "express";
import { PORT } from "./utils/consts";
import firebaseRoute from "./routes/firebaseRoutes";
import "dotenv/config";
import { fetchAndSaveProducts } from "./services/shopify.service";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

fetchAndSaveProducts().then();
app.use("/api", firebaseRoute);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
});
