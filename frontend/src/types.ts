export enum CoffeeRoast {
  Light = "LIGHT",
  Medium = "MEDIUM",
  Dark = "DARK",
  Espresso = "ESPRESSO",
  French = "FRENCH",
}

export interface CoffeeEntry {
  id: number;
  name: string;
  weight: number;
  price: number;
  roast: CoffeeRoast;
}

export type NewCoffeeEntry = Omit<CoffeeEntry, "id">;
