import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import TranslatedComponent from '../../utils/TranslatedComponent.js';


// The Header creates links that can be used to navigate
// between routes.

class Invited extends React.Component {
	constructor(props) {
        super(props);
    }
    componentDidMount() {
    	
	}
  	render() {
	  	return(
	  		<Link to='/user/invitations' >
	  			<div className='subsc_item' >
	  				<div>{this.translate('user.invited')}</div>
	  				<div className="subsc_ico" >I</div>
	  				<div className={typeof this.props.data !=='undefined' && this.props.data.status ? 'hide' : 'subsc_nonActive' } >
	  					{this.translate('user.subsNonActive')}
	  				</div>
	  				<div className={typeof this.props.data !=='undefined' && this.props.data.status ? 'subsc_active' : 'hide' } >
	  					{this.translate('user.subsActive')}
	  				</div>
	  			</div>
	  		</Link>
	  	)
	  }
}
Invited.propTypes = {
  //who: React.PropTypes.string.isRequired,
};
TranslatedComponent(Invited);
export default Invited

