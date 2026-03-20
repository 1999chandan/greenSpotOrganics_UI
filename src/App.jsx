import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './app/store';
import AppRoutes from './routes/AppRoutes';
import './App.css';

function App() {
  const basename = process.env.NODE_ENV === 'production' ? '/greenSpotOrganics_UI' : '/';
  
  return (
    <Provider store={store}>
      <BrowserRouter basename={basename}>
        <AppRoutes />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
