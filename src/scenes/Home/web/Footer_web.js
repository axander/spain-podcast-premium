import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import TranslatedComponent from '../../../utils/TranslatedComponent.js';
import './styles/footer_web.scss'

import Footer_about from './Footer_about.js'
import Footer_account from './Footer_account.js'
import Footer_link from './Footer_link.js'
import Footer_app from './Footer_app.js'
import Footer_generic from './Footer_generic.js'
import Footer_copyright from './Footer_copyright.js'

class Footer_web extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {

  }
  componentDidUpdate(){
    
  }

  render() {
    return (
      <div className={ 'footer_web footer_web_'+localStorage.getItem('template')} >
        <div class='row'>
          <div className={'col-md-offset-2 col-xs-12 col-md-2 col-lg-2 footer_web_block footer_web_block_'+localStorage.getItem('template')}><div><div><Footer_about /></div></div></div>
          <div className={'col-xs-12 col-md-2 col-lg-2 footer_web_block footer_web_block_'+localStorage.getItem('template')}><div><div><Footer_account /></div></div></div>
          <div className={'col-xs-12 col-md-2 col-lg-2 footer_web_block footer_web_block_'+localStorage.getItem('template')}><div><div><Footer_link /></div></div></div>
          <div className={'col-xs-12 col-md-3 col-lg-3 footer_web_block footer_web_block_'+localStorage.getItem('template')}><div><div><Footer_app /></div></div></div>
        </div>
        <div class='row'>
          <div class='col-xs-12 col-lg-12'><Footer_generic /></div>
        </div>
        <div class='row'>
          <div class='col-xs-12 col-lg-12 '><Footer_copyright /></div>
        </div>
      </div>  
    );
  }
}

Footer_web.propTypes = {
  //who: React.PropTypes.string.isRequired,
};


// Returns nothing because it mutates the class
TranslatedComponent(Footer_web);
export default Footer_web;