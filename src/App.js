import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import Orders from "./pages/Orders/Orders";
import NewOrder from "./pages/NewOrder/NewOrder";
import Nav from "./components/Navbar/Nav";
import ButtonGroup from "./components/ButtonGroup/ButtonGroup";

function App() {
  return (
    <Router>
      <Nav />
      <ButtonGroup />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/orders" component={Orders} />
        <Route path="/products" component={Products} />
        <Route path="/newOrder" component={NewOrder} />
      </Switch>
    </Router>
  );
}

export default App;
