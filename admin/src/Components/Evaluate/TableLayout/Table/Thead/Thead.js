import React, { Component } from "react";
import Tr from "./Tr/Tr";

class Thead extends Component {
  constructor(props) {
    super(props);

    this["tr"] = React.createRef();

    this.reRender = this.reRender.bind(this);
  }

  reRender(theadData) {
    this["tr"].current.reRender(theadData);
  }

  // filterRowsInThead(receivedData){
  //     this.props.filterRowsFromTbody(receivedData);
  // }

  render() {
    return (
      <thead>
        <Tr ref={this["tr"]} />
      </thead>
    );
  }
}

export default Thead;
