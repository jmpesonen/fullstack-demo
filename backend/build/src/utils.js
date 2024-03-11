"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const toNewCoffeeEntry = (object) => {
    if (!object || typeof object !== "object") {
        throw new Error("Data is either incorrect or missing.");
    }
    if ("name" in object &&
        "weight" in object &&
        "price" in object &&
        "roast" in object) {
        const newEntry = {
            name: parseName(object.name),
            weight: parseWeight(object.weight),
            price: parsePrice(object.price),
            roast: parseCoffeeRoast(object.roast),
        };
        return newEntry;
    }
    throw new Error("Data is missing some of its required fields.");
};
const isString = (text) => {
    return typeof text === "string";
};
const parseName = (name) => {
    if (!name || !isString(name)) {
        throw new Error("The name is missing or could not be converted into a string.");
    }
    return name;
};
const isInteger = (weight) => {
    return typeof weight === "number" && Number.isInteger(weight);
};
const parseWeight = (weight) => {
    if (!weight || !isInteger(weight)) {
        throw new Error("The weight could not be parsed as an integer.");
    }
    return weight;
};
const isNumber = (price) => {
    return typeof price === "number";
};
const parsePrice = (price) => {
    if (!price || !isNumber(price)) {
        throw new Error("The price could not be parsed as a number.");
    }
    return price;
};
const isCoffeeRoast = (param) => {
    return Object.values(types_1.CoffeeRoast)
        .map((x) => x.toString())
        .includes(param);
};
const parseCoffeeRoast = (roast) => {
    if (!roast || !isString(roast) || !isCoffeeRoast(roast)) {
        throw new Error("The following coffee roast is missing or could not be parsed correctly: " +
            roast);
    }
    return roast;
};
exports.default = toNewCoffeeEntry;
