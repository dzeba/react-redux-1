import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from "react-router-dom";

import Counter from "./components/Counter";
import Index from "./components/Todo/index";
import ProductList from "./components/Products/ProductList";
import EditProduct from "./components/Products/EditProduct";
import NewProduct from "./components/Products/NewProduct";
import ProductShow from "./components/Products/ProductShow";

function App() {
  return (
    <div className="App">
      <Router>
        <nav>
          <ul className="mainMenu">
            <li className="mainMenu__item">
              <Link to="/counter">counter</Link>
            </li>
            <li className="mainMenu__item">
              <Link to="/todo/">todo</Link>
            </li>
            <li className="mainMenu__item">
              <Link to="/products/">products</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/todo" component={Index} />
          <Route path="/counter" component={Counter} />
          <Redirect exact from="/" to="/todo" />

          <Route path="/products/new" component={NewProduct} />
          <Route path="/products/:id/edit" component={EditProduct} />
          <Route path="/products/:id" component={ProductShow} />
          <Route path="/products" component={ProductList} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
