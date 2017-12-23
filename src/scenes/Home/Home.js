import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import TranslatedComponent from '../../utils/TranslatedComponent.js';
import Program from '../Program/Program.js'
import Channel from '../Channel/Channel.js'

class Home extends React.Component {
  constructor(props) {
    super(props);
    localStorage.setItem('lastState',props.location.pathname);
    this.state = {
      'toogle':true,
      'show': 'hideMenu',
      'loggedAs': localStorage.getItem('logged') ? 'basicBorderBtn inline' : 'hide',
      'notLogged': localStorage.getItem('logged') ? 'hide' : 'basicBorderBtn inline',
      'nickName': JSON.parse(localStorage.getItem('client')) ? JSON.parse(localStorage.getItem('client')).personalData.nickName : null
    };
  }
  componentDidMount() {
    // Will execute as normal
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
      <div className="home" >
        <div>
  	    	<h1>{this.translate('welcome')}</h1>
          <div>
            <Link to='/login' className='contrast'><div className={this.state.notLogged}>{this.translate('initSession')}</div></Link>
            <Link to='/user' className='contrast'><div className={this.state.loggedAs}>{this.translate('logged.as')}{this.state.nickName}</div></Link>
            <Link to='/register' className='contrast'><div className="basicBtn inline">{this.translate('create.account')}</div></Link>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-md-6">
            <Program/>
          </div>
          <div className="col-xs-12 col-md-6">
            <Channel/>
          </div>
        </div>
      </div>  
    );
  }
}

Home.propTypes = {
  //who: React.PropTypes.string.isRequired,
};


// Returns nothing because it mutates the class
TranslatedComponent(Home);
export default Home;