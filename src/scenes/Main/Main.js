import React from 'react'
import { 
  Switch, 
  Route, 
  Link, 
  Redirect
} from 'react-router-dom'
import Logged from '../../services/Logged.js'
import { Modal, API } from '../../services/Rest.js'
import Settings from '../../components/Settings/Settings.js'
import FBPB from '../../components/FBPB.js'
/*import Dev from '../../components/Dev/Dev.js'*/
import IconMenu from '../../components/IconMenu/IconMenu.js'
import Menu from '../../components/Menu/Menu.js'
import ChannelMenu from '../../components/ChannelMenu/ChannelMenu.js'
import Logout from '../Login/Logout.js'
import Recover from '../Login/Recover.js'
import RecoverConfirm from '../Login/RecoverConfirm.js'
import Register from '../Login/Register.js'
import Confirm from '../Login/Confirm.js'
import Home from '../Home/Home.js'
import Program from '../Program/Program.js'
import Channel from '../Channel/Channel.js'
import Podcast from '../Podcast/Podcast.js'
import Terms from '../Terms/Terms.js'
import MainContainer from './MainContainer.js'
import TranslatedComponent from '../../utils/TranslatedComponent.js'
import Utils from '../../utils/Utils.js'
import AddPropsToRoute from '../../components/AddPropsToRoute.js'


const fakeAuth = {
  isAuthenticated:false,
  authenticate(cb){
    this.isAuthenticated = true;
    setTimeout(cb,100);
  },
  signout(cb){
    this.isAuthenticated = false;
    setTimeout(cb,100);
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) =>(
    //props.isAuthenticated = fakeAuth.isAuthenticated,
    localStorage.setItem('lastState',props.location.pathname),
    ( fakeAuth.isAuthenticated === true || Logged.getLogged(props) ) && !localStorage.getItem('error') 
          ? <Component {...props} />
          : <Redirect to={{
            pathname: '/login',
            state:{ from: props.location }
          }}/>
    )}/>
)


class Login extends React.Component{

  constructor(props) {
    super(props);
    console.log('here');
    console.log(props);this.state = { isOpen: true };
    this.state = {
     'email':'',
     'emailClass':'',
     'emailValidation':'',
     'pwd':'',
     'deactive': 'disabled',
     'showedMsg': localStorage.getItem('error'),
     'isOpen': localStorage.getItem('error') ? true : false,
     'loggedFb': localStorage.getItem('extStatus'),
     'statusSubscription':{},
     'lapsedSubscription':{},
     'codesData': {},
     'isOpen': false,
     'showedMsg': '' 
    };
    localStorage.removeItem('error')
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clickHandlerFB = this.clickHandlerFB.bind(this);
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
      this.setLogged(_response)
    )
    : this.setState({
          isOpen: true,
          showedMsg: 'login.error.' + _response.reason
      });
  }
  setLogged(){
    fakeAuth.authenticate(() => {
      this.setState(() => ({
        redirectToReferrer: true
      }))
    })
  }
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
  componentDidUpdate(){
    localStorage.getItem('error')
    ? ( this.setState({
          isOpen: true,
          showedMsg: localStorage.getItem('error')
      }) , localStorage.removeItem('error') )
    :null;
  }

  clickHandlerFB(event){
    window.checkLoginState()
  }
  toggleModal = () => {
      this.setState({
          isOpen: !this.state.isOpen
      });
   }
  render(){
    const {redirectToReferrer} = this.state
    const { from } = this.props.location.state || { from: { pathname:'/' } }
    if( redirectToReferrer === true ){
      return(
        <Redirect to={ from } />
      )
    }
    //<div><input type="submit" value={this.translate('continue').toUpperCase()} className="submitBtn" /></div>
    return (
      <auth>
        <div className="basicOuter" >
            <div className="basicInner">
              <h1>{this.translate('login')}</h1>
              <div><FBPB /></div>
              <div className="formOr" >------------------   {this.translate('register.or')}   ------------------</div>
              <form onSubmit={e => this.handleSubmit(e, this.login, this.onError)}>
                <div><label>{this.translate('email').toUpperCase()}</label></div>
                <div><input id="email" type="text"  onChange={this.handleChange} className={ this.state.emailClass} value={this.state.email} /></div>
                <div className="notValid_msg" >{this.state.emailValidation}</div>
                <div><label>{this.translate('password').toUpperCase()}</label></div>
                <div><input id="pwd" type="password" onChange={this.handleChange} value={this.state.pwd} /></div>
                <Link to='/recover' className='contrast'><div>{this.translate('register.recoverPwd')}</div></Link>
                <div><div className={"submitBtn " + this.state.deactive } onClick={e => this.handleSubmit(e, this.login, this.onError)} >{this.translate('continue').toUpperCase()}</div></div>
              </form>
              <Link to='/'><div className="backPB" >{this.translate('back')}</div></Link>
          </div>
        </div>
        <div>
          <Modal show={this.state.isOpen} onClose={this.toggleModal} >
              {this.translate(this.state.showedMsg)}
            </Modal>
        </div>
      </auth>  
    );
  }
}
TranslatedComponent(Login);


