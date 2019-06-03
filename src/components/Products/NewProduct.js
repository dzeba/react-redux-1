import React from "react";
import { connect } from "react-redux";
import { saveNewProduct } from "../../ducks/products";
import ProductForm from "./ProductForm";
import "./ProductForm.css";
class NewProduct extends React.Component {
  render() {
    return (
      <div>
        <h1 className="editName">New product</h1>
        <ProductForm
          product={{ name: "", description: "" }}
          saveProduct={this.props.saveNewProduct}
        />
      </div>
    );
  }
}

export default connect(
  null,
  {
    saveNewProduct
  }
)(NewProduct);
