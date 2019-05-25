import React from "react";
import { connect } from "react-redux";
import { handleIsDone } from "../../ducks/todos";
import { changeText } from "../../ducks/todos";
import { showActive } from "../../ducks/todos";
import { showAll } from "../../ducks/todos";
import { deleteItem } from "../../ducks/todos";
import {
  showDone,
  filterTodos,
  fetchList,
  isLoadingSelector,
  errorMessageSelector
} from "../../ducks/todos";

class List extends React.Component {
  render() {
    return (
      <div>
        <button onClick={this.props.showActive}>Active</button>
        <button onClick={this.props.showAll}>All</button>
        <button onClick={this.props.showDone}>Done</button>
        <button onClick={this.props.fetchList}>Server Load</button>
        <div>
          {filterTodos(this.props.list, this.props.filter).length} of
          {this.props.list.length}{" "}
        </div>
        {this.props.isLoading && "Loading..."}
        {this.props.errorMessage}
        {filterTodos(this.props.list, this.props.filter).map(el => (
          <div
            key={el.id}
            style={{
              textDecoration: el.isDone ? "line-through" : "none"
            }}
          >
            <input
              type="checkbox"
              checked={el.isDone}
              onChange={e => this.props.handleIsDone(el.id, e.target.checked)}
            />
            <input
              value={el.text}
              onChange={e => this.props.changeText(el.id, e.target.value)}
            />
            {el.text}

            <button onClick={() => this.props.deleteItem(el.id)}>X</button>
          </div>
        ))}
      </div>
    );
  }
}

export default connect(
  state => ({
    list: state.todos.list,
    filter: state.todos.filter,
    isLoading: isLoadingSelector(state),
    errorMessage: errorMessageSelector(state)
  }),
  {
    handleIsDone,
    changeText,
    showActive,
    showAll,
    showDone,
    filterTodos,
    deleteItem,
    fetchList
  }
)(List);
