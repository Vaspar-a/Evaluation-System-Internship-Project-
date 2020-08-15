import React, { Component } from "react";

class Tbody extends Component {
  constructor(props) {
    super(props);

    // Get total rows and columns
    this.rowLength = this.props.data.length;
    this.colLength = this.props.data[0] !== undefined ? this.props.data[0].length : 4;

    // Bind Functions
    this.getTrElements = this.getTrElements.bind(this);
    this.getTdElements = this.getTdElements.bind(this);
    this.handleKeyPressDown = this.handleKeyPressDown.bind(this);
    this.down_key = this.down_key.bind(this);
    this.up_key = this.up_key.bind(this);
    this.left_key = this.left_key.bind(this);
    this.right_key = this.right_key.bind(this);
    this.filterRows = this.filterRows.bind(this);
    this.reRender = this.reRender.bind(this);
    this.showHideCol = this.showHideCol.bind(this);

    this.data = this.props.data;
    this.receivedData = [];
    this.filter = false;

    // Create Refs
    this.props.data.forEach((ele, i) => {
      //let rowId = `r${i}`;
      this[`r${i}`] = React.createRef();

      ele.forEach((e, j) => {
        //let colId = rowId + `c${j}`;
        this[`r${i}c${j}`] = React.createRef();
        this[`r${i}c${j}i${j}`] = React.createRef();
      });
    });

    // Create State
    this.state = {
      trArray: this.getTrElements(),
    };
  }

  reRender(rData) {
    this.data = rData;
    
    this.data.forEach((ele, i) => {
      //let rowId = `r${i}`;
      this[`r${i}`] = React.createRef();

      ele.forEach((e, j) => {
        //let colId = rowId + `c${j}`;
        this[`r${i}c${j}`] = React.createRef();
        this[`r${i}c${j}i${j}`] = React.createRef();

        // this[`r${i}c${j}`].current.style.display = "table-cell";
      });
    });

    this.rowLength = this.data.length;
    this.colLength = this.data[0].length;
    
    this.setState({
      trArray: this.getTrElements(),
    });
  }

  // Generate Td Elements
  getTdElements(rowId, ele) {
    let tdArray = ele.map((e, j) => {
      let colId = rowId + `c${j}`;
      let inputId = rowId + `c${j}i${j}`;
      
      //console.log(e);
      return (
        <td id={colId} key={colId} ref={this[colId]}>
          <input
            type="text"
            id={inputId}
            ref={this[inputId]}
            onKeyDown={this.handleKeyPressDown}
            value={e}
          />         
        </td>
      );
    });
    
    return tdArray;
  }

  // Generate Tr Elements
  getTrElements() {
    // When data is loaded
    let trArray = this.data.map((ele, i) => {
      let rowId = `r${i}`;
      ele[0] = i + 1;
      return (
        <tr id={rowId} key={rowId} ref={this[rowId]}>
          {this.getTdElements(rowId, ele)}
        </tr>
      );
    });

    return trArray;
  }

  // onKeyPressDown with ctrl
  handleKeyPressDown(event) {
    let currentId = event.target.id;
    let rowId = event.target.parentNode.parentNode.id.slice(1);
    let keyCode = parseInt(event.keyCode, 10);
    //console.log(event.keyCode);
    if (event.ctrlKey && keyCode === 37) {
      // left
      let col_no = this.left_key(this.colLength, currentId.slice(-1));
      let newId = "r" + rowId + "c" + col_no + "i" + col_no;
      //console.log(newId);
      //console.log(this[newId]);
      this[newId].current.focus();
    } else if (event.ctrlKey && keyCode === 38) {
      // up
      let row_no = this.up_key(this.rowLength, rowId);
      let newId =
        "r" + row_no + "c" + currentId.slice(-1) + "i" + currentId.slice(-1);
      //console.log(newId);
      this[newId].current.focus();
    } else if (event.ctrlKey && keyCode === 39) {
      // right
      let col_no = this.right_key(this.colLength, currentId.slice(-1));
      let newId = "r" + rowId + "c" + col_no + "i" + col_no;
      //console.log(newId);
      this[newId].current.focus();
    } else if (event.ctrlKey && keyCode === 40) {
      // down
      let row_no = this.down_key(this.rowLength, rowId);
      let newId =
        "r" + row_no + "c" + currentId.slice(-1) + "i" + currentId.slice(-1);
      //console.log(newId);
      this[newId].current.focus();
    }
  }

