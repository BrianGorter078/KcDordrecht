import React from 'react';
import { Text, View } from 'react-native';

const Header = (props) => {
    const { textStyle, viewStyle } = styles;

    return (
        <View style={viewStyle}>
            <Text style={textStyle}> {props.headerText} </Text>
        </View>
    );
}

const styles = {
    
    viewStyle: {
        backgroundColor: '#4285f4',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20, 
        height: 60,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2},
        shadowOpacity: 0.1
    },

    textStyle: {
        color: 'white',
        fontSize: 20
    }
}

export default Header; 
