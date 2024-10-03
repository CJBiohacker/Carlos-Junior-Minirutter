import express, { Request, Response, NextFunction } from "express";
import { PORT } from "./utils/consts";
import "dotenv/config";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});



// getOrdersFromFirestore();

app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
});
