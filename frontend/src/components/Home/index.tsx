import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="tabWrapper">
      <div className="banner">
        <div className="bannerText">
          <h1>My favorites</h1>
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
      <div>
        <p className="landingText">
          Welcome to the page where you can keep track of your favorite coffees!
        </p>
        <p className="landingText">
          Click on the link at the top right corner to get to the coffee page.
        </p>
      </div>
    </div>
  );
};

export default Home;
