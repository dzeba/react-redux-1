import React from "react";
import { connect } from "react-redux";
import {
  fetchProduct,
  isLoadingSelector,
  deleteProduct
} from "../../ducks/products";
import { Link } from "react-router-dom";

class ProductsShow extends React.Component {
  componentDidMount() {
    this.props.fetchProduct(this.props.match.params.id);
  }

  render() {
    const { product, isLoading, deleteProduct } = this.props;

    if (isLoading) return <div>Loading...</div>;

    if (!product) return null;
    return (
      <div>
        <Link className="createNewForm" to={`/products/${product.id}/edit`}>
          Edit
        </Link>
        <div>
          <h1>{product.name}</h1>
          <div>{product.description}</div>

          <img src={product.image} alt={product.name} />
        </div>
        <button onClick={() => deleteProduct(product.id)}>Delete item</button>
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
    deleteProduct
  }
)(ProductsShow);
