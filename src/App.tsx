import './App.css';
import RouterComponent from './router/Router';
import store from './redux/store';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <RouterComponent />
    </Provider>
  );
}

export default App;
