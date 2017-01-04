import React, { Component } from 'react';
import { Text, View, Button, Image, TouchableWithoutFeedback } from 'react-native';

class Header extends Component {
    constructor(props){
        super(props)
        this.onPressBack = this.onPressBack.bind(this)
    }

    onPressBack(){
        this.props.backPressedCallback()
    }
    
    render(){
        if(!this.props.backButton){
            return (
                <View style={styles.viewStyle}>
                    <Text style={styles.textStyle}> {this.props.headerText} </Text>
                </View>
            );
        }

        return (
            <View style={styles.viewStyleWithButton}>
                <TouchableWithoutFeedback onPress={this.onPressBack}>
                    <Image style={styles.backButton} source={require('../assets/arrow-left.png')}/>
                </TouchableWithoutFeedback>
                <Text style={styles.textStyle}> {this.props.headerText} </Text>
                <Image style={styles.hidden} source={require('../assets/arrow-left.png')}/>

            </View>
        )
    }
}

const styles = {
    
    viewStyle: {
        flexDirection: 'row',
        backgroundColor: '#4285f4',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop:10,
        height: 60,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2},
        shadowOpacity: 0.1
    },

    viewStyleWithButton: {
        flexDirection: 'row',
        backgroundColor: '#4285f4',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop:10,
        height: 60,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2},
        shadowOpacity: 0.1
    },

    textStyle: {
        color: 'white',
        fontSize: 25,
        paddingBottom: 1
    },
    backButton: {
        marginLeft: 5
    },

    hidden: {
        opacity: 0,
        marginRight: 5
    }
}

export default Header; 
