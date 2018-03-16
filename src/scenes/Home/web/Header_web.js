import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import TranslatedComponent from '../../../utils/TranslatedComponent.js';
import Login_web from './Login_web.js'
import Search from '../../../components/Search/Search.js'
import Logo from '../../../components/Logo/Logo.js'
import LogoResponsive from '../../../components/Logo/LogoResponsive.js'
import './styles/header_web.scss'

class Header_web extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      'registerHide':localStorage.getItem('logged')
    }
    this.showRegister=this.showRegister.bind(this);
    this.showMenuResponsive= this.showMenuResponsive.bind(this);
    this.hideMenuResponsive= this.hideMenuResponsive.bind(this);
  }
  showRegister(){
    this.setState({
      'registerHide':false
    })
  }
  hideMenuResponsive(){
    this.setState({
      'menuResponsive':''
    })
  }
  showMenuResponsive(){
    this.setState({
      'menuResponsive':'menu_responsive_show'
    })
  }
  render() {
    let registerHide = localStorage.getItem('logged');
    return (
      <div className={ 'header_web header_web_'+localStorage.getItem('template') }>
        <div className='header_web_main'>
          <div class="header_web_explore option left pr20"><Link to={'/channel'} ><div class=''>{this.translate('header.explore').toUpperCase()}</div></Link></div>
          <div class="header_web_explore option left pr20 menu_responsive_pb" onClick={this.showMenuResponsive} >☰</div>
          <div class="header_web_premium option left"><Link to={'/info/premium'} ><div class=''>{this.translate('header.premium').toUpperCase()}</div></Link></div>
          <Link to={'/'} >
            <div class='option logo'><Logo /></div>
            <div class='option logoResponsive'><LogoResponsive /></div>
          </Link>
          
          <div class='avatar right'><Login_web login={this.props.login} showRegister={this.showRegister} /></div>
          <div className={ this.state.registerHide ?'hide' : 'header_web_register option right' } ><Link to={'/register'} ><div>{this.translate('header.register').toUpperCase()}</div></Link></div>
          <Search />
          <div className={"menu_responsive " + this.state.menuResponsive} onClick={this.hideMenuResponsive} >
            <div className="menu_responsive_option" >
              X
            </div>
            <Link to={'/channel'} >
              <div className="menu_responsive_option" >
                <div class=''>{this.translate('header.explore').toUpperCase()}</div>
              </div >
            </Link>
            <Link to={'/info/premium'} >
              <div className="menu_responsive_option" >
                <div class=''>{this.translate('header.premium').toUpperCase()}</div>
              </div>
            </Link>
            <Link to={'/register'} >
              <div className={ this.state.registerHide ?'hide' : 'menu_responsive_option' }  >
                <div><div>{this.translate('header.register').toUpperCase()}</div></div>
              </div>
            </Link>
          </div>
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