import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Coffee from "./components/Coffee";
import Home from "./components/Home";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coffee" element={<Coffee />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
