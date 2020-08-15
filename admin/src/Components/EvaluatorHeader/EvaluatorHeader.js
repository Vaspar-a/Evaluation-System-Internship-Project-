import React, { Component } from "react";
import "./header.css";

class EvaluatorHeader extends Component {
  constructor(props) {
    super(props);

    this["pedagogy"] = React.createRef();
    this["evaluate"] = React.createRef();
    this["result"] = React.createRef();
    this["signOut"] = React.createRef();
    this["navLinks"] = React.createRef();

    this.handleOnClickPedagogy = this.handleOnClickPedagogy.bind(this);
    this.handleOnClickEvaluate = this.handleOnClickEvaluate.bind(this);
    this.handleOnClickResult = this.handleOnClickResult.bind(this);
    this.handleOnClickSignOut = this.handleOnClickSignOut.bind(this);
    this.openMenu = this.openMenu.bind(this);
  }

  handleOnClickPedagogy(event) {
    this["pedagogy"].current.classList.add("active");
    this["evaluate"].current.classList.remove("active");
    this["result"].current.classList.remove("active");
    this["signOut"].current.classList.remove("active");

    this.props.setOfProps.pedagogyClicked();
    this.props.setOfProps.setMainElement();

    this.openMenu(event);
  }

  handleOnClickEvaluate(event) {
    this["evaluate"].current.classList.add("active");
    this["pedagogy"].current.classList.remove("active");
    this["result"].current.classList.remove("active");
    this["signOut"].current.classList.remove("active");

    this.props.setOfProps.evaluateClicked();
    this.props.setOfProps.setMainElement();

    this.openMenu(event);
  }

  handleOnClickResult(event) {
    this["result"].current.classList.add("active");
    this["pedagogy"].current.classList.remove("active");
    this["evaluate"].current.classList.remove("active");
    this["signOut"].current.classList.remove("active");

    this.props.setOfProps.resultClicked();
    this.props.setOfProps.setMainElement();

    this.openMenu(event);
  }

  handleOnClickSignOut(event) {
    this["signOut"].current.classList.add("active");
    this["pedagogy"].current.classList.remove("active");
    this["evaluate"].current.classList.remove("active");
    this["result"].current.classList.remove("active");

    this.props.setOfProps.signOutClicked();
    this.props.setOfProps.setMainElement();

    this.openMenu(event);
  }

  openMenu(event) {
    //console.log(event.target);
	this["navLinks"].current.classList.toggle("nav-links-active");
	this["pedagogy"].current.classList.toggle("li-fade");
	this["evaluate"].current.classList.toggle("li-fade");
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
          <div class="stick s1"></div>
          <div class="stick s2"></div>
          <div class="stick s3"></div>
        </div>
        <ul className={"nav-links"} ref={this["navLinks"]}>
          <li
            className={"active"}
            onClick={this.handleOnClickPedagogy}
            ref={this["pedagogy"]}
          >
            Pedagogy
          </li>
          <li onClick={this.handleOnClickEvaluate} ref={this["evaluate"]}>
            Evaluate
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

export default EvaluatorHeader;
