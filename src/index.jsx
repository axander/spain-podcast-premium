import React from 'react'
import { render } from 'react-dom'
import { HashRouter } from 'react-router-dom'
import App from './App.jsx';

import Constants from './Constants.js';
import TranslationActionCreator from './actions/TranslationActionCreator.js';
import TranslationStore from './stores/TranslationStore.js';


import './styles.scss'


class AppComponent extends React.Component {
  /*constructor(props) {
    super(props);
  }*/

  componentDidMount() {
    // Trigger loading of the language file
    TranslationActionCreator.changeLanguage(Constants.DEFAULT_LANGUAGE, success => {
      if (success) {
        this.forceUpdate();
      }
      else {
        throw new Error('No translation available!');
      }
    });
  }

  render() {
    if (TranslationStore.getCurrentLanguage() === null) {
      return (
        <div className="app-wrapper">
          Loading ...
        </div>
      );
    }

    return (
      <div className="app-wrapper">
        
        {/* No connection to the translation picker */}
        <HashRouter>
  	    	<App />
  	  	</HashRouter>
      </div>

    )
  }
}


render((
  <HashRouter>
    <AppComponent />
  </HashRouter>
), document.getElementById('root'));