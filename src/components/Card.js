import React from 'react';
import { View } from 'react-native';

const Card = (props) => {

    return (
        <View style={styles.containerStyle}> 
            {props.children}
        </View>
    );
};

const styles = {
    containerStyle: {
        backgroundColor:'#4285f4',
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#4285f4',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
        marginLeft: 20,
        marginRight: 20,
        padding: 10,
        marginTop: 15
    }
};

export default Card