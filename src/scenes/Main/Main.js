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
import Dev from '../../components/Dev/Dev.js'
import Menu from '../../components/Menu/Menu.js'
import Logout from '../Login/Logout.js'
import Recover from '../Login/Recover.js'
import Register from '../Login/Register.js'
import Confirm from '../Login/Confirm.js'
import Home from '../Home/Home.js'
import Program from '../Program/Program.js'
import Channel from '../Channel/Channel.js'
import MainContainer from './MainContainer.js'
import TranslatedComponent from '../../utils/TranslatedComponent.js'
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
     'user':'',
     'pwd':'',
     'showedError': localStorage.getItem('error'),
     'isOpen': localStorage.getItem('error') ? true : false,
     'loggedFb': localStorage.getItem('extStatus')
    };
    localStorage.removeItem('error')
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clickHandlerFB = this.clickHandlerFB.bind(this);
  }

  handleChange(event) {
    console.log(event.target.id);
    this.setState({[event.target.id]:event.target.value});
  }
  state = {
    redirectToReferrer : false
  }
  login = (_response) => {
    localStorage.setItem('logged',true);
    console.log(_response);
    localStorage.setItem('client',JSON.stringify(_response.data));
    localStorage.setItem('token',_response.token);
    fakeAuth.authenticate(() => {
      this.setState(() => ({
        redirectToReferrer: true
      }))
    })
  }
  onError = (_response, _error) =>{
    this.setState({
          isOpen: true,
          showedError: _error
      });
    /*this.setState(() => ({
        showedError: 'ERROR'
      }))*/
  }
  handleSubmit(event, _login, _onError) {
    console.log(this.state);
    window.setSpinner();
    this.setState(() => ({
        showedError: ''
      }))
    event.preventDefault();
    //API.action('','GET', { 'user':this.state.user, 'pwd':this.state.pwd}, this.login, this.onError);
    API.action('login', this.state, this.login, this.onError);
  }
  componentDidUpdate(){
    localStorage.getItem('error')
    ? ( this.setState({
          isOpen: true,
          showedError: localStorage.getItem('error')
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
                <div><label>{this.translate('user').toUpperCase()}</label></div>
                <div><input id="user" type="text"  onChange={this.handleChange} /></div>
                <div><label>{this.translate('password').toUpperCase()}</label></div>
                <div><input id="pwd" type="password" onChange={this.handleChange} /></div>
                <Link to='/recover' className='contrast'><div>{this.translate('register.recoverPwd')}</div></Link>
                <div><div className="submitBtn" onClick={e => this.handleSubmit(e, this.login, this.onError)} >{this.translate('continue').toUpperCase()}</div></div>
              </form>
              <Link to='/'><div className="backPB" >{this.translate('back')}</div></Link>
          </div>
        </div>
        <div>
          <Modal show={this.state.isOpen} onClose={this.toggleModal} >
              {this.translate(this.state.showedError)}
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
        isOpen: true
      };
  }
  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/logout' component={Logout}/>
          <Route exact path='/register' component={Register}/>
          <Route exact path='/confirm' component={Confirm}/>
          <Route exact path='/recover' component={Recover} />
          <Route exact path='/program' component={Program} />
          <Route exact path='/channel' component={Channel} />
          <Route exact path='/SPP_DEV' component={Home}/>
          <PrivateRoute exact path='/*' component={MainContainer} />
        </Switch>
        <Dev />
        <Menu />
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
