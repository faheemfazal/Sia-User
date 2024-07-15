import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./Api/redux-toolkit/store";
import { CartProvider } from './context/CartContext';
import {  ConfigProvider } from "antd";



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ConfigProvider prefixCls="custom-ant">

    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <CartProvider>
          <App />
        </CartProvider>
      </PersistGate>
    </Provider>
    </ConfigProvider>
  </React.StrictMode>
);
