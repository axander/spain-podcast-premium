import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import TranslatedComponent from '../../../utils/TranslatedComponent.js';
import './styles/home_web.scss'

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
  }

  render() {
    return (
      <div className={ "home_web_" + this.state.template } >
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