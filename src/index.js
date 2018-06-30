import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import Records from './components/records/records';

ReactDOM.render(<Records />, document.getElementById('root'));
registerServiceWorker();
