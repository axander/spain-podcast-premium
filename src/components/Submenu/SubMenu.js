import React from 'react'
import { Link } from 'react-router-dom'
import UsuarioApi from '../../services/api2.js'
import SubMenuPB from './SubMenuPB.js'


// The Header creates links that can be used to navigate
// between routes.

class Submenu extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
        	'sub':props.sub,
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
		  		<SubMenuPB ></ SubMenuPB>
		  		<menuOptions 
		  			className={
						this.state.show 
	      			} 
	      		>			    
				    <nav>
					    {
					        UsuarioApi.all(this.state.sub).map(p => (
					            <Link key={p.number} to={this.state.sub+'/'+p.number}><div>{p.name}</div></Link>
					        ))
					    }
				    </nav>

				</menuOptions>
				
			</div>
			
	  	)
	  }

}

export default Submenu