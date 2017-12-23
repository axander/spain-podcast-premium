import React from 'react'
import { 
  Switch, 
  Route, 
  Link, 
  Redirect
} from 'react-router-dom'
import { Modal, API } from '../../services/Rest.js'
import Settings from '../../components/Settings/Settings.js'
import FBPB from '../../components/FBPB.js'
import Menu from '../../components/Menu/Menu.js'
import Auth from '../Login/Auth.js'
import Recover from '../Login/Recover.js'
import Home from '../Home/Home.js'
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
    fakeAuth.isAuthenticated === true || localStorage.getItem('logged')
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
     'showedError':'',
     'isOpen': false 
    };

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
    localStorage.setItem('client',JSON.stringify(_response))
    fakeAuth.authenticate(() => {
      this.setState(() => ({
        redirectToReferrer: true
      }))
    })
  }
  logout = () => {
    fakeAuth.authenticate(() => {
      this.setState(() => ({
        redirectToReferrer: false,
        isOpen: true,
        showedError: 'bye'
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
    this.setState(() => ({
        showedError: ''
      }))
    event.preventDefault();
    //API.action('','GET', { 'user':this.state.user, 'pwd':this.state.pwd}, this.login, this.onError);
    API.action('user/login','POST', this.state, this.login, this.onError);
  }
  componentDidMount() {
    
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

    return (
      <auth>
        <div className="basicOuter" >
            <div className="basicInner">
              <h1>{this.translate('login')}</h1>
              <form onSubmit={e => this.handleSubmit(e, this.login, this.onError)}>
                <div><label>{this.translate('user').toUpperCase()}</label></div>
                <div><input id="user" type="text"  onChange={this.handleChange} /></div>
                <div><label>{this.translate('password').toUpperCase()}</label></div>
                <div><input id="pwd" type="password" onChange={this.handleChange} /></div>
                <Link to='/recover' className='contrast'><div>{this.translate('register.recoverPwd')}</div></Link>
                <div><input type="submit" value="Submit" /></div>
              </form>
              <div><FBPB /></div>
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
      this.state = { isOpen: true };
  }
  componentDidMount() {
    
  }
  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/recover' component={Recover} />
          <Route exact path='/SPP_DEV' component={AddPropsToRoute(Auth, fakeAuth)}/>
          <PrivateRoute exact path='/*' component={MainContainer} />
        </Switch>
        <Menu />
        <Settings logout={fakeAuth} />
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
