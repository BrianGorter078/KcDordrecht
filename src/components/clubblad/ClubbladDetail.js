import React, {Component} from 'react';
import { Text, ToastAndroid, Alert, Platform} from 'react-native';
import Card from '../card/Card';
import CardSection from '../card/CardSection';

import RNFS from 'react-native-fs'; 
import FileOpener from 'react-native-file-opener';

 class ClubbladDetail extends Component{
    constructor(props){
        super(props)
        this.pdfPath = Platform.OS === 'ios' ? RNFS.DocumentDirectoryPath+"/" : RNFS.ExternalDirectoryPath+"/";
        this.state = {pdfPath: null, currentFile: this.pdfPath+this.props.clubblad.number +".pdf"}
        this.onPress = this.onPress.bind(this);
        this.onLongPress = this.onLongPress.bind(this);
    }
    componentWillUnmount(){
         this.setState({pdfPath: null, currentFile: this.pdfPath+this.props.clubblad.number +".pdf"})
    }
    openPDF(){
        if(Platform.OS !== 'ios'){
            FileOpener.open(
                this.pdfPath+this.props.clubblad.number+".pdf",
                'application/pdf'
            ).then(() => {
                console.log('success!!');
            },(e) => {
                console.log('error!!');
            });
        }else{
            this.props.callback(this.props.clubblad.number+".pdf", this.props.clubblad.number)
        }
    }

    retrieveClubbladen() {
        RNFS.exists(this.pdfPath+this.props.clubblad.number +".pdf").then((fileExists) => {
            if (!fileExists){        
                    RNFS.downloadFile({fromUrl: this.state.pdfUrl, toFile: this.pdfPath+this.props.clubblad.number +".pdf"}).promise.then(result => {
                        ToastAndroid.showWithGravity('Clubblad ' + this.props.clubblad.number + ' is gedownload!', ToastAndroid.LONG, ToastAndroid.BOTTOM);
                        this.props.onDelete(this.props.clubblad.number)
                        this.openPDF()
                    }).catch(err => {
                        if(err.name == 'NetworkError'){
                            ToastAndroid.showWithGravity('Clubblad ' + this.props.clubblad.number + ' is gedownload!', ToastAndroid.LONG, ToastAndroid.BOTTOM);
                        }
                    });
                } else {
                    this.openPDF()  
                }
        }).catch(err =>{
            console.log(err)
        });
    }

    onPress(){     
        this.setState({pdfUrl: this.props.clubblad.url})
        this.retrieveClubbladen()   
    }

    onLongPress(){
        RNFS.exists(this.pdfPath+this.props.clubblad.number +".pdf").then(fileExists => {
            if(fileExists){
                Alert.alert(
                    'Verwijderen Clubblad ' + this.props.clubblad.number,
                    'Als het clubblad dat je wilt verwijderen niet meer beschikbaar is op de website kan je deze niet meer downloaden.\n\nWeet je zeker dat je dit clubblad wilt verwijderen?\n',
                    [
                        {text: 'Annuleer'},
                        {text: 'Verwijder', onPress: () => {this.deleteClubblad()}},
                    ]
                )
            }
        }).catch(err => {
            console.warn(err)
        });
    }

    deleteClubblad(){
        RNFS.unlink(this.state.currentFile)
        this.retrieveClubbladen()
        this.props.onDelete(this.props.clubblad.number)
    }

    render(){   
            return(
                <Card onDevice={this.props.onDevice}>
                    <CardSection onDevice={this.props.onDevice}>
                        <Text onPress={this.onPress} onLongPress={this.onLongPress} style={styles.textStyle}>Clubblad {this.props.clubblad.number}</Text>
                    </CardSection>
                </Card>
            ); 
    }
}

const styles = {
    textStyle:{
        color:'white',
        fontSize: 20
    }
}

export default ClubbladDetail;