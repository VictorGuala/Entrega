import express from "express";
import { manager } from "../manager/productManager.js";

const router = express.Router();

router.get("/", async (req, res) => {
  console.log('asd');
  const data = await manager.getProducts();
  if (data) {
    res.json({ data });
  }
});

router.get("/realtimeproducts", (req, res) => {
  res.json("realTimeProducts", {});
});

export default router;
