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
    this.provideEndPoint = this.provideEndPoint.bind(this);
    this.getDB = this.getDB.bind(this);
    this.reRender = this.reRender.bind(this);
    this.setModalIsOpen = this.setModalIsOpen.bind(this);
    this.setModalIsClose = this.setModalIsClose.bind(this);

    this["inputNameStu"] = React.createRef();
    this["inputIdStu"] = React.createRef();
    this["inputCollegeStu"] = React.createRef();
    this["inputBranchStu"] = React.createRef();
    this["inputSemStu"] = React.createRef();

    this["buttonAddStu"] = React.createRef();
    this["buttonSaveStu"] = React.createRef();

    this.state = {
      lastRowNo: this.props.lastRowNo,
      modalIsOpen: false,
    };
  }
  
  setModalIsOpen() {
    this.setState({ modalIsOpen: true }, () => {
      //console.log("Open");
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
    const endpoint = this.provideEndPoint();
    if (endpoint !== "") {
      data._id = endpoint;
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

      fetch(`http://localhost:3000/student/${endpoint}`, options)
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
  }

  reRender(length) {
    this.setState({
      lastRowNo: length,
    });
  }

  handleClickAdd() {
    //console.log("Called add from input layout");
    let createdData = [];
    createdData.push(`${this.state.lastRowNo + 1}`);
    createdData.push(this["inputIdStu"].current.value);
    createdData.push(this["inputNameStu"].current.value);

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

  provideEndPoint() {
    // //console.log(this["inputCollegeStu"].current.getselectedText());
    // //console.log(this["inputBranchStu"].current.getselectedText());
    // //console.log(this["inputSemStu"].current.getselectedText());
    const college = this["inputCollegeStu"].current.getselectedText();
    const branch = this["inputBranchStu"].current.getselectedText();
    const sem = this["inputSemStu"].current.getselectedText();

    if (college !== "" && branch !== "" && sem !== "") {
      return `${college}_${branch}_${sem}`;
    }
    return "";
  }

  getDB() {
    this.props.getDB();
  }

  render() {
    return (
      <div className="inputLayoutStu">
        <label id={"labelIdStu"}>Id</label>
        <input type="text" id={"inputIdStu"} ref={this["inputIdStu"]} />
        <label id={"labelNameStu"}>Name</label>
        <input type="text" id={"inputNameStu"} ref={this["inputNameStu"]} />
        <label id={"labelCollegeStu"}>College</label>
        <Select
          id={"inputCollegeStu"}
          optionList={collegeList}
          ref={this["inputCollegeStu"]}
          getDB={this.getDB}
        />
        <label id={"labelBranchStu"}>Branch</label>
        <Select
          id={"inputBranchStu"}
          optionList={branchList}
          ref={this["inputBranchStu"]}
          getDB={this.getDB}
        />
        <label id={"labelSemStu"}>Semester</label>
        <Select
          id={"inputSemStu"}
          optionList={semList}
          ref={this["inputSemStu"]}
          getDB={this.getDB}
        />
        <button
          id={"buttonAddStu"}
          ref={this["buttonAddStu"]}
          onClick={this.handleClickAdd}
        >
          Add
        </button>
        <button id={"buttonSaveStu"} onClick={this.handleClickSave} ref={this["buttonSaveStu"]}>
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
