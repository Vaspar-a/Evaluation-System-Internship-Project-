import React, { Component } from "react";
import Select from "./Select/Select";
import Modal from "react-modal";
import jspdf from "jspdf";
import autoTable from "jspdf-autotable";
import "./inputLayout.css";

Modal.setAppElement("#root");

const collegeList = ["CSPIT", "DEPSTAR"];
const branchList = ["CSE", "CE", "IT", "EC", "EE", "ME", "CL"];
const semList = ["1", "2", "3", "4", "5", "6", "7", "8"];
const subList = ["IT146.01 | CO", "CE246 | OS", "MA343 | Maths"];
const subTypeList = ["Theory", "Practical"];

class InputLayout extends Component {
  constructor(props) {
    super(props);

    this.handleClickDownload = this.handleClickDownload.bind(this);
    this.provideEndPoint = this.provideEndPoint.bind(this);
    this.getDB = this.getDB.bind(this);
    this.getSubject = this.getSubject.bind(this);
    this.setModalIsOpen = this.setModalIsOpen.bind(this);
    this.setModalIsClose = this.setModalIsClose.bind(this);
    this.setSubjects = this.setSubjects.bind(this);

    this["inputNameStu"] = React.createRef();
    this["inputIdStu"] = React.createRef();
    this["inputCollegeResult"] = React.createRef();
    this["inputBranchResult"] = React.createRef();
    this["inputSemResult"] = React.createRef();
    this["inputSubResult"] = React.createRef();
    this["inputSubTypeResult"] = React.createRef();

    this.state = {
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
        this["inputCollegeResult"].current.setOptionList(this.state.collegeList);
        this["inputBranchResult"].current.setOptionList(this.state.branchList);
        this["inputSemResult"].current.setOptionList(this.state.semList);
        this["inputSubResult"].current.setOptionList(this.state.subList);
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

  handleClickDownload() {
    //console.log("Download");
    let header = ['Sr. No.', 'Id', 'Name'];
    const college = this["inputCollegeResult"].current.getselectedText();
    const branch = this["inputBranchResult"].current.getselectedText();
    const sem = this["inputSemResult"].current.getselectedText();
    const sub = this["inputSubResult"].current.getselectedText();
    const tableData = this.props.getTableData();
    header = header.concat(tableData[0]);
    
    const doc = new jspdf();
    doc.text(`${college} ${branch} ${sem} ${sub}`, doc.internal.pageSize.getWidth() / 2, 10, 'center' );
    autoTable(doc, {
      head: [header],
      body: tableData[1],
      startY: 20
    });
    doc.save(`${college} ${branch} ${sem} ${sub}.pdf`);
  }

  getSubject() {
    return this["inputSubResult"].current.getselectedText();
  }

  provideEndPoint() {
    // //console.log(this["inputCollegeStu"].current.getselectedText());
    // //console.log(this["inputBranchStu"].current.getselectedText());
    // //console.log(this["inputSemStu"].current.getselectedText());
    const college = this["inputCollegeResult"].current.getselectedText();
    const branch = this["inputBranchResult"].current.getselectedText();
    const sem = this["inputSemResult"].current.getselectedText();
    const sub = this["inputSubResult"].current.getselectedText();
    // const subName = this["inputSemStu"].current.getselectedText();
    const subType = this["inputSubTypeResult"].current.getselectedText();

    const subject = sub.replace(" | ", "_");
    //console.log(subject);

    if (
      college !== "" &&
      branch !== "" &&
      sem !== "" &&
      subject !== "" &&
      subType !== ""
    ) {
      return [
        `${college}_${branch}_${sem}_${subject}_${subType}`,
        `${college}_${branch}_${sem}`,
      ];
    }
    return "";
  }

  getDB() {
    this.props.getDB();
  }

  render() {
    return (
      <div className="inputLayoutResult">
        <label id={"labelCollegeResult"}>College</label>
        <Select
          id={"inputCollegeResult"}
          optionList={this.state.collegeList}
          getDB={this.getDB}
          ref={this["inputCollegeResult"]}
        />
        <label id={"labelBranchResult"}>Branch</label>
        <Select
          id={"inputBranchResult"}
          optionList={this.state.branchList}
          getDB={this.getDB}
          ref={this["inputBranchResult"]}
        />
        <label id={"labelSemResult"}>Semester</label>
        <Select
          id={"inputSemResult"}
          getDB={this.getDB}
          optionList={this.state.semList}
          ref={this["inputSemResult"]}
        />
        <label id={"labelSubResult"}>Subject</label>
        <Select
          id={"inputSubResult"}
          getDB={this.getDB}
          optionList={this.state.subList}
          ref={this["inputSubResult"]}
        />
        <label id={"labelSubTypeResult"}>Sub Type</label>
        <Select
          id={"inputSubTypeResult"}
          getDB={this.getDB}
          optionList={subTypeList}
          ref={this["inputSubTypeResult"]}
        />
        <button id={"buttonDwnldResult"} onClick={this.handleClickDownload}>
          Download
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
