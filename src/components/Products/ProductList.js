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
        <div className="createNewForm__block">
          <Link className="createNewForm" to={`/products/new`}>
            Create new
          </Link>
        </div>
        <div className="productList">
          {this.props.list.map(el => (
            <div key={el.id} className="productItem">
              <Link className="productItem__link" to={`/products/${el.id}`}>
                <div className="productName">
                  <Link className="productName__link" to={`/products/${el.id}`}>{el.name}</Link>
                </div>
                <div className="productImgBlock">
                  <img className="productImg" src={el.image} alt={el.name}/>
                </div>
                <div className="productDescription">{el.description}</div>
                <div className="productEdit">
                  <Link to={`/products/${el.id}/edit`}> Edit</Link>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div className="pagesAll">
          {pages.map(p => (
            <div className="pagesOne">
              <Link key={p} to={`/products?page=${p}`}>
                {p}
              </Link>
            </div>
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
