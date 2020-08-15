import React, { Component } from "react";
import Thead from "./Thead/Thead";
import Tbody from "./Tbody/Tbody";
import "./Table.css";

class Table extends Component {
  constructor(props) {
    super(props);

    this.filterRowsFromTbody = this.filterRowsFromTbody.bind(this);
    this.provideData = this.provideData.bind(this);
    this.reRender = this.reRender.bind(this);
  
    this["thead"] = React.createRef();
    this["tbody"] = React.createRef();
  }
    
  reRender(theadData, tbodyData, pedWeightage) {
    this["tbody"].current.reRender(tbodyData, pedWeightage, theadData);
    this["thead"].current.reRender(theadData);
  }

  // Filter Rows
  filterRowsFromTbody(receivedData) {
    this['tbody'].current.filterRows(receivedData);
  }
  
  // For POST
  provideData() {
    return this["tbody"].current.provideData();
  }

  render() {
    return (
      <table>
        <Thead ref={this["thead"]} />
        <Tbody data={this.props.data} ref={this["tbody"]} filterTrashCan={this.filterTrashCanInTable} />
      </table>
    );
  }
}

export default Table;
