import React, { Component } from "react";
import TableLayout from "./TableLayout/TableLayout";
import InputLayout from "./InputLayout/InputLayout";
import "./main.css";

const DB = require("../DB");

class AdminResult extends Component {
  constructor(props) {
    super(props);

    this.getDBForResultTable = this.getDBForResultTable.bind(this);
    this.reRender = this.reRender.bind(this);
    this.getASubjectResult = this.getASubjectResult.bind(this);
    this.getAllResult = this.getAllResult.bind(this);
    this.getTableData = this.getTableData.bind(this);

    this["tableLayout"] = React.createRef();
    this["inputLayout"] = React.createRef();

    this.theadData = [];

    this.state = {
      theadData: [],
      tbodyData: [],
    };
  }

  getDBForResultTable() {
    const endpoint = this["inputLayout"].current.provideEndPoint();
    const subject = this["inputLayout"].current.getSubject();
    const subType = this["inputLayout"].current.getSubType();
        
    if (subject !== "All Subjects") {
      this.getASubjectResult(endpoint, subject);
    } 
    else if (subject === "All Subjects" && subType !== "Both" && subType !== "") {
      let subList = [...this["inputLayout"].current.getSubList()];
      subList.pop();
      subList.unshift("Subject");
      let newSubList = subList.map((ele, i) => {
        return ele.replace(" | ", "_");
      });
      this.getAllResult(newSubList, subType, endpoint[1], false);
    }
    else if (subject === "All Subjects" && subType === "Both" && subType !== "") {
      let subList = [...this["inputLayout"].current.getSubList()];
      subList.pop();
      subList.unshift("Subject");
      let newSubList = subList.map((ele, i) => {
        return ele.replace(" | ", "_");
      });
      this.getAllResult(newSubList, "Theory", endpoint[1], true);
      //this.getAllResult(newSubList, "Practical", endpoint[1], false);
      
    }

  }

  getASubjectResult(endpoint, subject) {
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
                this["tableLayout"].current.reRender(this.state.theadData, this.state.tbodyData);
              }
            );
          } else {
            let arr = [];
            this["tableLayout"].current.reRender(arr, arr);
          }
        })
        .catch((err) => {
          //console.log(err);
        });
    }
  }

  getAllResult(subList, subType, colBranchSem, both, theoryData) {
    //console.log(subList);
    if (subList !== null && subList !== undefined && subList !== []) {
      Promise.all(
        subList.map((subject, index) => {
          if (index === 0)
            return fetch(`http://localhost:3000/student/${colBranchSem}`);
          return fetch(`http://localhost:3000/evaluate/${colBranchSem}_${subject}_${subType}`);
        })
      )
        .then((res) => {
          return Promise.all(
            res.map(function (response) {
              return response.json();
            })
          );
        })
        .then((data) => {
          //console.log(data);
          const result = DB.processAllSubjectResultData(data);
          //console.log(result);
          if(both) {
            this.getAllResult(subList, "Practical", colBranchSem, false, result);
          }
          else if(!both && theoryData !== undefined) {
            //console.log("Re Render here");
            //console.log(result);  // Practical Result
            //console.log(theoryData); // Theory Result
          }
          else if(!both && theoryData === undefined) {
            //console.log('Do normal re render here');
            this.setState(
              {
                theadData: result.theadData,
                tbodyData: result.tbodyData,
              },
              () => {
                this["tableLayout"].current.reRender(this.state.theadData, this.state.tbodyData);
              }
            );
          }
        });
    }
  }

  reRender(arr) {
    this["tableLayout"].current.reRender(arr, arr);
  }

  getTableData() {
    return [this.state.theadData, this.state.tbodyData];
  }

  render() {
    return (
      <div>
        <div className="bodyLayoutResult">
          <TableLayout data={this.state.tbodyData} ref={this["tableLayout"]} />
          <InputLayout
            ref={this["inputLayout"]}
            reRender={this.reRender}
            getTableData={this.getTableData}
            getDBForResultTable={this.getDBForResultTable}
            getSubjectForSubList={DB.getSubjectsForAdminResult}
          />
        </div>
      </div>
    );
  }
}

export default AdminResult;
