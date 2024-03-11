import { CoffeeRoast, NewCoffeeEntry } from "./types";

const toNewCoffeeEntry = (object: unknown): NewCoffeeEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Data is either incorrect or missing.");
  }

  if (
    "name" in object &&
    "weight" in object &&
    "price" in object &&
    "roast" in object
  ) {
    const newEntry: NewCoffeeEntry = {
      name: parseName(object.name),
      weight: parseWeight(object.weight),
      price: parsePrice(object.price),
      roast: parseCoffeeRoast(object.roast),
    };
    return newEntry;
  }

  throw new Error("Data is missing some of its required fields.");
};

const isString = (text: unknown): text is string => {
  return typeof text === "string";
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error(
      "The name is missing or could not be converted into a string."
    );
  }
  return name;
};

const isInteger = (weight: unknown): weight is number => {
  return typeof weight === "number" && Number.isInteger(weight);
};

const parseWeight = (weight: unknown): number => {
  if (!weight || !isInteger(weight)) {
    throw new Error("The weight could not be parsed as an integer.");
  }
  return weight;
};

const isNumber = (price: unknown): price is number => {
  return typeof price === "number";
};

const parsePrice = (price: unknown): number => {
  if (!price || !isNumber(price)) {
    throw new Error("The price could not be parsed as a number.");
  }
  return price;
};

const isCoffeeRoast = (param: string): param is CoffeeRoast => {
  return Object.values(CoffeeRoast)
    .map((x) => x.toString())
    .includes(param);
};

const parseCoffeeRoast = (roast: unknown): CoffeeRoast => {
  if (!roast || !isString(roast) || !isCoffeeRoast(roast)) {
    throw new Error(
      "The following coffee roast is missing or could not be parsed correctly: " +
        roast
    );
  }
  return roast;
};

export default toNewCoffeeEntry;
