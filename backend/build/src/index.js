"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const coffeeRouter_1 = __importDefault(require("./routes/coffeeRouter"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get("/", (_request, response) => {
    response.json();
});
app.use("/api/coffee", coffeeRouter_1.default);
app.get("/search", (request, response) => {
    const obj = JSON.parse(fs_1.default.readFileSync("./data/coffeedata.json", "utf-8"));
    const coffeeArray = obj.coffeeData;
    const results = [];
    coffeeArray.forEach((coffee) => {
        // If a field is not in query parameters, proceed to check the next field.
        // If it is but it is a mismatch, skip to next entry directly.
        if (request.query.name &&
            typeof request.query.name === "string" &&
            !coffee.name.toLowerCase().includes(request.query.name.toLowerCase())) {
            return;
        }
        if (request.query.weight_start &&
            Number(request.query.weight_start) > coffee.weight) {
            return;
        }
        if (request.query.weight_end &&
            Number(request.query.weight_end) < coffee.weight) {
            return;
        }
        if (request.query.price_start &&
            Number(request.query.price) > coffee.price) {
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
