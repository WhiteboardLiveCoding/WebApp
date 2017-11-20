import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { FocusStyleManager } from '@blueprintjs/core';

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);

FocusStyleManager.onlyShowFocusOnTabs();

registerServiceWorker();
