import React , {Component} from 'react';
import { AppRegistry, View } from 'react-native';

import Header from './src/components/Header';
import ClubbladenList from './src/components/ClubbladenList';


class KcDordrechtApp extends Component {
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
