import React, { Component } from 'react';
import { CardItem } from 'native-base';

class CardSection extends Component {
    render(){

        return (
            <CardItem style={styles.containerOnDevice} header> 
                {this.props.children}
            </CardItem>
        );
    }
}

const styles = {
    containerOnDevice: {
        backgroundColor: '#4285f4',
        justifyContent: 'center',
        borderColor: '#ddd',
        position: 'relative',      
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#4285f4',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1
    }
};

export default CardSection;