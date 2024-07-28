import React from 'react';
import RouterComponent from './router/Router';
import store from './redux/store';
import { Provider } from 'react-redux';
import { ThemeProvider } from './components/themeContext/ThemeContext';
import ThemedContainer from './components/themeContainer/ThemeContainer';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <ThemedContainer>
          <RouterComponent />
        </ThemedContainer>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
