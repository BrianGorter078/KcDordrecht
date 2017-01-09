import React , {Component} from 'react';
import { AppRegistry, View, ScrollView, RefreshControl, StatusBar, WebView} from 'react-native';

import ClubbladenList from './src/components/clubblad/ClubbladenList';
import { COLOR, ThemeProvider, Toolbar, Avatar } from 'react-native-material-ui';
import { Container, Content, Header, Title, Icon, Button, Tabs, Footer, FooterTab, Badge } from 'native-base';
import myTheme from './src/Themes/MyTheme';
import RNFS from 'react-native-fs';
import TwitterTimeLine from './src/components/twitter/TwitterTimeLine';

class KcDordrechtApp extends Component {

  constructor(props){
    console.ignoredYellowBox = ['Warning: flattenChildren(...)'];

    super(props)
    this.state = {showingPDF: false, pdf: "", backButton: false, active: "clubblad"}
    this.renderPDF = this.renderPDF.bind(this)
    this.backPressed = this.backPressed.bind(this)
    this.rightFooterTabOnPress = this.rightFooterTabOnPress.bind(this)
    this.leftFooterTabOnPress = this.leftFooterTabOnPress.bind(this)

  }
  backPressed(){
    this.setState({showingPDF: false, backButton: false, pdf: ""});
  }

  renderPDF(pdfUrl, clubbladNumber){
    this.setState({showingPDF: true, pdf: "/" + pdfUrl, clubblad: clubbladNumber, backButton: true});
  }
  leftFooterTabOnPress(){
    this.setState({active: "clubblad"})
  }
  rightFooterTabOnPress(){
    this.setState({active: "twitter"})
  }

  renderFooterTabs(){
      if(this.state.active === "clubblad"){
        return(
          <FooterTab>
            <Button active onPress={this.leftFooterTabOnPress}>
              Clubbladen
              <Icon name='ios-book' />
            </Button>
            <Button onPress={this.rightFooterTabOnPress}>
              Twitter
              <Icon name='logo-twitter' />
            </Button>
          </FooterTab>
        )
    }
        return(
          <FooterTab>
            <Button onPress={this.leftFooterTabOnPress}>
              Clubbladen
              <Icon name='ios-book' />
            </Button>
            <Button active onPress={this.rightFooterTabOnPress}>
              Twitter
              <Icon name='logo-twitter' />
            </Button>
          </FooterTab>
        );
  }
   
  render() {

    if(this.state.active == "twitter"){
      return(
            <Container theme={myTheme}>
            
                <Header>

                    <Title>Twitter</Title>

                </Header>

                <Content theme={myTheme}>
                  <StatusBar  barStyle="light-content"/>
                  <TwitterTimeLine/>
                </Content>

                <Footer>
                      {this.renderFooterTabs()}
                </Footer>
            </Container>
      );
    }

    if(!this.state.showingPDF){
      return (
            <Container theme={myTheme}>

                <Header>
                    <Title>Clubbladen</Title>
                </Header>

                <Content >
                  <StatusBar  barStyle="light-content"/>
                  <ClubbladenList callback={this.renderPDF} clubbladAmount={this.clubbladenAmount}/>
                </Content>

                <Footer>
                      {this.renderFooterTabs()}
                </Footer>
            </Container>
      );
    }

    if(this.state.showingPDF){
      return (
            <Container theme={myTheme}>
              <Header>
                  <Button transparent onPress={this.backPressed}>
                    <Icon name='md-arrow-back'/>
                  </Button>

                <Title>Clubbad {this.state.clubblad}</Title>
              </Header>
              <View style={{flex:1}}>     
                <StatusBar  barStyle="light-content"/>
                <WebView source={{uri:RNFS.DocumentDirectoryPath+this.state.pdf}}/>
              </View>
            </Container>
          
      )
    }
  }
}



AppRegistry.registerComponent('KcDordrechtApp', () => KcDordrechtApp);
