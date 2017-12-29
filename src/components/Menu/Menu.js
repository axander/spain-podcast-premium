import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import MenuPB from './MenuPB.js'
import TranslatedComponent from '../../utils/TranslatedComponent.js';
// The Header creates links that can be used to navigate
// between routes.

class Menu extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
        	'show': '',
        	'toogle':false
        };
        this.clickHandler = this.clickHandler.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.checkScene = this.checkScene.bind(this);
    }
	clickHandler(event){
		if(!this.state.toogle || this.state.show === '' ){
			this.state.toogle = true
			this.setState({
			    'show': 'showMenu'
			}),
			document.getElementById('root').addEventListener('click', this.handleClickOutside, true)
		}else if(this.state.toogle ){
			this.state.toogle = false;
			this.setState({
			    'show': ''
			});
			document.getElementById('root').removeEventListener('click', this.handleClickOutside, true)
		}
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
	  		<div  onClick={ this.clickHandler } >
		  		<MenuPB ></ MenuPB>
		  		<menuOptions id="menuContainer" 
		  			className={
						this.state.show 
	      			} 
	      		>
				    <nav>
				    	<div className="scrollCont" >
				    		<div className="scrollableCont" >
						        <Link to='/'><div className={ this.checkScene('/') && localStorage.getItem('lastState') ==='/' ? 'opSelected' : 'opNoSelected' } >{this.translate('menu.home')}</div></Link>
						        <Link to='/channel'><div className={ this.checkScene('/channel') ? 'opSelected' : 'opNoSelected' } >{this.translate('menu.channel')}</div></Link>
						        <Link to='/program'><div className={ this.checkScene('/program') ? 'opSelected' : 'opNoSelected' } >{this.translate('menu.program')}</div></Link>
						        <Link to='/podcast'><div className={ this.checkScene('/podcast') ? 'opSelected' : 'opNoSelected' } >{this.translate('menu.podcast')}</div></Link>
						        <Link to='/content'><div className={ this.checkScene('/content') ? 'opSelected' : 'opNoSelected' } >{this.translate('menu.content')}</div></Link>
						    </div>
					    </div>
				    </nav>
				</menuOptions>
				
			</div>
			
	  	)
	  }

}
Menu.propTypes = {
  //who: React.PropTypes.string.isRequired,
};


// Returns nothing because it mutates the class
TranslatedComponent(Menu);
export default Menu