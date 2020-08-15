import React from "react";
import EvaluatorHeader from "../EvaluatorHeader/EvaluatorHeader";
import Pedagogy from "../Pedagogy/Pedagogy";
import Evaluate from "../Evaluate/Evaluate";
import EvaluatorResult from "../EvaluatorResult/EvaluatorResult";
import SignOut from "../SignOut/SignOut";

class EvaluatorHome extends React.Component {
  constructor(props) {
    super(props);

    this.pedagogyClicked = this.pedagogyClicked.bind(this);
    this.evaluateClicked = this.evaluateClicked.bind(this);
    this.resultClicked = this.resultClicked.bind(this);
    this.signOutClicked = this.signOutClicked.bind(this);
    this.setMainElement = this.setMainElement.bind(this);

    this.setOfProps = {
      pedagogyClicked: this.pedagogyClicked,
      evaluateClicked: this.evaluateClicked,
      resultClicked: this.resultClicked,
      signOutClicked: this.signOutClicked,
      setMainElement: this.setMainElement,
    }

    this.pedagogy =  true;
    this.evaluate =  false;
    this.result = false;
    this.signOut = false;

    this["header"] = React.createRef();
    // this["pedagogy"] = React.createRef();
    // this["evaluate"] = React.createRef();
    // this["result"] = React.createRef();
    // this["signOut"] = React.createRef();

    this.state = {
      mainElement: <Pedagogy email={this.props.email}/>,
    };
  }

  pedagogyClicked() {
      this.pedagogy = true;
      this.evaluate = false;
      this.result = false;
      this.signOut = false;
  }

  evaluateClicked() {
    this.pedagogy = false;
      this.evaluate = true;
      this.result = false;
      this.signOut = false;
  }

  resultClicked() {
    this.pedagogy = false;
      this.evaluate = false;
      this.result = true;
      this.signOut = false;
  }

  signOutClicked() {
    this.pedagogy = false;
      this.evaluate = false;
      this.result = false;
      this.signOut = true;
  }
  
  setMainElement() {
    let mainElement;
    //console.log('From setMainElement() of class App');
    
    if(this.pedagogy){
      mainElement = <Pedagogy email={this.props.email}/>
    }
    else if(this.evaluate){
      mainElement = <Evaluate email={this.props.email}/>
    }
    else if(this.result){
      mainElement = <EvaluatorResult email={this.props.email}/>
    }
    else if(this.signOut){
      mainElement = <SignOut />
    }

    this.setState({
      mainElement: mainElement,
    }, () => {/*console.log('Main Element' + this.state.mainElement)*/});
  }

  render() {
    return (
      <div>
        {!this.signOut ? <EvaluatorHeader ref={this["header"]} setOfProps={this.setOfProps}/> : null}
        {
          this.state.mainElement 
        }
      </div>
    );
  }
}

export default EvaluatorHome;
