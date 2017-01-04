import React , {Component} from 'react';
import { AppRegistry, View, ScrollView, RefreshControl, WebView, StatusBar} from 'react-native';


import Header from './src/components/Header';
import ClubbladenList from './src/components/ClubbladenList';
import PDFView from 'react-native-pdf-view';
import RNFS from 'react-native-fs'; 


class KcDordrechtApp extends Component {

  constructor(props){
    super(props)
    this.state = {showingPDF: false, pdf: "", backButton: false, clubblad:null}
    this.renderPDF = this.renderPDF.bind(this)
    this.backPressed = this.backPressed.bind(this)
  }

  backPressed(){
    this.setState({showingPDF: false, backButton: false, pdf: "", clubblad:null})
  }

  renderPDF(pdfUrl, clubbladNumber){
    this.setState({showingPDF: true, pdf: "/" + pdfUrl, clubblad: clubbladNumber, backButton: true})
  }

  render() {

    if(!this.state.showingPDF){
      return (
        <View style={{flex: 1}}>
          <StatusBar backgroundColor="#3367d6" barStyle="light-content"/>
          <Header headerText="Clubbladen" backButton={this.state.backButton} backPressedCallback={this.backPressed}/>
          <ClubbladenList callback={this.renderPDF}/>
        </View>
      );
    }

    if(this.state.showingPDF) {
      return(
      <View style={styles.container}>
        <StatusBar backgroundColor="#3367d6" barStyle="light-content"/>
        <Header headerText={"Clubblad " + this.state.clubblad} backButton={this.state.backButton} backPressedCallback={this.backPressed}/>
        <WebView source={{uri: RNFS.DocumentDirectoryPath + this.state.pdf}} />
      </View>
      )
    }
  }
}

const styles = {
  container: {
    flex:10
  },
  pdf: {
    flex: 1
  }
}

AppRegistry.registerComponent('KcDordrechtApp', () => KcDordrechtApp);
