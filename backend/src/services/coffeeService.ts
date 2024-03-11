import fs from "fs";
import { CoffeeEntry, NewCoffeeEntry } from "../types";

const dataFile = "./data/coffeedata.json";

const obj = JSON.parse(fs.readFileSync(dataFile, "utf-8"));
const coffeeArray: CoffeeEntry[] = obj.coffeeData as CoffeeEntry[];

const getCoffeeData = (): CoffeeEntry[] => {
  return coffeeArray;
};

const addCoffee = (entry: NewCoffeeEntry): CoffeeEntry => {
  const newCoffeeEntry = {
    id: Math.max(...coffeeArray.map((x) => x.id)) + 1,
    ...entry,
  };
  coffeeArray.push(newCoffeeEntry);

  const json = JSON.stringify({ coffeeData: coffeeArray });
  fs.writeFile(dataFile, json, "utf-8", (err) => {
    if (err) throw err;
    console.log("The file has been saved!");
  });

  return newCoffeeEntry;
};

export default {
  getCoffeeData,
  addCoffee,
};
