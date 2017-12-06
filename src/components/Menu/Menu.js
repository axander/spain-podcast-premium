import React from 'react'
import { Link } from 'react-router-dom'
import MenuPB from './MenuPB.js'

// The Header creates links that can be used to navigate
// between routes.

class Menu extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
        	'toogle':true,
        	'show': 'hideMenu'
        };
    }
	clickHandler = () => {
		this.setState({
			'toogle': !this.state.toogle,
		    'show': this.state.toogle ? 'showMenu' : ''
		 });
    }
  	render() {
	  	return(
	  		<div onClick={ this.clickHandler } >
		  		<MenuPB ></ MenuPB>
		  		<menuOptions 
		  			className={
						this.state.show 
	      			} 
	      		>			    

				    <nav>
				        <Link to='/'><div>Home</div></Link>
				        <Link to='/user'><div>Usuario</div></Link>
				        <Link to='/content'><div>Listados de Contenidos</div></Link>
				        <Link to='/podcast'><div>Podcast</div></Link>
				    </nav>

				</menuOptions>
			</div>
			
	  	)
	  }

}

export default Menu