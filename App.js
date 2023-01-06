import React from 'react';
import Navigation from './src/Navigation/Navigation';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { COLORS } from './src/Theme/Theme';
import { Provider } from 'react-redux';
import store from './src/Redux/Store';

const theme = {
   ...DefaultTheme,
   roundness: 0,
   colors: {
     ...DefaultTheme.colors,
     primary: COLORS.primary,
   },
 };

const App = ()=>{
   return (
      <>
      <PaperProvider theme={theme}>
        <Provider store={store}>
           <Navigation/>
        </Provider>
      </PaperProvider>
      </>
   )
}

export default App;
