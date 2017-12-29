import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import { Modal, API } from '../../services/Rest.js'
import SettingsPB from './SettingsPB.js'
import TranslationPicker from '../TranslationPicker.js';
import TranslatedComponent from '../../utils/TranslatedComponent.js';
// The Header creates links that can be used to navigate
// between routes.

class Settings extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
        	'show': '',
        	'toogle':false,
        	'logout': this.props.logout.isAuthenticated || localStorage.getItem('logged') ? 'showLogOut' : 'hideLogOut'
        };
        this.clickHandler = this.clickHandler.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.checkScene = this.checkScene.bind(this);
    }
	clickHandler(e){
		if(!this.state.toogle || this.state.show === '' ){
			this.state.toogle = true
			this.setState({
			    'show': 'showMenu',
			    'logout': this.props.logout.isAuthenticated || localStorage.getItem('logged') ? 'showLogOut' : 'hideLogOut' 
			}),
			document.getElementById('root').addEventListener('click', this.handleClickOutside, true)
		}else if(this.state.toogle ){
			this.state.toogle = false;
			this.setState({
			    'show': '',
			    'logout': this.props.logout.isAuthenticated || localStorage.getItem('logged') ? 'showLogOut' : 'hideLogOut' 
			});
			document.getElementById('root').removeEventListener('click', this.handleClickOutside, true)
		}
		e.target.id === 'logoutPB'
		? ( window.setSpinner() , API.action('logout', this.state, this.logout, this.onError) )
		: null;
    }
    onError = (_response, _error) =>{
    	this.setState({
          isOpen: true,
          showedError: _error
      	});
    }
    logout = (_response) => {
    	_response.status === 'successfull'
    	? ( localStorage.removeItem('logged'), localStorage.removeItem('token'),
			localStorage.removeItem('client'),
			typeof localStorage.getItem('extStatus') !== 'undefined' && JSON.parse(localStorage.getItem('extStatus')) && JSON.parse(localStorage.getItem('extStatus')).authResponse && JSON.parse(localStorage.getItem('extStatus')).authResponse.accessToken ? window.logoutFb() : null,
			this.props.logout.signout() ,
			document.getElementById('root')['submenu'].handler = null
			)
    	: alert('failed');
    }
    checkScene(_scene){
    	var checked = false;
    	localStorage.getItem('lastState').indexOf(_scene)>=0
    	? checked = true
    	: checked = false;
    	return checked
    }
    componentDidMount() {
	    
	}
	componentWillUnmount() {
	    document.getElementById('root').removeEventListener('click', this.handleClickOutside, true);
	}
	handleClickOutside(event) {
	    const domNode = ReactDOM.findDOMNode(this);
	    if (!domNode || !domNode.contains(event.target)) {
	        this.setState({
			    'show': ''
			 });
	    }
	    document.getElementById('root').removeEventListener('click', this.handleClickOutside, true);
	}
  	render() {
	  	return(
	  		<div onClick={ this.clickHandler } >
	  			
		  		<SettingsPB ></ SettingsPB>
		  		<menuOptions 
		  			className={
						this.state.show 
	      			} 
	      		>
	      			<nav>
	      				<div className="scrollCont" >
				    		<div className="scrollableCont" >
				    			<Link to='/logout' id='logoutPB' className={this.state.logout} >Log Out</Link>
				    			<TranslationPicker />
				        		<Link to='/user'><div className={ this.checkScene('/user') ? 'opSelected' : 'opNoSelected' } >{this.translate('menu.user')}</div></Link>
				        		<Link to='/notdefined'><div>...</div></Link>
						        <Link to='/notdefined'><div>...</div></Link>
						        <Link to='/notdefined'><div>...</div></Link>
						        <Link to='/notdefined'><div>...</div></Link>
						        <Link to='/notdefined'><div>...</div></Link>
						        <Link to='/notdefined'><div>...</div></Link>
						        <Link to='/notdefined'><div>...</div></Link>
						        <Link to='/notdefined'><div>...</div></Link>
						        <Link to='/notdefined'><div>...</div></Link>
						        <Link to='/notdefined'><div>...</div></Link>
						        <Link to='/notdefined'><div>...</div></Link>
						        <Link to='/notdefined'><div>...</div></Link>
						        <Link to='/notdefined'><div>...</div></Link>
						        <Link to='/notdefined'><div>...</div></Link>
						        <Link to='/notdefined'><div>...</div></Link>
						        <Link to='/notdefined'><div>...</div></Link>
						        <Link to='/notdefined'><div>...</div></Link>
						        <Link to='/notdefined'><div>...</div></Link>
						        <Link to='/notdefined'><div>...</div></Link>
						        <Link to='/notdefined'><div>...</div></Link>
						        <Link to='/notdefined'><div>...</div></Link>
						        <Link to='/notdefined'><div>...</div></Link>
						        <Link to='/notdefined'><div>...</div></Link>
						        <Link to='/notdefined'><div>...</div></Link>
						        <Link to='/notdefined'><div>...</div></Link>
						        <Link to='/notdefined'><div>...</div></Link>
						        <Link to='/notdefined'><div>...</div></Link>
						        <Link to='/notdefined'><div>...</div></Link>
						        <Link to='/notdefined'><div>...</div></Link>
						        <Link to='/notdefined'><div>...</div></Link>
						        <Link to='/notdefined'><div>...</div></Link>
						        <Link to='/notdefined'><div>...</div></Link>
						        <Link to='/notdefined'><div>...</div></Link>
						        <Link to='/notdefined'><div>...</div></Link>
						        <Link to='/notdefined'><div>...</div></Link>
						        <Link to='/notdefined'><div>FIN</div></Link>
				        	</div>
				        </div>
				    </nav>			    

				</menuOptions>
				
			</div>
			
	  	)
	  }

}
Settings.propTypes = {
  //who: React.PropTypes.string.isRequired,
};


// Returns nothing because it mutates the class
TranslatedComponent(Settings);
export default Settings