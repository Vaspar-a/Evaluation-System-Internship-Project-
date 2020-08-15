import React, { Component } from 'react';
import Td from './Td/Td';

class Tr extends Component {
    // constructor(props) {
    //     super(props);

    // }

    render() {

        let tdArray = [];
        for(let i=0; i<8; i++){
            let tdElement = <Td id={`${this.props.id}c${i}`} ref={`${this.props.id}c${i}`} />;
            tdArray.push(tdElement);
        }

        return (
            <tr id={`${this.props.id}`}>
                {tdArray}
            </tr>

        );
    }
}

export default Tr;