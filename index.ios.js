import React , {Component} from 'react';
import { AppRegistry, View, ScrollView, RefreshControl } from 'react-native';

import Header from './src/components/Header';
import ClubbladenList from './src/components/ClubbladenList';
import PDFView from 'react-native-pdf-view';


class KcDordrechtApp extends Component {
  reRender(){
    console.log("Rerender")
  }

  render() {
    return (
      <View>
        <Header headerText="Clubbladen"/>
        <ClubbladenList/>
      </View>
    );
  }
}

const Style = {

}

AppRegistry.registerComponent('KcDordrechtApp', () => KcDordrechtApp);
