import React, { Component } from "react";
import TableLayout from "./TableLayout/TableLayout";
import InputLayout from "./InputLayout/InputLayout";
import "./main.css";

const DB = require("../DB");

class EvaluatorResult extends Component {
  constructor(props) {
    super(props);

    this.getDB = this.getDB.bind(this);
    this.getTableData = this.getTableData.bind(this);

    this["tableLayout"] = React.createRef();
    this["inputLayout"] = React.createRef();

    this.theadData = [];

    this.state = {
      theadData: [],
      tbodyData: [],
    };
  }

  getDB() {
    const endpoint = this["inputLayout"].current.provideEndPoint();
    const subject = this["inputLayout"].current.getSubject();
    //console.log("endpoint");
    //console.log(endpoint);

    if (endpoint !== "") {
      Promise.all([
        fetch(`http://localhost:3000/student/${endpoint[1]}`),
        fetch(`http://localhost:3000/pedagogy/${endpoint[0]}`),
        fetch(`http://localhost:3000/evaluate/${endpoint[0]}`),
      ])
        .then((res) => {
          return Promise.all(
            res.map(function (response) {
              return response.json();
            })
          );
        })
        .then((data) => {
          let stuData = data[0];
          let pedData = data[1];
          let evalData = data[2];

          //console.log(stuData);
          //console.log(pedData);
          //console.log(evalData);

          //console.log(stuData !== null && pedData !== null);
          if (stuData !== null && pedData !== null) {
            this.theadData = DB.getPedList(pedData);
            this.theadData.push(subject);
            const tbodyData = DB.processResultData(stuData, pedData, evalData);
            //console.log(tbodyData);
            this.setState(
              {
                theadData: this.theadData,
                tbodyData: tbodyData,
              },
              () => {
                this["tableLayout"].current.reRender(
                  this.state.theadData,
                  this.state.tbodyData
                );
              }
            );
          } else {
            let arr = [];
            this["tableLayout"].current.reRender(arr, arr);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  getTableData() {
    return [this.state.theadData, this.state.tbodyData];
  }

  render() {
    return (
      <div>
        <div className="bodyLayoutResult">
          {/* <h1>Result</h1> */}
          <TableLayout data={this.state.tbodyData} ref={this["tableLayout"]} />
          <InputLayout
            email={this.props.email}
            ref={this["inputLayout"]}
            getDB={this.getDB}
            getSubject={DB.getSubjects}
            getTableData={this.getTableData}
          />
        </div>
      </div>
    );
  }
}

export default EvaluatorResult;
