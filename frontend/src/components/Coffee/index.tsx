import { SyntheticEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { addCoffee, fetchCoffees } from "../../app/coffeeSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { CoffeeEntry, CoffeeRoast } from "../../types";
import ListItem from "./ListItem";

const Coffee = () => {
  const [name, setName] = useState("");
  const [weight, setWeight] = useState<number | string>("");
  const [price, setPrice] = useState<string>("");
  const [selectedRoast, setSelectedRoast] = useState<CoffeeRoast>(
    CoffeeRoast.Light
  );
  const [showAll, setShowAll] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const dispatch = useAppDispatch();
  const coffees = useAppSelector((state) => state.coffee.coffeeData);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    dispatch(fetchCoffees());
  }, [dispatch]);

  const validateWeight = (value: string) => {
    if (Number.isInteger(Number(value)) && Number(value) < 1000000) {
      setWeight(Number(value));
    }
  };

  const validatePrice = (value: string) => {
    if (/^([1-9]|^$)[0-9]{0,4}[.]{0,1}[0-9]{0,2}$/.test(value)) {
      setPrice(value);
    }
  };

  const submitForm = (event: SyntheticEvent) => {
    event.preventDefault();
    if (!name || !weight || !price || !selectedRoast) {
      setErrorMsg("All of the fields are required.");
      setTimeout(() => {
        setErrorMsg("");
      }, 5000);
    }
    const priceAsNumber = Number(price);
    if (typeof weight === "number" && typeof priceAsNumber === "number") {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      dispatch(
        addCoffee({ name, weight, price: priceAsNumber, roast: selectedRoast })
      );
    }
  };

  return (
    <div className="tabWrapper">
      <div className="banner">
        <div className="bannerText">
          <h1>My favorite coffees</h1>
        </div>
        <div className="navLinksWrapper">
          <Link className="navLinks" to="/">
            HOME
          </Link>
          <Link className="navLinks" to="/coffee">
            COFFEE
          </Link>
        </div>
      </div>
      <div className="content">
        <div className="topList">
          <h2>My TOP-5 favorites</h2>
          <ol>
            {showAll
              ? Object.values(coffees).map((coffee: CoffeeEntry) => (
                  <li key={coffee.id} className="listItem">
                    <ListItem coffee={coffee} />
                  </li>
                ))
              : Object.values(coffees)
                  .slice(0, 5)
                  .map((coffee: CoffeeEntry) => (
                    <li key={coffee.id} className="listItem">
                      <ListItem coffee={coffee} />
                    </li>
                  ))}
          </ol>
          {
            <input
              type="button"
              onClick={() => setShowAll(!showAll)}
              value={showAll ? "SHOW LESS" : "SHOW ALL"}
              className="transparentButton"
            />
          }
        </div>
        <h1 className="headerText"></h1>
        <div className="addForm">
          <h2>Add new</h2>
          <form>
            <div className="addFormItem">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                required
                onInput={(e) => setName(e.currentTarget.value)}
                className="inputField inputFieldName"
              />
            </div>
            <div className="addFormItem">
              <label htmlFor="weight">Weight</label>
              <div className="inputFieldInline">
                <input
                  type="number"
                  id="weight"
                  name="weight"
                  value={weight || ""}
                  required
                  onInput={(e) => validateWeight(e.currentTarget.value)}
                  className="inputField"
                />
                <span>g</span>
              </div>
            </div>
            <div className="addFormItem">
              <label htmlFor="price">Price</label>
              <div className="inputFieldInline">
                <input
                  type="text"
                  id="price"
                  name="price"
                  value={price || ""}
                  required
                  onInput={(e) => validatePrice(e.currentTarget.value)}
                  className="inputField"
                />
                <span>€</span>
              </div>
            </div>
            <fieldset>
              <legend>Degree of roast</legend>
              <div>
                <input
                  type="radio"
                  id={CoffeeRoast.Light}
                  value={CoffeeRoast.Light}
                  name="roast"
                  className="inputRadio"
                  defaultChecked
                  onChange={(e) =>
                    setSelectedRoast(e.target.value as CoffeeRoast)
                  }
                />
                <label htmlFor={CoffeeRoast.Light}>Light roast</label>
              </div>
              <div>
                <input
                  type="radio"
                  id={CoffeeRoast.Medium}
                  value={CoffeeRoast.Medium}
                  name="roast"
                  className="inputRadio"
                  onChange={(e) =>
                    setSelectedRoast(e.target.value as CoffeeRoast)
                  }
                />
                <label htmlFor={CoffeeRoast.Medium}>Medium roast</label>
              </div>
              <div>
                <input
                  type="radio"
                  id={CoffeeRoast.Dark}
                  value={CoffeeRoast.Dark}
                  name="roast"
                  className="inputRadio"
                  onChange={(e) =>
                    setSelectedRoast(e.target.value as CoffeeRoast)
                  }
                />
                <label htmlFor={CoffeeRoast.Dark}>Dark roast</label>
              </div>
              <div>
                <input
                  type="radio"
                  id={CoffeeRoast.Espresso}
                  value={CoffeeRoast.Espresso}
                  name="roast"
                  className="inputRadio"
                  onChange={(e) =>
                    setSelectedRoast(e.target.value as CoffeeRoast)
                  }
                />
                <label htmlFor={CoffeeRoast.Espresso}>Espresso roast</label>
              </div>
              <div>
                <input
                  type="radio"
                  id={CoffeeRoast.French}
                  value={CoffeeRoast.French}
                  name="roast"
                  className="inputRadio"
                  onChange={(e) =>
                    setSelectedRoast(e.target.value as CoffeeRoast)
                  }
                />
                <label htmlFor={CoffeeRoast.French}>French roast</label>
              </div>
            </fieldset>
            <p className="errorMsg">{errorMsg}</p>
            <button
              type="button"
              className="styledButton"
              onClick={(e) => submitForm(e)}
            >
              SAVE
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Coffee;
