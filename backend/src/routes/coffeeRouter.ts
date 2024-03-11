import express from "express";
import coffeeService from "../services/coffeeService";
import toNewCoffeeEntry from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(coffeeService.getCoffeeData());
});

router.post("/", (req, res) => {
  try {
    // toNewCoffeeEntry validates the request
    const newCoffeeEntry = toNewCoffeeEntry(req.body);
    const addedEntry = coffeeService.addCoffee(newCoffeeEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = "Adding a new coffee entry failed.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
