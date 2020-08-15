import React, { Component } from "react";
import "./header.css";

class AdminHeader extends Component {
  constructor(props) {
    super(props);

    this["evaluator"] = React.createRef();
    this["student"] = React.createRef();
    this["result"] = React.createRef();
    this["signOut"] = React.createRef();
    this["navLinks"] = React.createRef();

    this.handleOnClickEvaluator = this.handleOnClickEvaluator.bind(this);
    this.handleOnClickStudent = this.handleOnClickStudent.bind(this);
    this.handleOnClickResult = this.handleOnClickResult.bind(this);
    this.handleOnClickSignOut = this.handleOnClickSignOut.bind(this);
    this.openMenu = this.openMenu.bind(this);
  }

  handleOnClickEvaluator(event) {
    this["evaluator"].current.classList.add("active");
    this["student"].current.classList.remove("active");
    this["result"].current.classList.remove("active");
    this["signOut"].current.classList.remove("active");

    this.props.setOfProps.evaluatorClicked();
    this.props.setOfProps.setMainElement();

    this.openMenu(event);
  }

  handleOnClickStudent(event) {
    this["student"].current.classList.add("active");
    this["evaluator"].current.classList.remove("active");
    this["result"].current.classList.remove("active");
    this["signOut"].current.classList.remove("active");

    this.props.setOfProps.studentsClicked();
    this.props.setOfProps.setMainElement();

    this.openMenu(event);
  }

  handleOnClickResult(event) {
    this["result"].current.classList.add("active");
    this["evaluator"].current.classList.remove("active");
    this["student"].current.classList.remove("active");
    this["signOut"].current.classList.remove("active");

    this.props.setOfProps.resultClicked();
    this.props.setOfProps.setMainElement();

    this.openMenu(event);
  }

  handleOnClickSignOut(event) {
    this["signOut"].current.classList.add("active");
    this["evaluator"].current.classList.remove("active");
    this["student"].current.classList.remove("active");
    this["result"].current.classList.remove("active");

    this.props.setOfProps.signOutClicked();
    this.props.setOfProps.setMainElement();

    this.openMenu(event);
  }

  openMenu(event) {
    //console.log(event.target);
	this["navLinks"].current.classList.toggle("nav-links-active");
	this["evaluator"].current.classList.toggle("li-fade");
	this["student"].current.classList.toggle("li-fade");
	this["result"].current.classList.toggle("li-fade");
	this["signOut"].current.classList.toggle("li-fade");
  }

  render() {
    return (
      <header>
        <nav className={"nav-logo"}>
          <div className={"img"}></div>
          {/* <h3 className="logo-name">Logo</h3> */}
        </nav>
        <div id="menu-bar" onClick={this.openMenu} >
          <div className="stick s1"></div>
          <div className="stick s2"></div>
          <div className="stick s3"></div>
        </div>
        <ul className={"nav-links"} ref={this["navLinks"]}>
          <li
            className={"active"}
            onClick={this.handleOnClickEvaluator}
            ref={this["evaluator"]}
          >
            Evaluator
          </li>
          <li onClick={this.handleOnClickStudent} ref={this["student"]}>
            Student
          </li>
          <li onClick={this.handleOnClickResult} ref={this["result"]}>
            Result
          </li>
          <li onClick={this.handleOnClickSignOut} ref={this["signOut"]}>
            Sign Out
          </li>
        </ul>
      </header>
    );
  }
}

export default AdminHeader;
