import React, { Component } from "react";
import Select from "./Select/Select";
import Modal from "react-modal";

import "./inputLayout.css";

Modal.setAppElement("#root");

const collegeList = ["CSPIT", "DEPSTAR"];
const branchList = ["CSE", "CE", "IT", "EC", "EE", "ME", "CL"];
const semList = ["1", "2", "3", "4", "5", "6", "7", "8"];

class InputLayout extends Component {
  constructor(props) {
    super(props);

    this.handleClickAdd = this.handleClickAdd.bind(this);
    this.handleClickSave = this.handleClickSave.bind(this);
    this.rowDeleted = this.rowDeleted.bind(this);
    this.setModalIsOpen = this.setModalIsOpen.bind(this);
    this.setModalIsClose = this.setModalIsClose.bind(this);

    this["inputName"] = React.createRef();
    this["inputEmail"] = React.createRef();
    this["inputSubName"] = React.createRef();
    this["inputSubCode"] = React.createRef();
    this["inputCollege"] = React.createRef();
    this["inputBranch"] = React.createRef();
    this["inputSem"] = React.createRef();
    this["inputTheory"] = React.createRef();
    this["inputPractical"] = React.createRef();
    this["buttonAdd"] = React.createRef();
    this["buttonSave"] = React.createRef();

    this.state = {
      lastRowNo: this.props.lastRowNo,
      modalIsOpen: false,
    };
  }

  
  setModalIsOpen() {
    this.setState({ modalIsOpen: true }, () => {
      //console.log('Open');
      // //console.log(value);
    });
  }

  setModalIsClose(event) {
    // event.stopPropagation();
    this.setState({ modalIsOpen: false }, () => {
      //console.log(this.state.modalIsOpen);
      // //console.log(value);
    });
  }

  handleClickSave() {
    let data = this.props.providedData();
    //console.log("Save");
    //console.log(data);
    //console.log(JSON.stringify(data));

    const options = {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(data),
    };

    fetch("http://localhost:3000/admin", options)
      .then((res) => {
        // //console.log(res.text());
        res.json();
      })
      .then((JSONdata) => {
        //console.log(JSONdata);

        this.setModalIsOpen();
        setTimeout(() => {
          this.setModalIsClose();
        }, 250);
      })
      .catch((err) => console.log(err));
  }

  handleClickAdd() {
    //console.log("Called add from input layout");
    let createdData = [];
    createdData.push(`${this.state.lastRowNo + 1}`);
    createdData.push(this["inputName"].current.value);
    createdData.push(this["inputEmail"].current.value);
    createdData.push(this["inputSubName"].current.value);
    createdData.push(this["inputSubCode"].current.value);
    createdData.push(this["inputCollege"].current.getselectedText());
    createdData.push(this["inputBranch"].current.getselectedText());
    createdData.push(this["inputSem"].current.getselectedText());
    // if (
    //   this["inputTheory"].current.getIsChecked() &&
    //   this["inputPractical"].current.getIsChecked()
    // )
    //   createdData.push("Both");
    // else if (this["inputTheory"].current.getIsChecked())
    //   createdData.push("Theory");
    // else if (this["inputPractical"].current.getIsChecked())
    //   createdData.push("Practical");

    this.setState((prevState) => {
      return { lastRowNo: prevState.lastRowNo + 1 };
    });

    // Add Row
    this.props.addRow(createdData);
  }

  rowDeleted() {
    this.setState((prevState, props) => {
      return {
        lastRowNo: prevState.lastRowNo - 1,
      };
    });
  }

  render() {
    return (
      <div className="inputLayout">
        <label id={"labelName"}>Name</label>
        <input type="text" id={"inputName"} ref={this["inputName"]} />
        <label id={"labelEmail"}>Email</label>
        <input type="text" id={"inputEmail"} ref={this["inputEmail"]} />
        <label id={"labelSubName"}>Subject Name</label>
        <input type="text" id={"inputSubName"} ref={this["inputSubName"]} />
        <label id={"labelSubCode"}>Subject Code</label>
        <input type="text" id={"inputSubCode"} ref={this["inputSubCode"]} />
        <label id={"labelCollege"}>College</label>
        <Select
          id={"inputCollege"}
          optionList={collegeList}
          ref={this["inputCollege"]}
        />
        <label id={"labelBranch"}>Branch</label>
        <Select
          id={"inputBranch"}
          optionList={branchList}
          ref={this["inputBranch"]}
        />
        <label id={"labelSem"}>Semester</label>
        <Select id={"inputSem"} optionList={semList} ref={this["inputSem"]} />
        {/* <div id={"checkboxTheory"}>
          <Checkbox id={"inputTheory"} ref={this["inputTheory"]} />
          <label id={"labelTheory"}>Theory</label>
        </div>
        <div id={"checkboxPractical"}>
          <Checkbox id={"inputPractical"} ref={this["inputPractical"]} />
          <label id={"labelPractical"}>Practical</label>
        </div> */}
        <button
          id={"buttonAdd"}
          ref={this["buttonAdd"]}
          onClick={this.handleClickAdd}
        >
          Add
        </button>
        <button
          id={"buttonSave"}
          ref={this["buttonSave"]}
          onClick={this.handleClickSave}
        >
          Save
        </button>
        <Modal
          isOpen={this.state.modalIsOpen}
          shouldCloseOnOverlayClick={false}
          onRequestClose={this.setModalIsClose}
          className={"modal modalSave"}
        >
          <h2>Saved</h2>
        </Modal>
      </div>
    );
  }
}

export default InputLayout;
