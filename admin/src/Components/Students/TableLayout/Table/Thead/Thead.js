import React, { Component } from 'react';
import Tr from './Tr/Tr';

class Thead extends Component {
    // constructor(props) {
    //     super(props);
    // }

    // filterRowsInThead(receivedData){
    //     this.props.filterRowsFromTbody(receivedData);
    // }

    render() {
        return (
            <thead>
                <Tr />
            </thead>
        );
    }
}

export default Thead;