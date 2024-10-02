import { createAdminRestApiClient } from "@shopify/admin-api-client";
import { clientParams, PORT } from "./utils/consts";
import express from "express";
import "dotenv/config";

const app = express();
const client = createAdminRestApiClient(clientParams);

app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
});
