import React, { Component } from "react";
import TableLayout from "./TableLayout/TableLayout";
import InputLayout from "./InputLayout/InputLayout";
import "./main.css";

const DB = require("../DB");

class Evaluator extends Component {
  constructor(props) {
    super(props);

    this.addRow = this.addRow.bind(this);
    this.rowDeleted = this.rowDeleted.bind(this);
    this.provideData = this.provideData.bind(this);

    this["tableLayout"] = React.createRef();
    this["inputLayout"] = React.createRef();

    this.state = {
      data: [],
    };

    fetch("http://localhost:3000/admin")
      .then((res) => res.json())
      .then((data) => {
        //console.log(data);
        // //console.log(processedData);
        this.setState({
          data: DB.processAdminData(data),
        });
      })
      .catch((err) => console.log(err));
  }

  // For POST
  provideData() {
    return this["tableLayout"].current.provideData();
  }

  // componentDidMount() {
  //   fetch("http://localhost:3000/admin")
  //   .then((res) => res.json())
  //   .then((data) => {
  //     //console.log(data);
  //     // //console.log(processedData);
  //     this.setState({
  //       data: DB.processAdminData(data),
  //     })
  //   })
  //   .catch((err) => //console.log(err));
  // }

  addRow(receivedData) {
    this["tableLayout"].current.addRowInTable(receivedData);
  }

  rowDeleted() {
    this["inputLayout"].current.rowDeleted();
  }

  render() {
    let data = this.state.data;
    //console.log(data);
    if (data.length !== 0) {
      return (
        <div>
          <div className="bodyLayout">
            <TableLayout
              data={data}
              ref={this["tableLayout"]}
              rowDeleted={this.rowDeleted}
            />
            <InputLayout
              lastRowNo={data.length - 1}
              ref={this["inputLayout"]}
              addRow={this.addRow}
              providedData={this.provideData}
            />
          </div>
        </div>
      );
    }
    return <div>
    {/* <div className="bodyLayout">
      <TableLayout
        data={data}
        ref={this["tableLayout"]}
        rowDeleted={this.rowDeleted}
      />
      <InputLayout
        lastRowNo={data.length - 1}
        ref={this["inputLayout"]}
        addRow={this.addRow}
        providedData={this.provideData}
      />
    </div> */}
  </div>;
  }
}

export default Evaluator;
