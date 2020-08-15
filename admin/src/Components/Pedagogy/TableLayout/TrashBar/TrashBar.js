import React, { Component } from "react";
import Modal from "react-modal";
import "./TrashBar.css";

class TrashBar extends Component {
  constructor(props) {
    super(props);

    this.getTrashCanArray = this.getTrashCanArray.bind(this);
    this.getSVG = this.getSVG.bind(this);
    this.handleOnClickDelete = this.handleOnClickDelete.bind(this);
    this.deleteTrashCan = this.deleteTrashCan.bind(this);
    this.addTrashCan = this.addTrashCan.bind(this);
    this.filterTrashCan = this.filterTrashCan.bind(this);
    this.setModalIsOpen = this.setModalIsOpen.bind(this);
    this.setModalIsClose = this.setModalIsClose.bind(this);
    this.reRender = this.reRender.bind(this);

    this.data = this.props.data;
    this.lastTrashCanNo = this.props.data.length - 1;
    this.trashCanClickedIndex = -1;
    this.receivedData = [];
    this.filter = false;

    this.data.forEach((ele, i) => {
      this[`trash${i}`] = React.createRef();
    });

    this.state = {
      trashCanArray: this.getTrashCanArray(),
      modalIsOpen: false,
    };
  }

  setModalIsOpen(event) {
    this.trashCanClickedIndex = event.target.id;
    this.setState({ modalIsOpen: true }, () => {
      //console.log(event.target);
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

  reRender(data) {
    this.data = data;
    this.lastTrashCanNo = this.data.length - 1;
    this.setState({
      trashCanArray: this.getTrashCanArray(),
    })
  }

  handleOnClickDelete(event) {
    //console.log("Delete called");
    //console.log("TrashCanId onDelete: " + this.trashCanClickedIndex);
    let rowNo = parseInt(this.trashCanClickedIndex.slice(5));
    // this.setState({
    //   deleteRow: rowNo,
    // });
    this.setModalIsClose();
    this.deleteTrashCan(rowNo);
    this.props.deleteRow(rowNo);
  }

  getTrashCanArray() {
    // //console.log(this.data);
    let trashCanArray = this.data.map((ele, i) => {
      let trashId = `trash${i}`;
      return (
        <div
          className={`trashCan`}
          id={trashId}
          ref={this[trashId]}
          key={trashId}
          onClick={this.setModalIsOpen}
        >
          {this.getSVG()}
        </div>
      );
    });

    return trashCanArray;
  }

  getSVG() {
    return (
      <svg
        aria-hidden="true"
        focusable="false"
        data-prefix="far"
        data-icon="trash-alt"
        className={`faTrashAlt`}
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
      >
        <path
          fill="currentColor"
          d="M268 416h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12zM432 80h-82.41l-34-56.7A48 48 0 0 0 274.41 0H173.59a48 48 0 0 0-41.16 23.3L98.41 80H16A16 16 0 0 0 0 96v16a16 16 0 0 0 16 16h16v336a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128h16a16 16 0 0 0 16-16V96a16 16 0 0 0-16-16zM171.84 50.91A6 6 0 0 1 177 48h94a6 6 0 0 1 5.15 2.91L293.61 80H154.39zM368 464H80V128h288zm-212-48h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12z"
        ></path>
      </svg>
    );
  }

  render() {
    return (
      <div className={`trashBar`}>
        {this.state.trashCanArray}
        <Modal
          isOpen={this.state.modalIsOpen}
          shouldCloseOnOverlayClick={false}
          onRequestClose={this.setModalIsClose}
          className={"modal"}
        >
          <h2>Delete</h2>
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
          <p>Are you sure to delete the record?</p>
          <button id={"ok"} onClick={this.handleOnClickDelete}>
            OK
          </button>
          <button id={"close"} onClick={this.setModalIsClose}>
            Close
          </button>
        </Modal>
      </div>
    );
  }

  deleteTrashCan(index) {
    if(this.filter){
      index = this.receivedData[index][0] - 1;
    }
    //console.log("From Trash Bar" + index);
    // let data = [...this.data];
    this.data.splice(index, 1);
    //console.log(this.data);
    this.setState((prevState, props) => {
      return {
        trashCanArray: this.getTrashCanArray(),
      };
    });
    this.lastTrashCanNo = this.lastTrashCanNo - 1;
    // delete this[`trash${index}`];

    if(this.filter){
      this.filterTrashCan();
    }
  }

  addTrashCan() {
    let trashId = `trash${this.lastTrashCanNo + 1}`;
    //console.log("TrashId on add: " + trashId);

    this[trashId] = React.createRef();

    let trashCan = (
      <div
        className={`trashCan`}
        id={trashId}
        ref={this[trashId]}
        key={trashId}
        onClick={this.setModalIsOpen}
      >
        {this.getSVG()}
      </div>
    );

    let trashCanArray = [...this.state.trashCanArray];
    trashCanArray.push(trashCan);

    this.setState((prevState, props) => {
      return {
        trashCanArray: trashCanArray,
      };
    });

    this.lastTrashCanNo = this.lastTrashCanNo + 1;

    if(this.filter){
      this.filterTrashCan();
    }
  }

  filterTrashCan(receivedData) {
    //console.log('Filter Trash Can Called');
    
    if (receivedData === undefined) {
      receivedData = {};
      receivedData["data"] = this.receivedData;
      receivedData["filter"] = this.filter;
    }
    if (receivedData["filter"] && receivedData["data"].length !== 0) {
      this.filter = true;
      this.receivedData = receivedData["data"];
      let trashCanArray = receivedData["data"].map((ele, i) => {
        let trashId = `trash${i}`;
        return (
          <div
            className={`trashCan`}
            id={trashId}
            ref={this[trashId]}
            key={trashId}
            onClick={this.setModalIsOpen}
          >
            {this.getSVG()}
          </div>
        );
      });
      this.lastTrashCanNo = receivedData['data'].length - 1;
      this.setState({
        trashCanArray: trashCanArray,
      });
    } else {
      this.filter = false;
      this.lastTrashCanNo = this.data - 1;
      this.setState({
        trashCanArray: this.getTrashCanArray(),
      });
    }

  }
}

export default TrashBar;
