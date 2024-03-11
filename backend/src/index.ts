import cors from "cors";
import express from "express";
import fs from "fs";
import coffeeRouter from "./routes/coffeeRouter";
import { CoffeeEntry } from "./types";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (_request, response) => {
  response.json();
});

app.use("/api/coffee", coffeeRouter);

app.get("/search", (request, response) => {
  const obj = JSON.parse(fs.readFileSync("./data/coffeedata.json", "utf-8"));
  const coffeeArray: CoffeeEntry[] = obj.coffeeData as CoffeeEntry[];

  const results: CoffeeEntry[] = [];
  coffeeArray.forEach((coffee) => {
    // If a field is not in query parameters, proceed to check the next field.
    // If it is but it is a mismatch, skip to next entry directly.
    if (
      request.query.name &&
      typeof request.query.name === "string" &&
      !coffee.name.toLowerCase().includes(request.query.name.toLowerCase())
    ) {
      return;
    }

    if (
      request.query.weight_start &&
      Number(request.query.weight_start) > coffee.weight
    ) {
      return;
    }

    if (
      request.query.weight_end &&
      Number(request.query.weight_end) < coffee.weight
    ) {
      return;
    }

    if (
      request.query.price_start &&
      Number(request.query.price) > coffee.price
    ) {
      return;
    }

    if (request.query.price_end && Number(request.query.price) < coffee.price) {
      return;
    }

    if (request.query.roast && request.query.roast !== coffee.roast) {
      return;
    }

    // Nothing eliminated this entry; push it to the final results.
    results.push(coffee);
  });
  response.json(results);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
