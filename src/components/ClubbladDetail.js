import React, {Component} from 'react';
import { Text, Button, WebView } from 'react-native';
import Card from './Card';
import CardSection from './CardSection';

import PDFView from 'react-native-pdf-view';
import RNFS from 'react-native-fs'; 


 class ClubbladDetail extends Component{
    constructor(props){
        super(props)
        this.pdfPath = RNFS.DocumentDirectoryPath + "/"
        this.state = {pdfPath: null, isPdfDownload: false, currentFile: this.pdfPath+this.props.clubblad.Number +".pdf"}
        this.onPress = this.onPress.bind(this);
        this.onLongPress = this.onLongPress.bind(this);
    }
    componentWillUnmount(){
         this.setState({pdfPath: null, isPdfDownload: false, currentFile: this.pdfPath+this.props.clubblad.Number +".pdf"})
    }

    downloadPdf() {
        RNFS.exists(this.pdfPath+this.props.clubblad.number +".pdf").then((fileExists) => {
            if (!fileExists){        
                    RNFS.downloadFile({fromUrl: this.state.pdfUrl, toFile: this.pdfPath+this.props.clubblad.number +".pdf"}).promise.then(result => {
                        this.props.callback(this.props.clubblad.number +".pdf",this.props.clubblad.number)
                    }).catch(err => {
                        console.log(err)
                    });
                } else {
                    this.props.callback(this.props.clubblad.number +".pdf",this.props.clubblad.number)
                }
        }).catch(err =>{
            console.log(err)
        });
    }

    onPress(){        
        this.setState({pdfUrl: this.props.clubblad.url}, this.downloadPdf())   
    }
    onLongPress(){
        //TODO: custom alert with delete
    }

    render(){   
            return(
                <Card >
                    <CardSection>
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