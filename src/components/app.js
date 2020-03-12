import React, {Component} from 'react';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import NavigatorView from './navigators/navigatorView';
import FlashMessage from 'react-native-flash-message';
import AsyncStorage from '@react-native-community/async-storage';
import I18n from '../helpers/i18n';
import {Provider} from 'react-redux';
import ConfigureStore from './configureStore';

const theme = {
  ...DefaultTheme,
  roundness: 50,
  colors: {
    ...DefaultTheme.colors,
    placeholder: '#6D6D6D',
    text: '#FFF',
    primary: '#03DAC6',
    accent: '#00E2B2',
    underlineColor: 'transparent',
  },
  fonts: {light: 'Kanit-Light'},
  dark: false,
};

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  async componentWillMount() {
    await AsyncStorage.getItem('locale').then(language => {
      if (language == null) {
        language = 'en';
      }
      I18n.locale = language;
    });
  }

  render() {
    return (
      <Provider store={ConfigureStore()}>
        <PaperProvider theme={theme}>
          <NavigatorView />
          <FlashMessage
            position="top"
            textStyle={{fontFamily: 'Kanit-Light'}}
            titleStyle={{fontFamily: 'Kanit-Light', fontSize: 15}}
          />
        </PaperProvider>
      </Provider>
    );
  }
}
