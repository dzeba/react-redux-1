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
import Login from "./components/Login";
import requireAuth from "./components/requireAuth";

function App() {
  return (
    <div className="App">
      <Router>
        <nav>
          <ul className="mainMenu">
            <li className="mainMenu__item">
              <Link className="mainMenu__itemLink" to="/counter">counterr</Link>
            </li>
            <li className="mainMenu__item">
              <Link className="mainMenu__itemLink" to="/todo/">todo</Link>
            </li>
            <li className="mainMenu__item">
              <Link className="mainMenu__itemLink" to="/products/">products</Link>
            </li>
            <li className="mainMenu__item">
              <Link className="mainMenu__itemLink" to="/login">login</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/todo" component={requireAuth(Index)} />
          <Route path="/counter" component={Counter} />
          <Redirect exact from="/" to="/todo" />

          <Route path="/products/new" component={requireAuth(NewProduct)} />
          <Route path="/products/:id/edit" component={requireAuth(EditProduct)} />
          <Route path="/products/:id" component={requireAuth(ProductShow)} />
          <Route path="/products" component={requireAuth(ProductList)} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
