import React from "react";
import { connect } from "react-redux";
import { changeNewItemText } from "../../ducks/todos";
import { addNewItem } from "../../ducks/todos";

class NewItemForm extends React.Component {
  render() {
    return (
      <div>
        <form
          onSubmit={e => {
            e.preventDefault();
            this.props.addNewItem();
          }}
        >
          <input
            type="text"
            value={this.props.newItemText}
            onChange={e => this.props.changeNewItemText(e.target.value)}
          />
        </form>
      </div>
    );
  }
}

export default connect(
  state => ({
    newItemText: state.todos.newItemText
  }),
  { addNewItem, changeNewItemText }
)(NewItemForm);
