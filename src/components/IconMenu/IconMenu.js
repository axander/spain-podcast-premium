import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import later from '../../assets/images/later.png';
import download from '../../assets/images/download.png';
import fav from '../../assets/images/fav.png';
import history from '../../assets/images/history.png';
import share from '../../assets/images/share.png';
import user from '../../assets/images/user.png';
import TranslatedComponent from '../../utils/TranslatedComponent.js';


// The Header creates links that can be used to navigate
// between routes.

class IconMenu extends React.Component {
	constructor(props) {
        super(props);
        this.checkScene = this.checkScene.bind(this);
    }
    checkScene(_scene){
    	var checked = false;
    	localStorage.getItem('lastState').indexOf(_scene)>=0
    	? checked = true
    	: checked = false;
    	return checked
    }
  	render() {
	  	return(
	  		<iconmenu>
		  		<Link to="/favourites"><div className={ this.checkScene('/favourites') ? 'icoSelected' : 'icoNoSelected' } ><img src={fav} alt="fav" /></div></Link>
		  		<Link to="/downloads"><div className={ this.checkScene('/downloads') ? 'icoSelected' : 'icoNoSelected' } ><img src={download} alt="download" /></div></Link>
		  		<Link to="/later"><div className={ this.checkScene('/later') ? 'icoSelected' : 'icoNoSelected' } ><img src={later} alt="later" /></div></Link>
		  		<Link to="/history"><div className={ this.checkScene('/history') ? 'icoSelected' : 'icoNoSelected' } ><img src={history} alt="history" /></div></Link>
		  		<Link to="/shared"><div className={ this.checkScene('/shared') ? 'icoSelected' : 'icoNoSelected' } ><img src={share} alt="shared" /></div></Link>
		  		<Link to="/user"><div className={ this.checkScene('/user') ? 'icoSelected' : 'icoNoSelected' } ><img src={user} alt="user" /></div></Link>
		  	</iconmenu>
	  	)
	  }
}
IconMenu.propTypes = {
  //who: React.PropTypes.string.isRequired,
};
TranslatedComponent(IconMenu);
export default IconMenu

