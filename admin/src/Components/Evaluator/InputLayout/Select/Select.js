import React, { Component } from "react";
import './select.css';

// const listData = ["Option 1", "Option 2", "Option 3", "Option 4", "Option 5"];

class Select extends Component {
  constructor(props) {
    super(props);

    this.selectOnClick = this.selectOnClick.bind(this);
    this.optionsOnClick = this.optionsOnClick.bind(this);
    this.getOptionData = this.getOptionData.bind(this);
    this.getselectedText = this.getselectedText.bind(this);

    this['selectedText'] = React.createRef();

    this.state = {
      optionData: this.getOptionData(),
      selectedText: '',
    };
  }

  getselectedText(){
    return this['selectedText'].current.textContent;
  }

  getOptionData() {
    let list = this.props.optionList.map((ele, index) => {
      return <h5 className="option" key={index}>{ele}</h5>;
    });

    return list;
  }

  selectOnClick(event) {
    let target = event.target;
    //console.log(event.target.classList);
    if(event.target.classList[0] === 'option' ){
        //console.log(true);
        target = target.parentNode.parentNode.parentNode;
    } 
    //console.log('Select');
    const optionsBox = target.lastElementChild;
    const arrow = optionsBox.previousElementSibling;
    const options = optionsBox.firstElementChild;

    options.classList.toggle("show");
    arrow.classList.toggle("arrow-rotate");
    optionsBox.classList.toggle("disable-pointer-events");
  }

  optionsOnClick(event) {
    // //console.log(target);
    
    //console.log('Options');
    const target = event.target;
    const selectText =
      target.parentNode.parentNode.parentNode.firstElementChild;
    selectText.textContent = target.textContent;
    this.setState({
        selectedText: selectText.textContent,
    })
  };

  render() {
    return (
      <div className="select" onClick={this.selectOnClick} id={this.props.id}>
        <p ref={this['selectedText']}></p>

        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="chevron-down"
          className="chevron-down"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path
            fill="currentColor"
            d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"
          ></path>
        </svg>
        <div className="options-box">
          <div className="options" onClick={this.optionsOnClick}>
            {this.state.optionData}
          </div>
        </div>
      </div>
    );
  }
}

export default Select;
