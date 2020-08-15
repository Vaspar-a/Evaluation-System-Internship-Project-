import React, { Component } from "react";
import Modal from "react-modal";
import TrashBar from "./TrashBar/TrashBar";
import Table from "./Table/Table";
import "./TableLayout.css";

Modal.setAppElement("#root");

const heading = [
  "Sr. No.",
  "Name",
  "Email",
  "Sub Name",
  "Sub Code",
  "College",
  "Branch",
  "Sem",
  "Sub Type",
];

class TableLayout extends Component {
  constructor(props) {
    super(props);

    this["trashBar"] = React.createRef();
    this["table"] = React.createRef();
    this["coverUp"] = React.createRef();
    heading.forEach((ele, index) => {
      this[`p${index}`] = React.createRef();
      this[`i${index}`] = React.createRef();
    });

    this.deleteRow = this.deleteRow.bind(this);
    this.addRowInTable = this.addRowInTable.bind(this);
    this.setModalIsOpen = this.setModalIsOpen.bind(this);
    this.setModalIsClose = this.setModalIsClose.bind(this);
    this.getFilterElements = this.getFilterElements.bind(this);
    this.filterRowsTableLayout = this.filterRowsTableLayout.bind(this);
    this.filterTrashCanInTableLayout = this.filterTrashCanInTableLayout.bind(this);
    this.provideData = this.provideData.bind(this);

    this.state = {
      modalIsOpen: false,
      // setModalIsOpen: false,
    };
  }

  // For POST
  provideData() {
    return this["table"].current.provideData();
  }

  getFilterElements() {
    let result = heading.map((ele, index) => {
      //console.log(ele);
      return (
        <div className={"field"} key={`field${index}`}>
          <p className={"filterPara"} id={`p${index}`} ref={this[`p${index}`]}>
            {ele}
          </p>
          <input
            className={"filterInput"}
            type="text"
            id={`i${index}`}
            ref={this[`i${index}`]}
          />
        </div>
      );
    });

    //console.log(result);
    return result;
  }

  deleteRow(rowNo) {
    this["table"].current.deleteRowInTbody(rowNo);
    this.props.rowDeleted();
  }

  // Add Row
  addRowInTable(receivedData) {
    this["table"].current.addRowInTbody(receivedData);
    this["trashBar"].current.addTrashCan();
    //console.log("Cover Up Height: " + this["coverUp"]);
  }

  filterRowsTableLayout(event) {
    let toSendObj = {};
    for (let i = 0; i < heading.length; i++) {
      if (this[`i${i}`].current.value.trim() !== "") {
        toSendObj["filter"] = true;
        break;
      } else {
        toSendObj["filter"] = false;
      }
    }

    toSendObj["data"] = [];
    heading.forEach((ele, index) => {
      toSendObj["data"].push(this[`i${index}`].current.value);
    });
    //console.log(toSendObj);
    this.setModalIsClose(event);
    this["table"].current.filterRowsFromTbody(toSendObj);
  }

  filterTrashCanInTableLayout(receivedData) {
    this["trashBar"].current.filterTrashCan(receivedData);
  }

  setModalIsOpen(event) {
    this.setState({ modalIsOpen: true }, () => {
      //console.log(this.state.modalIsOpen);
      // //console.log(value);
    });
  }

  setModalIsClose(event) {
    event.stopPropagation();
    this.setState({ modalIsOpen: false }, () => {
      //console.log(this.state.modalIsOpen);
      // //console.log(value);
    });
  }

  render() {
    return (
      <div className={`tableLayout`}>
        <div
          className={"coverUp"}
          ref={this["coverUp"]}
          onClick={this.setModalIsOpen}
        >
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="filter"
            className={"filter"}
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            id={this.props.id}
          >
            <path
              id={this.props.id}
              fill="currentColor"
              d="M487.976 0H24.028C2.71 0-8.047 25.866 7.058 40.971L192 225.941V432c0 7.831 3.821 15.17 10.237 19.662l80 55.98C298.02 518.69 320 507.493 320 487.98V225.941l184.947-184.97C520.021 25.896 509.338 0 487.976 0z"
            ></path>
          </svg>
          <Modal
            isOpen={this.state.modalIsOpen}
            shouldCloseOnOverlayClick={false}
            onRequestClose={this.setModalIsClose}
            className={"modal"}
          >
            <h2>Search</h2>
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="times"
              class="svg-inline--fa fa-times fa-w-11"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 352 512"
              onClick={this.setModalIsClose}
            >
              <path
                fill="currentColor"
                d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
              ></path>
            </svg>
            <div class={"inputContainer"}>{this.getFilterElements()}</div>
            <button id={"find"} onClick={this.filterRowsTableLayout}>
              Find
            </button>
            <button id={"save"} onClick={this.setModalIsClose}>
              Close
            </button>
          </Modal>
        </div>
        <TrashBar
          data={this.props.data}
          ref={this["trashBar"]}
          deleteRow={this.deleteRow}
        />
        <Table
          ref={this["table"]}
          data={this.props.data}
          filterTrashCan={this.filterTrashCanInTableLayout}
        />
      </div>
    );
  }
}

export default TableLayout;
