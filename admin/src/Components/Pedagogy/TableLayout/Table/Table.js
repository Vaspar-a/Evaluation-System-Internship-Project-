import React, { Component } from "react";
import Thead from "./Thead/Thead";
import Tbody from "./Tbody/Tbody";
import "./Table.css";

class Table extends Component {
  constructor(props) {
    super(props);

    this.deleteRowInTbody = this.deleteRowInTbody.bind(this);
    this.addRowInTbody = this.addRowInTbody.bind(this);
    this.filterRowsFromTbody = this.filterRowsFromTbody.bind(this);
    this.filterTrashCanInTable = this.filterTrashCanInTable.bind(this);
    this.provideData = this.provideData.bind(this);
    this.reRender = this.reRender.bind(this);

    this["thead"] = React.createRef();
    this["tbody"] = React.createRef();
  }
  
  reRender(data) {
    this["tbody"].current.reRender(data);
  }

  deleteRowInTbody(index){
    //console.log('From Table');
    this['tbody'].current.deleteRow(index);
  }

  // Add Row
  addRowInTbody(receivedData){
    //console.log('From Table');
    this['tbody'].current.addRow(receivedData);
  }

  // Filter Rows
  filterRowsFromTbody(receivedData) {
    this['tbody'].current.filterRows(receivedData);
  }
  
  filterTrashCanInTable(receivedData) {
    this.props.filterTrashCan(receivedData);
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