class Main extends React.Component {
  constructor(props) {
      super(props);
      this.state = { 
        isOpen: true,
        'statusSubscription':{},
        'lapsedSubscription':{},
        'codesData': {},
      };
  }
  updateSubscriptions(_subscriptionData, _email){
    this.state.lapsedSubscription = _subscriptionData.lapsed;
    this.state.codesData = _subscriptionData.codesData;
    this.state.statusSubscription = {
      'email': _email,
      'basic': _subscriptionData.lapsed.basic ? 2 : _subscriptionData.status.basic,                
      'invited': _subscriptionData.lapsed.invited ? 2 : _subscriptionData.status.invited,               
      'premium': _subscriptionData.lapsed.premium ? 2 : _subscriptionData.status.premium,
      'code': _subscriptionData.codeInv              
    }
    window.setSpinner();
    API.action('updateSubscription', this.state.statusSubscription, this.updateSubscriptionSuccess, this.updateSubscriptionError);
  }
  updateSubscriptionSuccess = (_response) => {
    /*this.setState({
          isOpen: true,
          showedMsg: this.state.lapsedSubscription.premium ? 'register.premiumLapsed' : this.state.lapsedSubscription.invited ? 'register.invitedLapsed' : 'register.basicLapsed'
      });*/
    var client = JSON.parse(localStorage.getItem('client'));
    client.paymentData.subscription.type.basic.status = this.state.statusSubscription.basic;
    client.paymentData.subscription.type.invited.status = this.state.statusSubscription.invited;
    client.paymentData.subscription.type.premium.status = this.state.statusSubscription.premium;
    client.paymentData.codesFrom = this.state.codesData;
    localStorage.setItem('client',JSON.stringify(client));
    this.state.lapsedSubscription.basic ? localStorage.setItem('proccess','register.basicLapsed') : null;
    this.state.lapsedSubscription.invited ? localStorage.setItem('proccess','register.invitedLapsed') : null;
    this.state.lapsedSubscription.premium ? localStorage.setItem('proccess','register.premiumLapsed') : null;
    window.location.href = './#/user/subscriptionData';
  }
  updateSubscriptionError = (_response, _error) =>{
    this.setState({
          isOpen: true,
          showedMsg: _error
      });
    /*this.setState(() => ({
        showedMsg: 'ERROR'
      }))*/
  }
  componentWillUpdate(){
    var subscriptionData = {};
    var client = JSON.parse(localStorage.getItem('client'));
    localStorage.getItem('logged') && !localStorage.getItem('checkingSubscription')
    ? ( 
      //check type of subscription from data
      localStorage.setItem('checkingSubscription', true),
      subscriptionData = Utils.checkSubscription(client.paymentData),
      console.log(subscriptionData),
      //check instant lapsed
      //subscriptionInfo = { 'type': typeSubscription, 'status': subscription, 'lapsed': lapsed, 'codesData': [codesFrom], 'codeInv': codeInv }
      subscriptionData.lapsed.premium || subscriptionData.lapsed.invited || subscriptionData.lapsed.basic
        ? this.updateSubscriptions(subscriptionData, client.personalData.email)
        : localStorage.getItem('checkingSubscription') ? localStorage.removeItem('checkingSubscription') : null
    )
    : null;
  }
  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/logout' component={Logout}/>
          <Route exact path='/register' component={Register}/>
          <Route exact path='/terms' component={Terms}/>
          <Route path='/confirm' component={Confirm}/>
          <Route exact path='/recover' component={Recover} />
          <Route exact path='/recover/confirm' component={RecoverConfirm} />
          <Route exact path='/program' component={Program} />
          <Route exact path='/program/:channel' component={Program} />
          <Route exact path='/podcast' component={Podcast} />
          <Route exact path='/podcast/:program' component={Podcast} />
          <Route exact path='/channel' component={Channel} />
          <Route exact path='/SPP_DEV' component={Home}/>
          <PrivateRoute exact path='/*' component={MainContainer} />
        </Switch>
        <ChannelMenu  />
        <Menu />
        <IconMenu />
        <Settings logout={fakeAuth}  />

        <Modal />
      </div>
    );
  }
}
//<PrivateRoute exact path='/*' component={AddPropsToRoute(MainContainer, this.props, fakeAuth )} />
Main.propTypes = {
  //who: React.PropTypes.string.isRequired,
};


// Returns nothing because it mutates the class
TranslatedComponent(Main);
export default Main;
