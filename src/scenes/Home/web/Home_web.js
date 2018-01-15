import React from 'react'
import ReactDOM from 'react-dom'
import { Link, Route } from 'react-router-dom'
import TranslatedComponent from '../../../utils/TranslatedComponent.js';
import Utils from '../../../utils/Utils.js';

import './styles/home_web.scss'

const data = require('./schemma/schemma.json')


class Home_web extends React.Component {
  constructor(props) {
    super(props);
    localStorage.setItem('lastState',props.location.pathname);
    this.state = {
      'template': localStorage.getItem('template'),
      'toogle':true,
      'show': 'hideMenu',
      'loggedAs': localStorage.getItem('logged') ? 'basicBorderBtn inline' : 'hide',
      'notLogged': localStorage.getItem('logged') ? 'hide' : 'basicBorderBtn inline',
      'nickName': JSON.parse(localStorage.getItem('client')) ? JSON.parse(localStorage.getItem('client')).personalData.nickName : null
    };
  }
  componentDidMount() {

  }
  componentDidUpdate(){
    this.state = {
      'toogle':true,
      'show': 'hideMenu',
      'loggedAs': localStorage.getItem('logged') ? 'basicBorderBtn inline' : 'hide',
      'notLogged': localStorage.getItem('logged') ? 'hide' : 'basicBorderBtn inline',
      'nickName': JSON.parse(localStorage.getItem('client')) ? JSON.parse(localStorage.getItem('client')).personalData.nickName : null
    }
    Utils.scrollToTop(300);
  }

  render() {

    return (
      <div className={ "home_web home_web_" + this.state.template } >
        <div className="row">
      
          {data.schemma.map(p => {
            let Component = require('scenes/'+p.path).default ;

            return (
              <div className="col-xs-12 col-md-12">
                <div>
                  <h1>{this.translate('menu.'+p.name).toUpperCase()}</h1>
                </div>
                <div className='section-container_web' >
                  <div className="section-container" >
                      <div className="section-contain">
                        <Component>{p.component}</Component>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}

          
        </div>
      </div>  
    );
  }
}

Home_web.propTypes = {
  //who: React.PropTypes.string.isRequired,
};


// Returns nothing because it mutates the class
TranslatedComponent(Home_web);
export default Home_web;