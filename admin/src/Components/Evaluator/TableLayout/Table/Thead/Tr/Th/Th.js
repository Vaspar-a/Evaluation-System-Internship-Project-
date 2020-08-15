import React, { Component } from "react";

class Th extends Component {
  constructor(props) {
    super(props);

    this[this.props.id] = React.createRef();
  }

  render() {
    return (
      <th id={this.props.id} ref={this[this.props.id]}>
        {this.props.name}
      </th>
    );
  }
}

export default Th;
