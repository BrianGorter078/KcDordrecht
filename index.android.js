import React , {Component} from 'react';
import { AppRegistry, View, ScrollView, RefreshControl, StatusBar, BackAndroid} from 'react-native';

import Header from './src/components/Header';
import ClubbladenList from './src/components/ClubbladenList';
import PDFView from 'react-native-pdf-view';
import RNFS from 'react-native-fs'; 


class KcDordrechtApp extends Component {

  constructor(props){
    super(props)
    this.state = {showingPDF: false, pdf: "", backButton: false}
    this.renderPDF = this.renderPDF.bind(this)
    this.backPressed = this.backPressed.bind(this)

    BackAndroid.addEventListener('hardwareBackPress',function(){
      console.warn(this.state)
      if(this.state.showingPDF)
      {
        this.backPressed();
        return true
      }

      return false
    }.bind(this));

  }
    backPressed(){
    this.setState({showingPDF: false, backButton: false, pdf: "", clubblad:null})
  }

  renderPDF(pdfUrl, clubbladNumber){
    this.setState({showingPDF: true, pdf: "/" + pdfUrl, clubblad: clubbladNumber, backButton: true})
  }
   
  render() {
    console.log(this.state.showingPDF)
    if(!this.state.showingPDF){
      return (
        <View>
          <StatusBar backgroundColor="#3367d6"/> 
          <Header headerText="Clubbladen" backButton={this.state.backButton} backPressedCallback={this.backPressed}/>
          <ClubbladenList callback={this.renderPDF}/>
        </View>
      );
    }
    if(this.state.showingPDF){
      return (
        <View style={{flex: 1}}>
          <StatusBar backgroundColor="#3367d6"/> 
          <Header headerText={"Clubblad " + this.state.clubblad} backButton={this.state.backButton} backPressedCallback={this.backPressed}/>
          <PDFView ref={(pdf)=>{this.pdfView = pdf;}}
                          path={RNFS.DocumentDirectoryPath+this.state.pdf}
                          onLoadComplete = {(pageCount)=>{
                              this.pdfView.setNativeProps({
                                  zoom: 1
                              });
                          }}
                          style={styles.pdf}/>
        </View>
      )
    }
  }
}

const styles = {
  pdf: {
    flex: 1
  }
}

AppRegistry.registerComponent('KcDordrechtApp', () => KcDordrechtApp);
