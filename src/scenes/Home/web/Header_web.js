import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import TranslatedComponent from '../../../utils/TranslatedComponent.js';
import Login_web from './Login_web.js'
import Search from '../../../components/Search/Search.js'
import Logo from '../../../components/Logo/Logo.js'
import './styles/header_web.scss'

class Header_web extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {

  }
  componentDidUpdate(){
    
  }

  render() {
    return (
      <div className={ 'header_web header_web_'+localStorage.getItem('template') }>
        <div className='header_web_main'>
          <Link to={'/channel'} ><div class='option left'>{this.translate('header.explore').toUpperCase()}</div></Link>
          <Link to={'/info/premium'} ><div class='option left'>{this.translate('header.premium').toUpperCase()}</div></Link>
          <Link to={'/'} ><div class='option logo'><Logo /></div></Link>
          
          <div class='right'><Login_web login={this.props.login} /></div>
          <Link to={'/register'} ><div class='option right'>{this.translate('header.register').toUpperCase()}</div></Link>
          <Search />
        </div>
      </div>  
    );
  }
}

Header_web.propTypes = {
  //who: React.PropTypes.string.isRequired,
};


// Returns nothing because it mutates the class
TranslatedComponent(Header_web);
export default Header_web;