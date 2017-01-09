import React, { Component } from 'react';
import { Text, View, ScrollView, RefreshControl, ToastAndroid, Platform } from 'react-native';
import axios from 'axios';

import ClubbladDetail from './ClubbladDetail';
import RNFS from 'react-native-fs'; 
import { Container, Content } from 'native-base';

class  ClubbladenList extends Component {
    constructor(props){
        super(props)
        this.state = { clubbladen: [], onDevice: false, networkStatus:true};
        this.onDelete = this.onDelete.bind(this)

    }

    componentWillMount() {
        this.getClubbladen()
    }

    getClubbladen(){
            RNFS.readdir(Platform.OS === 'ios' ? RNFS.DocumentDirectoryPath : RNFS.ExternalDirectoryPath).then(response => {
            response.map(file => {
               if(file.includes('pdf')){
                   this.setState({clubbladen: this.state.clubbladen.concat({number: file.replace('.pdf',''), onDevice:true})})
               }
            })
            axios.get('https://arcane-river-45274.herokuapp.com/')
            .then(response => {
                var clubbladen = [];
                for(var j = 0; j < response.data.length; j++){

                    if (this.state.clubbladen.length == 0){
                        clubbladen.push(response.data[j])
                    }
                    for (var i = 0; i < this.state.clubbladen.length; i++) {
                        if(response.data[j].number != this.state.clubbladen[i].number){
                            console.warn(response.data[j].number)
                            clubbladen.push(response.data[j])

                        }
                    }   
                }
                this.setState({ clubbladen: this.state.clubbladen.concat(clubbladen)})

                }).catch(err => {
                    if(err == "Error: Network Error"){
                        this.setState({networkStatus: false})
                    }else{
                        console.warn("errorooor" + err)
                    }

                })

                }).catch(error => {
                    console.warn("Errrrr" + error)
            });
    }

    componentWillUnMount(){
        this.setState({ clubbladen: []});
    }

    onDelete(clubbladNumber){
            for(var i = 0; i < this.state.clubbladen.length; i++){
                if(this.state.clubbladen[i].number == clubbladNumber){
                    var clubbladen = this.state.clubbladen.slice()
                        clubbladen.splice(i,1)
                       this.setState({clubbladen: []}, this.getClubbladen())
                }
            }       
    }
    networkStatus(){
        if(!this.state.networkStatus){
            return (
                <View style={styles.networkInactive}>
                    <Text>Netwerk is inactief</Text>
                </View>
            );
        }
    }
    
    renderClubbladen(){
        return this.state.clubbladen.map(clubblad => <ClubbladDetail downloaded={this.downloaded} onDevice={clubblad.onDevice} key={clubblad.number} clubblad={clubblad} callback={this.props.callback} onDelete={this.onDelete}/>)
    
    }

    render() {
        return(
            <Container>
                <Content>
                    <ScrollView>
                    {this.renderClubbladen()}
                    </ScrollView>
                {this.networkStatus()}        
                </Content>
            </Container>
        );
    }
}

export default ClubbladenList;