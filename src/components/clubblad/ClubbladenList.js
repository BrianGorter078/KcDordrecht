import React, { Component } from 'react';
import { Text, View, ScrollView, RefreshControl, ToastAndroid, Platform } from 'react-native';
import axios from 'axios';

import ClubbladDetail from './ClubbladDetail';
import RNFS from 'react-native-fs'; 
import { Container, Content } from 'native-base';

class  ClubbladenList extends Component {
    constructor(props){
        super(props)
        this.state = { clubbladen: [], networkStatus:true};
        this.onDelete = this.onDelete.bind(this)
    }

    componentWillMount() {
        this.getClubbladen()
    }

    getClubbladen(){
            RNFS.readdir(Platform.OS === 'ios' ? RNFS.DocumentDirectoryPath : RNFS.ExternalDirectoryPath).then(response => {
            response.map(file => {
               if(file.includes('pdf')){
                   this.setState({clubbladen: this.state.clubbladen.concat({number: file.replace('.pdf','')})})
               }
            })
            axios.get('https://arcane-river-45274.herokuapp.com/kcd')
            .then(response => {
                var clubbladen = []
                response.data.map(responseitem => {
                    if(this.state.clubbladen.length == 0){
                        clubbladen.push(responseitem)
                    }
                    this.state.clubbladen.map(clubblad => {
                        (clubblad.number != responseitem.number.toString() ? clubbladen.push(responseitem): null)
                    })
                })
                var clubbladenSet = [...new Set(clubbladen)]
                this.setState({clubbladen: clubbladenSet})
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
                <View>
                    <Text style={{textAlign:'center', fontSize:15}}>Geen internet verbinding actief, deze clubbladen staan op je telefoon</Text>
                </View>
            );
        }
    }
    
    renderClubbladen(){
        var clubbladen = this.state.clubbladen.sort((a,b) => {
            return b.number - a.number
        });

        return clubbladen.map(clubblad => <ClubbladDetail downloaded={this.downloaded} key={clubblad.number} clubblad={clubblad} callback={this.props.callback} onDelete={this.onDelete}/>)
    
    }

    render() {
        console.log(this.state)
        return(
            <Container>
                <Content style={{marginLeft:75,marginRight:75}}>
                    <ScrollView>
                    {this.renderClubbladen()}
                    </ScrollView>      
                </Content>
                {this.networkStatus()} 
            </Container>
        );
    }
}

export default ClubbladenList;