import React from 'react';
import { View } from 'react-native';

const CardSection = (props) => {
    return (
        <View style={styles.containerStyle}> 
            {props.children}
        </View>
    );
}

const styles = {
    containerStyle: {
        padding: 5,
        backgroundColor: '#4285f4',
        justifyContent: 'center',
        flexDirection: 'row',
        borderColor: '#ddd',
        position: 'relative'
    }
};

export default CardSection;