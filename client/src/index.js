import React from "react";
import App from "./App";
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import reducers from './reducers';
import './index.css';
import { createRoot } from 'react-dom/client';

const store = configureStore({
    reducer:reducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
      }).concat(thunk)
});
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Provider store={store}> 
    <App /> 
</Provider>);
