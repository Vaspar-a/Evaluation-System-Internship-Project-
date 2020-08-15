import React, { Component } from "react";
import Select from "./Select/Select";
import Modal from "react-modal";
import "./inputLayout.css";

Modal.setAppElement("#root");

const collegeList = [];
const branchList = [];
const semList = ["1", "2", "3", "4", "5", "6", "7", "8"];
const subList = [];
const subTypeList = ["Theory", "Practical"];

class InputLayout extends Component {
  constructor(props) {
    super(props);

    this.handleClickSave = this.handleClickSave.bind(this);
    this.provideEndPoint = this.provideEndPoint.bind(this);
    this.getDB = this.getDB.bind(this);
    this.reRender = this.reRender.bind(this);
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

    this.pedWeightage = [];

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

  reRender(pedWeightage) {
    this.pedWeightage = pedWeightage;
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
      data._id = endpoint[0];
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

      fetch(`http://localhost:3000/evaluate/${endpoint[0]}`, options)
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

    const subject = sub.replace(' | ', '_');
    //console.log(subject);

    if (
      college !== "" &&
      branch !== "" &&
      sem !== "" &&
      subject !== "" &&
      subType !== ""
    ) {
      return [`${college}_${branch}_${sem}_${subject}_${subType}`,`${college}_${branch}_${sem}`];
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
          optionList={collegeList}
          getDB={this.getDB}
          ref={this["inputCollegeResult"]}
        />
        <label id={"labelBranchResult"}>Branch</label>
        <Select
          id={"inputBranchResult"}
          optionList={branchList}
          getDB={this.getDB}
          ref={this["inputBranchResult"]}
        />
        <label id={"labelSemResult"}>Semester</label>
        <Select id={"inputSemResult"} optionList={semList} ref={this["inputSemResult"]} getDB={this.getDB} />
        <label id={"labelSubResult"}>Subject</label>
        <Select id={"inputSubResult"} optionList={subList} ref={this["inputSubResult"]} getDB={this.getDB} />
        <label id={"labelSubTypeResult"}>Sub Type</label>
        <Select id={"inputSubTypeResult"} optionList={subTypeList} ref={this["inputSubTypeResult"]} getDB={this.getDB} />
        <button id={'buttonSaveResult'} onClick={this.handleClickSave}>Save</button>
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
