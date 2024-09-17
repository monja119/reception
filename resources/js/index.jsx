import './bootstrap';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app.jsx';
import reportWebVitals from './reportWebVitals';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import {ToastContainer} from "react-toastify";


const root = createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ToastContainer />
                <App />
            </PersistGate>
        </Provider>
    </React.StrictMode>
);

reportWebVitals();
