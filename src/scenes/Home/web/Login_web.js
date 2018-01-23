import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import TranslatedComponent from '../../../utils/TranslatedComponent.js'
import FBPB from '../../../components/FBPB.js'
import { Modal, API } from '../../../services/Rest.js'
import './styles/login_web.scss'
import Utils from '../../../utils/Utils.js'


class Login_web extends React.Component {
  
  constructor(props) {
    super(props);
    this.state ={
      'email':'',
      'emailClass':'',
      'emailValidation':'',
      'pwd':'',
      'deactive': 'disabled',
      'showedMsg': false,
      'isOpen': false,
      'show':false,
      'loggedFb': localStorage.getItem('extStatus'),
      'statusSubscription':{},
      'lapsedSubscription':{},
      'codesData': {},
      'loggedAs': localStorage.getItem('logged') ? '' : 'hide',
      'notLogged': localStorage.getItem('logged') ? 'hide' : '',
      'nickName': JSON.parse(localStorage.getItem('client')) ? JSON.parse(localStorage.getItem('client')).personalData.nickName : null
    }
    this.toogle = this.toogle.bind(this);
    localStorage.removeItem('error')
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clickHandlerFB = this.clickHandlerFB.bind(this);
    this.register = this.register.bind(this);
    this.setUser = this.setUser.bind(this);
    this.resetUser = this.resetUser.bind(this);
    this.requireLogin = this.requireLogin.bind(this);

  }
  toogle(e){
    this.state.logged
    ? (
      window.location.href='#/user/subscriptionData',
      this.state.show = false
    )
    : ( 
      this.setState({
        'show': !this.state.show
      }),
      this.props.login.afterRequired = null
    )
  }
  setUser(){
    this.setState({
          logged: true,
          show: false,
          loggedAs: true,
          notLogged: 'hide',
          nickName: JSON.parse(localStorage.getItem('client')) ? JSON.parse(localStorage.getItem('client')).personalData.nickName : null
      })
  }
  resetUser(){
    this.setState({
        'logged': false,
        'loggedAs': 'hide',
        'notLogged': '',
        'nickName': ''
      });
  }
  requireLogin(_exec){
    this.setState({
      'show': true
    });
    this.props.login.afterRequired = _exec
  }
  componentDidMount() {
    this.props.login.required = this.requireLogin;
    this.props.login.setUser = this.setUser;
    this.props.login.resetUser = this.resetUser
  }
  componentDidUpdate(){
    localStorage.getItem('error')
    ? ( this.setState({
          isOpen: true,
          showedMsg: localStorage.getItem('error')
      }) , localStorage.removeItem('error') )
    :null;
  }
  handleChange(event) {
    switch(event.target.id){
      case 'email':
          this.setState({[event.target.id]:event.target.value});
          !Utils.validateEmail(event.target.value)
          ? this.setState({
            'emailValidation':this.translate('register.emailNotValid'),
            'emailClass':'notValid_input'
          })
          : this.setState({
            'emailValidation':'',
            'emailClass':''
          })
      break;
      case 'pwd':
          /*this.setState({[event.target.id]:event.target.value});
          this.state.pwd !== this.state.pwdRepit
          ? this.setState({
            'passwordNotMatch':this.translate('register.passwordNotMatch'),
            'pwdClass':'notValid_input'
          })
          : this.setState({
            'passwordNotMatch':'',
            'pwdClass':''
          })*/
      break;
      default:
          this.setState({[event.target.id]:event.target.value});
      break
    }
    this.setState({[event.target.id]:event.target.value});
    this.state.email !== '' && this.state.pwd !== '' && this.state.emailValidation === ''
    ? this.state.deactive = ''
    : this.state.deactive = 'disabled';
  }
  state = {
    redirectToReferrer : false
  }
  
  login = (_response) => {
    var subscriptionData = {};
    _response.status === 'successfull'
    ? (
      localStorage.setItem('logged',true),
      console.log(_response),
      localStorage.setItem('email',_response.data.personalData.email),
      localStorage.setItem('client',JSON.stringify(_response.data)),
      localStorage.setItem('token',_response.token),
      window.location.href='#/user',
      this.props.login.authenticate(),
      this.setState({
          logged: true,
          show: false,
          loggedAs: true,
          notLogged: 'hide',
          nickName: _response.data.personalData.nickName 
      })
    )
    : this.setState({
          isOpen: true,
          showedMsg: 'login.error.' + _response.reason
      });
  }
  /*setLogged(){
    fakeAuth.authenticate(() => {
      this.setState(() => ({
        redirectToReferrer: true
      }))
    })
  }*/
  onError = (_response, _error) =>{
    this.setState({
          isOpen: true,
          showedMsg: _error
      });
    /*this.setState(() => ({
        showedMsg: 'ERROR'
      }))*/
  }
  handleSubmit(event, _login, _onError) {
    console.log(this.state);
    window.setSpinner();
    this.setState(() => ({
        showedMsg: ''
      }))
    event.preventDefault();
    //API.action('','GET', { 'user':this.state.user, 'pwd':this.state.pwd}, this.login, this.onError);
    API.action('login', { 'email':this.state.email, 'pwd':this.state.pwd}, this.login, this.onError);
  }
  clickHandlerFB(event){
    window.checkLoginState()
  }
  toggleModal = () => {
      this.setState({
          isOpen: !this.state.isOpen
      });
   }
   register(e){
    this.state.show = false;
    window.location.href='/#/register';
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
                <div className="notValid_msg" >{this.state.emailValidation}</div>
                <div><input id="pwd" type="password" onChange={this.handleChange} className={ 'input_web_'+localStorage.getItem('template')} value={this.state.pwd} placeholder={this.translate('password')} /></div>
                <div class='row'>
                  <div class='col-xs-6' ><Link to='/recover' onClick={this.toogle} className='forgotPwdBtn'><div>{this.translate('register.recoverPwd')}</div></Link></div>
                  <div class='col-xs-6' ><div className={"initBtn " + this.state.deactive } onClick={e => this.handleSubmit(e, this.login, this.onError)} >{this.translate('header.initSession').toUpperCase()}</div></div>
                </div>
              </form>
              <div class='row'>
                  <div class='col-xs-6' ><div className='remember'>Recuérdame</div></div>
              </div>
              <div class='row registerRow'>
                  <div class='col-xs-6' ><div className={ 'noAccountRot noAccountRot_web_'+localStorage.getItem('template')}  >¿No tienes cuenta?</div></div>
                  <div class='col-xs-6' ><div onClick={this.register} className='registerBtn' >Registrate ahora</div></div>
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