import React from "react";
import { fetchProduct, isLoadingSelector } from "../../ducks/products";
import { saveProduct } from "../../ducks/products";
import { connect } from "react-redux";
import ProductForm from "./ProductForm";

class EditProduct extends React.Component {
  componentDidMount() {
    this.props.fetchProduct(this.props.match.params.id);
  }

  render() {
    const { product, isLoading } = this.props;

    if (isLoading) return <div>Loading...</div>;

    if (!product) return null;
    return (
      <div>
        <h1>Edit {product.name}</h1>
        <ProductForm
          product={this.props.product}
          saveProduct={this.props.saveProduct}
        />
      </div>
    );
  }
}

export default connect(
  state => ({
    product: state.products.one,
    isLoading: isLoadingSelector(state)
  }),
  {
    fetchProduct,
    saveProduct
  }
)(EditProduct);