  // Formula when ctrl + upArrow is pressed
  up_key(total_rows, row_no) {
    row_no = parseInt(row_no, 10);
    let new_row_no = (total_rows + (row_no - 1)) % total_rows;
    return new_row_no;
  }

  // Formula when ctrl + downArrow is pressed
  down_key(total_rows, row_no) {
    row_no = parseInt(row_no, 10);
    let new_row_no = (total_rows + (row_no + 1)) % total_rows;
    return new_row_no;
  }

  // Formula when ctrl + leftArrow is pressed
  left_key(total_cols, col_no) {
    col_no = parseInt(col_no, 10);
    let new_col_no = (total_cols + (col_no - 1)) % total_cols;
    return new_col_no;
  }

  // Formula when ctrl + rightArrow is pressed
  right_key(total_cols, col_no) {
    col_no = parseInt(col_no, 10);
    let new_col_no = (total_cols + (col_no + 1)) % total_cols;
    return new_col_no;
  }

  render() {
    return <tbody>{this.state.trArray}</tbody>;
  }

  // Filter Rows
  filterRows(receivedData) {
    let flag = false;
    let result = [];
    //console.log(receivedData);
    if (receivedData === undefined) {
      receivedData = {};
      receivedData["data"] = this.receivedData;
      receivedData["filter"] = this.filter;
    }
    if (receivedData["filter"]) {
      this.filter = true;
      this.receivedData = receivedData["data"];
      result = [...this.data];
      result = result.filter((ele, index) => {
        for (let i = 0; i < receivedData["data"].length; i++) {
          //console.log(receivedData["data"][i].toString());
          if (
            receivedData["data"][i].trim() !== "" &&
            receivedData["data"][i].trim().toLowerCase() === ele[i].toString().trim().toLowerCase()
          ) {
            flag = true;
          } else if (
            receivedData["data"][i].trim() !== "" &&
            receivedData["data"][i].trim().toLowerCase() !== ele[i].toString().trim().toLowerCase()
          ) {
            flag = false;
            break;
          }
        }

        //console.log("Result flag: " + flag);
        if (flag) {
          return ele;
        }
      });

      //console.log(result);

      if (result.length !== 0) {
        let trArray = result.map((ele, i) => {
          let rowId = `r${i}`;
          return (
            <tr id={rowId} key={rowId} ref={this[rowId]}>
              {this.getTdElements(rowId, ele)}
            </tr>
          );
        });

        this.rowLength = result.length;
        this.setState(
          {
            trArray: trArray,
          },
          () => {
            let rowId = result.length - 1;
            //console.log(`r${rowId}c${0}i${0}`);
            this[`r${rowId}c${0}i${0}`].current.focus();
          }
        );
      }
    } else {
      this.filter = false;
      this.rowLength = this.data.length;
      this.setState({
        trArray: this.getTrElements(),
      });
    }

  }
  
  showHideCol(id, isChecked, showHideColOfThead) {
    //console.log(id);
    //console.log(isChecked);
    //console.log(showHideColOfThead);
    
    if(!isChecked) {
      this.data.forEach((element, index) => {
        let colId = `r${index}c${id}`;
        this[colId].current.style.display = "none";
        showHideColOfThead(id, "none");
        //console.log(this[colId].current.style.display);
      });
    } else {
      this.data.forEach((element, index) => {
        let colId = `r${index}c${id}`;
        this[colId].current.style.display = "table-cell";
        showHideColOfThead(id, "table-cell");
        //console.log(this[colId].current.style.display);
      });
    }
    

  }
}

export default Tbody;
