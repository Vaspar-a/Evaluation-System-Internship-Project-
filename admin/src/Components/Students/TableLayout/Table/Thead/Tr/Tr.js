import React, { Component } from 'react';
import Th from './Th/Th';

const heading = ['Sr. No.', 'Id', 'Name'];

class Tr extends Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {

        let thArray = heading.map( (ele, i) => {
           return  (<Th name={ele} key={`h${i}`} id={`h${i}`} />);
        });
        

        return (
            <tr>
                {thArray}
            </tr>

        );
    }
}

export default Tr;