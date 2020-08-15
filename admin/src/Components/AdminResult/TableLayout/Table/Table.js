import React, { Component } from "react";
import Thead from "./Thead/Thead";
import Tbody from "./Tbody/Tbody";
import "./Table.css";

class Table extends Component {
  constructor(props) {
    super(props);

    this.filterRowsFromTbody = this.filterRowsFromTbody.bind(this);
    this.reRender = this.reRender.bind(this);
    this.showHideCol = this.showHideCol.bind(this);

    this["thead"] = React.createRef();
    this["tbody"] = React.createRef();
  }
      
  reRender(theadData, tbodyData) {
    this["tbody"].current.reRender(tbodyData);
    this["thead"].current.reRender(theadData);
  }

  showHideCol(id, isChecked, showHideColOfThead) {
    this["tbody"].current.showHideCol(id, isChecked, showHideColOfThead);
  }  

  // Filter Rows
  filterRowsFromTbody(receivedData) {
    this['tbody'].current.filterRows(receivedData);
  }
  
  render() {
    return (
      <table id={'result'}>
        <Thead ref={this["thead"]} showHideCol={this.showHideCol} />
        <Tbody data={this.props.data} ref={this["tbody"]} filterTrashCan={this.filterTrashCanInTable} />
      </table>
    );
  }
}

export default Table;
