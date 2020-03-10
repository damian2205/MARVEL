import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/configStore'; 
import Routes from './routes/routes';
// import Listas from './components/listas';
// import App from './App';

render(<Provider store = {store}>
    <Routes/>
    </Provider>,
 document.getElementById("root"));

