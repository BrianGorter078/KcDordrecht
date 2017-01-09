import React, { Component } from 'react';
import  { Card }  from 'native-base';

class ClubbladCard extends Component {
    constructor(props){
        super(props)
    }

    render(){
        if(this.props.onDevice){
        return (
            <Card> 
                {this.props.children}
            </Card>
        );
        }

        return (
            <Card> 
                {this.props.children}
            </Card>

        );
    }
}


export default Card