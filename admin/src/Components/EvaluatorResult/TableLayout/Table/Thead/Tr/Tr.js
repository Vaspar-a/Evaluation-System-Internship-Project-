import React, { Component } from "react";

const heading = ["Sr. No.", "Id", "Name"];

class Tr extends Component {
  constructor(props) {
    super(props);

    this.reRender = this.reRender.bind(this);
    this.setModalIsOpen = this.setModalIsOpen.bind(this);
    this.showHideCol = this.showHideCol.bind(this);
    
    this.state = {
      heading: heading,
    };

    this.state.heading.forEach((ele, index) => {
        this[`h${index}`] = React.createRef();
    });
  }
  
  showHideCol(id, value) {
    this[`h${id}`].current.style.display = value;
    //console.log(this[`h${id}`]);
    //console.log(value);
  }

  setModalIsOpen() {
      this.props.setModalIsOpen();
  }

  reRender(theadData) {
    this.setState({
      heading: heading.concat(theadData),
    }, () => {
        this.state.heading.forEach((ele, index) => {
            this[`h${index}`] = React.createRef();
        });
    });

    
  }

  render() {
    let thArray = this.state.heading.map((ele, i) => {
      return <th name={ele} key={`h${i}`} id={`h${i}`} ref={this[`h${i}`]} onClick={this.setModalIsOpen} >{ele}</th>;
    });

    return <tr>{thArray}</tr>;
  }
}

export default Tr;
