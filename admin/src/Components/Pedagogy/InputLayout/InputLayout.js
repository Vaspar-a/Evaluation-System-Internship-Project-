import React, { Component } from "react";
import Select from "./Select/Select";
import Modal from "react-modal";
import "./inputLayout.css";

Modal.setAppElement("#root");

const collegeList = [];
const branchList = [];
const semList = [];
const subList = [];
const subTypeList = ["Theory", "Practical"];

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
    this.setSubjects = this.setSubjects.bind(this);

    this["inputComponentName"] = React.createRef();
    this["inputMarks"] = React.createRef();
    this["inputWeightage"] = React.createRef();
    this["inputCollegePedagogy"] = React.createRef();
    this["inputBranchPedagogy"] = React.createRef();
    this["inputSemPedagogy"] = React.createRef();
    this["inputSubPedagogy"] = React.createRef();
    this["inputSubTypePedagogy"] = React.createRef();
    this["buttonAdd"] = React.createRef();
    this["buttonSave"] = React.createRef();

    this.state = {
      lastRowNo: this.props.lastRowNo,
      modalIsOpen: false,
      collegeList: collegeList,
      branchList: branchList,
      semList: semList,
      subList: subList,
    };
  }

  setSubjects(colList, brList, semesList, subjList) {
    
    this.setState(
      {
        collegeList: colList,
        branchList: brList,
        semList: semesList,
        subList: subjList,
      },
      () => {
        //console.log(this.state.collegeList);
        //console.log(this.state.branchList);
        //console.log(this.state.semList);
        //console.log(this.state.subList);
        this["inputCollegePedagogy"].current.setOptionList(this.state.collegeList);
        this["inputBranchPedagogy"].current.setOptionList(this.state.branchList);
        this["inputSemPedagogy"].current.setOptionList(this.state.semList);
        this["inputSubPedagogy"].current.setOptionList(this.state.subList);
      }
    );
  }

  componentDidMount() {
    this.props.getSubject(this.setSubjects, this.props.email);
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
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(data),
      };

      fetch(`http://localhost:3000/pedagogy/${endpoint}`, options)
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
    createdData.push(this["inputComponentName"].current.value);
    createdData.push(this["inputMarks"].current.value);
    createdData.push(this["inputWeightage"].current.value);

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
    const college = this["inputCollegePedagogy"].current.getselectedText();
    const branch = this["inputBranchPedagogy"].current.getselectedText();
    const sem = this["inputSemPedagogy"].current.getselectedText();
    const sub = this["inputSubPedagogy"].current.getselectedText();
    // const subName = this["inputSemStu"].current.getselectedText();
    const subType = this["inputSubTypePedagogy"].current.getselectedText();

    const subject = sub.replace(' | ', '_');
    //console.log(subject);

    if (
      college !== "" &&
      branch !== "" &&
      sem !== "" &&
      subject !== "" &&
      subType !== ""
    ) {
      return `${college}_${branch}_${sem}_${subject}_${subType}`;
    }
    return "";
  }

  getDB() {
    this.props.getDB();
  }

  render() {
    return (
      <div className="inputLayoutPedagogy">
        <label id={"labelComponentName"}>Component Name</label>
        <input
          type="text"
          id={"inputComponentName"}
          ref={this["inputComponentName"]}
        />
        <label id={"labelMarks"}>Marks</label>
        <input type="text" id={"inputMarks"} ref={this["inputMarks"]} />
        <label id={"labelWeightage"}>Weightage</label>
        <input type="text" id={"inputWeightage"} ref={this["inputWeightage"]} />
        <label id={"labelCollegePedagogy"}>College</label>
        <Select
          id={"inputCollegePedagogy"}
          getDB={this.getDB}
          optionList={collegeList}
          ref={this["inputCollegePedagogy"]}
        />
        <label id={"labelBranchPedagogy"}>Branch</label>
        <Select
          id={"inputBranchPedagogy"}
          getDB={this.getDB}
          optionList={branchList}
          ref={this["inputBranchPedagogy"]}
        />
        <label id={"labelSemPedagogy"}>Semester</label>
        <Select
          id={"inputSemPedagogy"}
          optionList={semList}
          ref={this["inputSemPedagogy"]}
          getDB={this.getDB}
        />
        <label id={"labelSubPedagogy"}>Subject</label>
        <Select
          id={"inputSubPedagogy"}
          optionList={subList}
          ref={this["inputSubPedagogy"]}
          getDB={this.getDB}
        />
        <label id={"labelSubTypePedagogy"}>Subject Type</label>
        <Select
          id={"inputSubTypePedagogy"}
          optionList={subTypeList}
          ref={this["inputSubTypePedagogy"]}
          getDB={this.getDB}
        />

        <button
          id={"buttonAdd"}
          ref={this["buttonAdd"]}
          onClick={this.handleClickAdd}
        >
          Add
        </button>
        <button
          id={"buttonSave"}
          onClick={this.handleClickSave}
          ref={this["buttonSave"]}
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
