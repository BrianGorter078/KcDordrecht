import React, { Component } from 'react';
import { Text, View } from 'react-native';
import axios from 'axios';

import ClubbladDetail from './ClubbladDetail';

class  ClubbladenList extends Component {
    state = { clubbladen: [] };

    componentWillMount() {
        axios.get('https://arcane-river-45274.herokuapp.com/')
            .then(response => this.setState({clubbladen : response.data}));
    }
    
    renderClubbladen(){
       return this.state.clubbladen.map(clubblad => <ClubbladDetail key={clubblad.URL} clubblad={clubblad}/>)
    }

    render() {

        return(
            <View>
                {this.renderClubbladen()}
            </View>
        );
    }
}

export default ClubbladenList;