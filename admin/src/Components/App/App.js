import React from "react";
import AdminHome from "../AdminHome/AdminHome";
import EvaluatorHome from "../EvaluatorHome/EvaluatorHome";
import HomePage from "../HomePage/HomePage";

require("dotenv").config();

class App extends React.Component {
  constructor(props) {
    super(props);

    this.onSuccess = this.onSuccess.bind(this);
    this.onFailure = this.onFailure.bind(this);
    
    this.state = {
      mainElement: <HomePage onSuccess={this.onSuccess} onFailure={this.onFailure} />,
    };
  }

  onSuccess(success) {
    //console.log(success);
    //console.log(success.profileObj);

    if(success.profileObj.email === process.env.REACT_APP_ADMIN_ID) {
      //console.log('admin');
      this.setState({
        mainElement: <AdminHome email={success.profileObj.email}/>,
      });
    }
    else {
      //console.log('evaluator');
      this.setState({
        mainElement: <EvaluatorHome email={success.profileObj.email}/>,
      });
  }
  }

  onFailure(failure) {
    //console.log(failure);
  }
  
  render() {
    
    return (
        this.state.mainElement    
    );
  }
}

export default App;
