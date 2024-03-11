"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const coffeeService_1 = __importDefault(require("../services/coffeeService"));
const utils_1 = __importDefault(require("../utils"));
const router = express_1.default.Router();
router.get("/", (_req, res) => {
    res.send(coffeeService_1.default.getCoffeeData());
});
router.post("/", (req, res) => {
    try {
        // toNewCoffeeEntry validates the request
        const newCoffeeEntry = (0, utils_1.default)(req.body);
        const addedEntry = coffeeService_1.default.addCoffee(newCoffeeEntry);
        res.json(addedEntry);
    }
    catch (error) {
        let errorMessage = "Adding a new coffee entry failed.";
        if (error instanceof Error) {
            errorMessage += " Error: " + error.message;
        }
        res.status(400).send(errorMessage);
    }
});
exports.default = router;
