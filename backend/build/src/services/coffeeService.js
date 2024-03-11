"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const dataFile = "./data/coffeedata.json";
const obj = JSON.parse(fs_1.default.readFileSync(dataFile, "utf-8"));
const coffeeArray = obj.coffeeData;
const getCoffeeData = () => {
    return coffeeArray;
};
const addCoffee = (entry) => {
    const newCoffeeEntry = Object.assign({ id: Math.max(...coffeeArray.map((x) => x.id)) + 1 }, entry);
    coffeeArray.push(newCoffeeEntry);
    const json = JSON.stringify({ coffeeData: coffeeArray });
    fs_1.default.writeFile(dataFile, json, "utf-8", (err) => {
        if (err)
            throw err;
        console.log("The file has been saved!");
    });
    return newCoffeeEntry;
};
exports.default = {
    getCoffeeData,
    addCoffee,
};
