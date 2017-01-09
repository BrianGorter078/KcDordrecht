import React , {Component} from 'react';
import { AppRegistry, View, StatusBar, BackAndroid, Linking, Alert} from 'react-native';

import ClubbladenList from './src/components/clubblad/ClubbladenList';

import { Container, Content, Header, Title, Icon, Button, Footer, FooterTab } from 'native-base';
import myTheme from './src/Themes/MyTheme';
import TwitterTimeLine from './src/components/twitter/TwitterTimeLine';
import RNFS from 'react-native-fs';


class KcDordrechtApp extends Component {

  constructor(props){
    console.ignoredYellowBox = ['Warning: ReactNative.createElement'];
    super(props)
    this.state = {active: "clubblad"}
    this.rightFooterTabOnPress = this.rightFooterTabOnPress.bind(this)
    this.leftFooterTabOnPress = this.leftFooterTabOnPress.bind(this)

    BackAndroid.addEventListener('hardwareBackPress',function(){
      Alert.alert(
                    'Applicatie Sluiten',
                    'Weet je zeker dat je de applicatie wilt sluiten?',
                    [
                        {text: 'Blijf', onPress: () => {return true}},
                        {text: 'Sluit', onPress: () => {BackAndroid.exitApp()}},
                    ]
                )
    return true;
  }.bind(this));

  }
  leftFooterTabOnPress(){
    this.setState({active: "clubblad"})
  }
  rightFooterTabOnPress(){
    this.setState({active: "twitter"})
  }
  renderPDF(pdfUrl, clubbladNumber){
    this.setState({showingPDF: true, pdf: "/" + pdfUrl, clubblad: clubbladNumber, backButton: true});
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
            <Container>
                <Header>

                    <Title>Twitter</Title>

                </Header>

                <Content theme={myTheme}>
                  <StatusBar backgroundColor="#3367d6"/>
                  <TwitterTimeLine/>
                </Content>
                  
                <Footer>
                      {this.renderFooterTabs()}
                </Footer>
            </Container>
      );
    }

    if(this.state.active == "clubblad"){
      return (
            <Container>

                <Header>
                    <Title>Clubbladen</Title>
                </Header>

                <Content theme={myTheme}>
                  <StatusBar backgroundColor="#3367d6"/>
                  <ClubbladenList callback={this.renderPDF}/>
                </Content>

                <Footer>
                      {this.renderFooterTabs()}
                </Footer>
            </Container>
      );
    }
  }
}



AppRegistry.registerComponent('KcDordrechtApp', () => KcDordrechtApp);
