import React, {Component} from 'react';
import { Text, Button } from 'react-native';
import Card from './Card';
import CardSection from './CardSection';

import PDFView from 'react-native-pdf-view';
import RNFS from 'react-native-fs'; 
import FileDownload from 'react-native-file-download';


 class ClubbladDetail extends Component{
    constructor(props){
        super(props)
    
        this.state = {pdfPath: null, isPdfDownload: false}
        this.onPress = this.onPress.bind(this);
        this.onLongPress = this.onLongPress.bind(this);
        this.pdfPath = RNFS.DocumentDirectoryPath + "/"
        
    }
    
    downloadPdf() {
        RNFS.exists(this.pdfPath+this.props.clubblad.Number +".pdf").then((fileExists) => {
            if (fileExists == false){        
                FileDownload.download(this.props.clubblad.URL, this.pdfPath, this.props.clubblad.Number +".pdf")
                    .then((response) => {
                        this.setState({isPdfDownload: true, pdfPath: RNFS.DocumentDirectoryPath+ "/" + this.props.clubblad.Number + ".pdf"})
                        //todo open pdf
                    })
                    .catch((error) => {
                        console.log(error)
                    });
                }else{
                    //todo open pdf
            }
        });

    }

    onPress(){        
        this.setState({pdfUrl: this.props.clubblad.URL}, this.downloadPdf())   
    }
    onLongPress(){
        //todo custom alert with delete
    }

    render(){   
            return(
            <Card>
                <CardSection>
                    <Text onPress={this.onPress} onLongPress={this.onLongPress} style={styles.textStyle}>Clubblad {this.props.clubblad.Number}</Text>
                </CardSection>
            </Card>
            );
    }
}

const styles = {
    textStyle:{
        color:'white',
        fontSize: 20
    },
     pdf: {
        flex:1
    },
}

export default ClubbladDetail;