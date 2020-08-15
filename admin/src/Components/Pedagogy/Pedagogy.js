import React, { Component } from "react";
import TableLayout from "./TableLayout/TableLayout";
import InputLayout from "./InputLayout/InputLayout";
import "./main.css";

const DB = require("../DB");

class Pedagogy extends Component {
  constructor(props) {
    super(props);

    this.addRow = this.addRow.bind(this);
    this.rowDeleted = this.rowDeleted.bind(this);
    this.provideData = this.provideData.bind(this);
    this.getDB = this.getDB.bind(this);

    this["tableLayout"] = React.createRef();
    this["inputLayout"] = React.createRef();

    this.state = {
      data: [],
    };
  }

  // componentDidMount() {
  //   const endPoint = this["inputLayout"].current.provideEndPoint();
  //   //console.log(endPoint);
  // }

  getDB() {
    const endpoint = this["inputLayout"].current.provideEndPoint();
    //console.log("endpoint");
    //console.log(endpoint);

    if (endpoint !== "") {
      fetch(`http://localhost:3000/pedagogy/${endpoint}`)
        .then((res) => res.json())
        .then((data) => {
          //console.log(data);
          // //console.log(processedData);
          if (data !== null) {
            this.setState(
              {
                data: DB.processPedagogyData(data),
              },
              () => {
                this["tableLayout"].current.reRender(this.state.data);
                this["inputLayout"].current.reRender(
                  this.state.data.length - 1
                );
              }
            );
          } else {
            this["tableLayout"].current.reRender([]);
            this["inputLayout"].current.reRender(-1);
          }
        })
        .catch((err) => console.log(err));
    }
  }

  // For POST
  provideData() {
    return this["tableLayout"].current.provideData();
  }

  addRow(receivedData) {
    this["tableLayout"].current.addRowInTable(receivedData);
  }

  rowDeleted() {
    this["inputLayout"].current.rowDeleted();
  }

  render() {
    let data = this.state.data;
    //console.log(data);
    
    return (
      <div>
        <div className="bodyLayout">
          <TableLayout
            data={data}
            ref={this["tableLayout"]}
            rowDeleted={this.rowDeleted}
          />
          <InputLayout
            email={this.props.email}
            lastRowNo={data.length - 1}
            ref={this["inputLayout"]}
            addRow={this.addRow}
            providedData={this.provideData}
            getDB={ this.getDB }
            getSubject={DB.getSubjects} 
            // subList={this.state.subList}
          />
        </div>
      </div>
    );
  }
}

export default Pedagogy;
