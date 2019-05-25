import React from "react";
import { connect } from "react-redux";
import { increase, decrease } from "../ducks/counter";

class Counter extends React.Component {
  render() {
    return (
      <div>
        <h1>ReduxCounter</h1>
        {this.props.count}

        <button onClick={() => this.props.increase(10)}>+10</button>
        <button onClick={() => this.props.decrease(10)}>-10</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    count: state.counter.count
  };
}

const mapDispatchToProps = { increase, decrease };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter);
