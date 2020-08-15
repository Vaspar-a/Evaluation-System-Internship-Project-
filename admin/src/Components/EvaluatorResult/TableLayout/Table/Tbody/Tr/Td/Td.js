import React, { Component } from "react";

class Td extends Component {
  constructor(props) {
    super(props);
    this.td_keypressdown = this.td_keypressdown.bind(this);
    this.down_key = this.down_key.bind(this);
    this.up_key = this.up_key.bind(this);
    this.left_key = this.left_key.bind(this);
    this.right_key = this.right_key.bind(this);
    this[this.props.id] = React.createRef();
  }

  id = this.props.id;

  td_keypressdown(event) {
    console.log(this[this.props.id]);
    let keyCode = parseInt(event.keyCode, 10);
    if (keyCode === 37) {
      // left
      let col_no = this.left_key(8, this.id.slice(-1));
      let new_id = "r" + this.id.slice(1, 2) + "c" + col_no;
      console.log(new_id);
      console.log(this[new_id]);
      this[new_id].current.focus();
    } else if (keyCode === 38) {
      // up
      let row_no = this.up_key(4, this.id.slice(1, 2));
      let new_id = "r" + row_no + "c" + this.id.slice(-1);
      console.log(new_id);
      this[this.props.id].current.focus();
    } else if (keyCode === 39) {
      // right
      let col_no = this.right_key(8, this.id.slice(-1));
      let new_id = "r" + this.id.slice(1, 2) + "c" + col_no;
      console.log(new_id);
      this[new_id].current.focus();
    } else if (keyCode === 40) {
      // down
      let row_no = this.down_key(4, this.id.slice(1, 2));
      let new_id = "r" + row_no + "c" + this.id.slice(-1);
      console.log(new_id);
      this[new_id].current.focus();
    }
  }

  up_key(total_rows, row_no) {
    row_no = parseInt(row_no, 10);
    let new_row_no = (total_rows + (row_no - 1)) % total_rows;
    return new_row_no;
  }

  down_key(total_rows, row_no) {
    row_no = parseInt(row_no, 10);
    let new_row_no = (total_rows + (row_no + 1)) % total_rows;
    return new_row_no;
  }

  left_key(total_cols, col_no) {
    col_no = parseInt(col_no, 10);
    let new_col_no = (total_cols + (col_no - 1)) % total_cols;
    return new_col_no;
  }

  right_key(total_cols, col_no) {
    col_no = parseInt(col_no, 10);
    let new_col_no = (total_cols + (col_no + 1)) % total_cols;
    return new_col_no;
  }

  render() {
    return (
      <td id={this.props.id} ref={this.props.id}>
        <input
          type="text"
          value={this.props.id.toUpperCase()}
          id={this.props.id}
          ref={this[this.props.id]}
          onKeyDown={this.td_keypressdown}
        />
      </td>
    );
  }
}

export default Td;
