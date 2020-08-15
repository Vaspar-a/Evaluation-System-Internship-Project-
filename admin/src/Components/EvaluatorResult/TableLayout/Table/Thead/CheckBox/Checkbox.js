import React, { Component } from "react";
import "./checkbox.css";

class Checkbox extends Component {
  constructor(props) {
    super(props);

    this.checkboxOnclick = this.checkboxOnclick.bind(this);
    this.getIsChecked = this.getIsChecked.bind(this);

    this.isChecked = this.props.isChecked;
    
    this["line_group"] = React.createRef();
    // this.state = {
    //   isChecked: this.props.isChecked,
    // };
  }

  componentDidMount() {
    //console.log(this.isChecked);
    
    if(this.isChecked) {
      this["line_group"].current.classList.add("line-group-show");
    }
    else {
      this["line_group"].current.classList.remove("line-group-show");
    }
  }

  getIsChecked() {
    return this.isChecked;
  }

  checkboxOnclick(event) {
    let target = event.target;
    //console.log(target.classList);
    
    let line_group;

    if (target.classList[0] === "check") {
      line_group = target.firstElementChild;
    }
    else if(target.classList[0] === 'line-group') {
      line_group = target;
    }
    else if(target.classList[0] === 'line-1' || target.classList[0] === 'line-2') {
      line_group = target.parentNode;
    }

    // this.setState((prevState) => {
    //   line_group.classList.toggle("line-group-show");
    //   return { isChecked: !prevState.isChecked };
    // });
    this.isChecked = !this.isChecked;

    if(this.isChecked) {
      line_group.classList.add("line-group-show");
    }
    else {
      line_group.classList.remove("line-group-show");
    }
    
    //console.log(target.id.slice(2));
    this.props.showHideCol(target.id.slice(2), this.isChecked);
    this.props.changeIsChecked(target.id.slice(2));
  }

  render() {
    return (
      <div className="checkbox filterInput" id={this.props.id} >
        <div className="check" onClick={this.checkboxOnclick} id={this.props.id} >
          <div className="line-group" ref={this["line_group"]} id={this.props.id} >
            <div className="line-1 line1-show" id={this.props.id} ></div>
            <div className="line-2 line2-show" id={this.props.id} ></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Checkbox;
