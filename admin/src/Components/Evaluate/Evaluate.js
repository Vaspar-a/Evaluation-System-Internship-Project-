import React, { Component } from "react";
import TableLayout from "./TableLayout/TableLayout";
import InputLayout from "./InputLayout/InputLayout";
import "./main.css";

const DB = require("../DB");

class Evaluate extends Component {
  constructor(props) {
    super(props);

    this.provideData = this.provideData.bind(this);
    this.getDB = this.getDB.bind(this);

    this["tableLayout"] = React.createRef();
    this["inputLayout"] = React.createRef();

    this.theadData = [];
    this.pedWeightage = [];

    this.state = {
      theadData: [],
      tbodyData: [],
    };
  }

  getDB() {
    const endpoint = this["inputLayout"].current.provideEndPoint();
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
            this.pedWeightage = DB.getCompWeightage(pedData);
            const tbodyData = DB.processEvaluateData(
              stuData,
              pedData,
              evalData
            );
            //console.log(tbodyData);
            this.setState(
              {
                theadData: this.theadData,
                tbodyData: tbodyData,
              },
              () => {
                this["tableLayout"].current.reRender(
                  this.state.theadData,
                  this.state.tbodyData,
                  this.pedWeightage
                );
                this["inputLayout"].current.reRender(this.pedWeightage);
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

  // For POST
  provideData() {
    return this["tableLayout"].current.provideData();
  }

  render() {
    let data = this.state.tbodyData;
    //console.log(data);
    return (
      <div>
        <div className="bodyLayoutEvaluate">
          {/* <h1>Evaluate</h1> */}
          <TableLayout data={this.state.tbodyData} ref={this["tableLayout"]} />
          <InputLayout
            email={this.props.email}
            ref={this["inputLayout"]}
            providedData={this.provideData}
            getDB={this.getDB}
            getSubject={DB.getSubjects} 
          />
        </div>
      </div>
    );
  }
}

export default Evaluate;
