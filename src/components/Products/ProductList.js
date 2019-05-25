import React from "react";
import { connect } from "react-redux";
import {
  fetchProducts,
  isLoadingSelector,
  totalPagesSelector
} from "../../ducks/products";
import { Link } from "react-router-dom";
import "./ProductList.css";
import qs from "query-string";

class ProductsList extends React.Component {
  componentDidMount() {
    const page = this.getPageNumber(this.props);
    this.props.fetchProducts(page);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const prevPage = this.getPageNumber(prevProps);
    const page = this.getPageNumber(this.props);
    if (page !== prevPage) {
      this.props.fetchProducts(page);
    }
  }

  getPageNumber = props => Number(qs.parse(props.location.search).page || 1);

  render() {
    let pages = new Array(this.props.totalPages)
      .fill(null)
      .map((_v, i) => i + 1);
    if (this.props.isLoading) return <div>Loading...</div>;
    return (
      <div>
        <Link className="createNewForm" to={`/products/new`}>
          Create new
        </Link>
        {this.props.list.map(el => (
          <div key={el.id}>
            <Link to={`/products/${el.id}`}>{el.name}</Link>
            <Link to={`/products/${el.id}/edit`}> Edit</Link>
          </div>
        ))}
        <div>
          {pages.map(p => (
            <Link key={p} to={`/products?page=${p}`}>
              {p}
            </Link>
          ))}
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    list: state.products.list,
    isLoading: isLoadingSelector(state),
    totalPages: totalPagesSelector(state)
  }),
  {
    fetchProducts
  }
)(ProductsList);
