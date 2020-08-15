import React from "react";
import AdminHeader from "../AdminHeader/AdminHeader";
import Evaluator from "../Evaluator/Evaluator";
import Students from "../Students/Students";
import AdminResult from "../AdminResult/AdminResult";
import SignOut from "../SignOut/SignOut";

class AdminHome extends React.Component {
  constructor(props) {
    super(props);

    this.evaluatorClicked = this.evaluatorClicked.bind(this);
    this.studentsClicked = this.studentsClicked.bind(this);
    this.resultClicked = this.resultClicked.bind(this);
    this.signOutClicked = this.signOutClicked.bind(this);
    this.setMainElement = this.setMainElement.bind(this);

    this.setOfProps = {
      evaluatorClicked: this.evaluatorClicked,
      studentsClicked: this.studentsClicked,
      resultClicked: this.resultClicked,
      signOutClicked: this.signOutClicked,
      setMainElement: this.setMainElement,
    }

    this.evaluator =  true;
    this.students =  false;
    this.result = false;
    this.signOut = false;

    this["header"] = React.createRef();
    // this["evaluator"] = React.createRef();
    // this["students"] = React.createRef();
    // this["result"] = React.createRef();
    // this["signOut"] = React.createRef();

    this.state = {
      mainElement: <Evaluator email={this.props.email}/>,
    };
  }

  evaluatorClicked() {
      this.evaluator = true;
      this.students = false;
      this.result = false;
      this.signOut = false;
  }

  studentsClicked() {
    this.evaluator = false;
      this.students = true;
      this.result = false;
      this.signOut = false;
  }

  resultClicked() {
    this.evaluator = false;
      this.students = false;
      this.result = true;
      this.signOut = false;
  }

  signOutClicked() {
    this.evaluator = false;
      this.students = false;
      this.result = false;
      this.signOut = true;
  }
  
  setMainElement() {
    let mainElement;
    //console.log('From setMainElement() of class App');
    if(this.evaluator){
      mainElement = <Evaluator  email={this.props.email}/>
    }
    else if(this.students){
      mainElement = <Students email={this.props.email}/>
    }
    else if(this.result){
      mainElement = <AdminResult email={this.props.email}/>
    }
    else if(this.signOut){
      mainElement = <SignOut />
    }

    this.setState({
      mainElement: mainElement,
    }, () => {/*console.log('Element' + this.state.mainElement)*/});
  }

  render() {
    
    return (
      <div>
        {!this.signOut ? <AdminHeader ref={this["header"]} setOfProps={this.setOfProps}/> : null}
        {
          this.state.mainElement 
        }
      </div>
    );
  }
}

export default AdminHome;
