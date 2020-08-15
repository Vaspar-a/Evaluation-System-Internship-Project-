import React, { Component } from "react";
import Tr from "./Tr/Tr";
import Checkbox from "./CheckBox/Checkbox";
import Modal from "react-modal";

Modal.setAppElement("#root");


class Thead extends Component {
  constructor(props) {
    super(props);

    this["tr"] = React.createRef();

    this.reRender = this.reRender.bind(this);
    this.setModalIsOpen = this.setModalIsOpen.bind(this);
    this.setModalIsClose = this.setModalIsClose.bind(this);
    this.getFilterElements = this.getFilterElements.bind(this);
    this.showHideCol = this.showHideCol.bind(this);
    this.changeIsChecked = this.changeIsChecked.bind(this);

    this.theadData = ["Sr. No.", "Id", "Name"];
    this.isChecked = [true, true, true];

    this.state = {
      modalIsOpen: false,
    };
  }

  changeIsChecked(id) {
    this.isChecked[parseInt(id)] = !this.isChecked[parseInt(id)];
    //console.log(this.isChecked);
  }
  
  showHideCol(id, isChecked) {
    this.props.showHideCol(id, isChecked, this["tr"].current.showHideCol);
  }  

  setModalIsOpen() {
    this.setState({ modalIsOpen: true }, () => {
      //console.log(this.state.modalIsOpen);
      //console.log(value);
    });
  }

  setModalIsClose() {
    // event.stopPropagation();
    this.setState({ modalIsOpen: false }, () => {
      //console.log(this.state.modalIsOpen);
      // //console.log(value);
    });
  }

  reRender(theadData) {
    this.theadData = ["Sr. No.", "Id", "Name"];
    this.theadData = this.theadData.concat(theadData);
    this.isChecked = [];
    this.theadData.forEach(element => {
      this.isChecked.push(true);
    });
    this["tr"].current.reRender(theadData);
  }

  getFilterElements() {
    let result = this.theadData.map((ele, index) => {
      //console.log(ele);
    return ( 
      <div className={'field modalResultField'}>
        <p className={'filterPara'} id={`p${index}`} ref={this[`p${index}`]} >{ele}</p> 
        <Checkbox className={'filterInput'} id={`cb${index}`} ref={this[`cb${index}`]} changeIsChecked={this.changeIsChecked} isChecked={this.isChecked[index]} showHideCol={this.showHideCol} />
      </div> 
      );
    });

    //console.log(result);
    return result;
  }
  // filterRowsInThead(receivedData){
  //     this.props.filterRowsFromTbody(receivedData);
  // }

  render() {
    return (
      <thead>
        <Tr ref={this["tr"]} setModalIsOpen={this.setModalIsOpen} />
        <Modal
            isOpen={this.state.modalIsOpen}
            shouldCloseOnOverlayClick={false}
            onRequestClose={this.setModalIsClose}
            className={"modal modalResult"}
          >
            <h2>Show/Hide</h2>
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
            <div class={"inputContainer modalResultInputContainer"}>
              {this.getFilterElements()}
            </div>
          </Modal>
      </thead>
    );
  }
}

export default Thead;
