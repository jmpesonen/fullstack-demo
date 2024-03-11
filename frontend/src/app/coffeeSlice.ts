import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { CoffeeEntry, NewCoffeeEntry } from "../types";
import type { RootState } from "./store";

const baseUrl = "http://localhost:5000/api/coffee";

interface CoffeeState {
  status: string;
  coffeeData: CoffeeEntry[];
}

const initialState: CoffeeState = {
  status: "idle",
  coffeeData: [],
};

export const fetchCoffees = createAsyncThunk(
  "coffee/fetchCoffees",
  async () => {
    const response = await axios.get(baseUrl);
    return response.data as CoffeeEntry[];
  }
);

export const addCoffee = createAsyncThunk(
  "coffee/addCoffee",
  async (newCoffee: NewCoffeeEntry) => {
    const response = await axios.post(baseUrl, newCoffee);
    return response.data as CoffeeEntry;
  }
);

export const coffeeSlice = createSlice({
  name: "coffee",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoffees.pending, (state, _action) => {
        state.status = "loading";
      })
      .addCase(fetchCoffees.fulfilled, (state, action) => {
        state.coffeeData = action.payload;
        state.status = "idle";
      })
      .addCase(addCoffee.pending, (state, _action) => {
        state.status = "loading";
      })
      .addCase(addCoffee.fulfilled, (state, action) => {
        state.coffeeData.push(action.payload);
        state.status = "idle";
      });
    // TODO: add .rejected, error msg into state so it can be shown where needed
  },
});

export const selectCoffees = (state: RootState) => state.coffee.coffeeData;

export default coffeeSlice.reducer;
