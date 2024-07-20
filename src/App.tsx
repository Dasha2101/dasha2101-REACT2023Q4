import RouterComponent from './router/Router';
import store from './redux/store';
import { Provider } from 'react-redux';

import './App.css';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <Provider store={store}>
        <RouterComponent />
      </Provider>
    </div>
  );
};

export default App;
