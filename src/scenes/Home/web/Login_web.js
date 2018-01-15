import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import TranslatedComponent from '../../../utils/TranslatedComponent.js'
import FBPB from '../../../components/FBPB.js'
import { Modal, API } from '../../../services/Rest.js'
import './styles/login_web.scss'


class Login_web extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      'show':false,
      'loggedAs': localStorage.getItem('logged') ? '' : 'hide',
      'notLogged': localStorage.getItem('logged') ? 'hide' : '',
      'nickName': JSON.parse(localStorage.getItem('client')) ? JSON.parse(localStorage.getItem('client')).personalData.nickName : null
    }
    this.toogle = this.toogle.bind(this);
  }
  toogle(e){
    this.setState({
      'show': !this.state.show
    });
    console.log(this.state.show);
  }
  componentDidMount() {

  }
  componentDidUpdate(){
    
  }

  render() {
    return (
      <div>
        <div onClick={this.toogle} className={this.state.notLogged} >{this.translate('header.initSession').toUpperCase()}</div>
        <div onClick={this.toogle} className={this.state.loggedAs} >
          <Link to='/user' className='contrast'><div >{this.translate('logged.as')}{this.state.nickName}</div></Link>
        </div>
        <auth_web className={ 'auth_web auth_web_'+localStorage.getItem('template') + (this.state.show ? ' auth_web_show' : '')} >
            <div className="authInner">
              <h1>{this.translate('login')}</h1>
              <div><FBPB /></div>
              <div className="formOr" >------------------   {this.translate('register.or')}   ------------------</div>
              <form onSubmit={e => this.handleSubmit(e, this.login, this.onError)}>
                <div><input id="email" type="text"  onChange={this.handleChange} className={ this.state.emailClass + ' input_web_'+localStorage.getItem('template')}  value={this.state.email} placeholder={this.translate('nickoremail')} /></div>
                <div><input id="pwd" type="password" onChange={this.handleChange} className={ 'input_web_'+localStorage.getItem('template')} value={this.state.pwd} placeholder={this.translate('password')} /></div>
                <div class='row'>
                  <div class='col-xs-6' ><Link to='/recover' className='forgotPwdBtn'><div>{this.translate('register.recoverPwd')}</div></Link></div>
                  <div class='col-xs-6' ><div className={"initBtn " + this.state.deactive } onClick={e => this.handleSubmit(e, this.login, this.onError)} >{this.translate('header.initSession').toUpperCase()}</div></div>
                </div>
              </form>
              <div class='row'>
                  <div class='col-xs-6' ><div className='remember'>Recuérdame</div></div>
              </div>
              <div class='row registerRow'>
                  <div class='col-xs-6' ><div className={ 'noAccountRot noAccountRot_web_'+localStorage.getItem('template')}  >¿No tienes cuenta?</div></div>
                  <div class='col-xs-6' ><div className='registerBtn' >Registrate ahora</div></div>
              </div>
              <div className="closePB" onClick={this.toogle}>X</div>
            </div>
          <div>
            <Modal show={this.state.isOpen} onClose={this.toggleModal} >
                {this.translate(this.state.showedMsg)}
              </Modal>
          </div>
        </auth_web>  
      </div>
    );
  }
}

Login_web.propTypes = {
  //who: React.PropTypes.string.isRequired,
};


// Returns nothing because it mutates the class
TranslatedComponent(Login_web);
export default Login_web;