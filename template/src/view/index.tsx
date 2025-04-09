import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from 'src/core/store/redux';

import CONFIG from '@config';
import { removeProfile } from '@modules/authentication/profileStore';
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Loading from '@shared/components/Loading';

import App from './App';

interface IPersistStore {
  remember?: boolean;
}

const PersistStore: React.FC<IPersistStore> = ({ remember }) => {
  const handleBeforeLift = () => {
    if (remember === true) {
      return;
    }
    if (remember === false) {
      store.dispatch(removeProfile());
      return;
    }
    const bc = new BroadcastChannel(CONFIG.APP_NAME);
    const checkedRememberInTab = new Promise((resolve, reject) => {
      bc.onmessage = event => {
        if (event.data === 'loaded' && window.sessionStorage.getItem('remember-me')) {
          bc.postMessage(JSON.stringify({ remember: '1' }));
        } else if (JSON.parse(event.data).remember === '1') {
          window.sessionStorage.setItem('remember-me', '1');
          resolve('1');
        } else {
          resolve(undefined);
        }
      };
      if (window.sessionStorage.getItem('remember-me')) {
        bc.postMessage(JSON.stringify({ remember: '1' }));
      } else {
        bc.postMessage('loaded');
      }
      setTimeout(() => {
        resolve(undefined);
      }, 100);
    });

    checkedRememberInTab.then(res => {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const _remember =
        window.sessionStorage.getItem('remember-me') ||
        window.localStorage.getItem('remember-me') ||
        res;
      // console.debug('file: index.tsx:54  handleBeforeLift  _remember:', _remember);
      if (_remember !== '1') {
        store.dispatch(removeProfile());
      }
    });
  };
  return (
    <PersistGate loading={<Loading />} persistor={persistor} onBeforeLift={handleBeforeLift}>
      <App />
    </PersistGate>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <Router>
    <Provider store={store}>
      <PersistStore />
    </Provider>
  </Router>,
);
