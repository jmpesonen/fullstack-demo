import { CoffeeEntry, CoffeeRoast } from "../../types";

const roastDictionary: { [key in CoffeeRoast]: string } = {
  [CoffeeRoast.Light]: "Light roast",
  [CoffeeRoast.Medium]: "Medium roast",
  [CoffeeRoast.Dark]: "Dark roast",
  [CoffeeRoast.Espresso]: "Espresso roast",
  [CoffeeRoast.French]: "French roast",
};

const ListItem = (props: { coffee: CoffeeEntry }) => {
  return (
    <div>
      <h3>{props.coffee.name}</h3>
      <p>{roastDictionary[props.coffee.roast]}</p>
      <p>
        {props.coffee.price.toLocaleString() +
          " €, " +
          props.coffee.weight +
          " g"}
      </p>
    </div>
  );
};

export default ListItem;
