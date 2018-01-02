import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import TranslatedComponent from '../../utils/TranslatedComponent.js';


// The Header creates links that can be used to navigate
// between routes.

class Basic extends React.Component {
	constructor(props) {
        super(props);
    }
    componentDidMount() {
    	
	}
  	render() {
	  	return(
	  		<Link to='/user/personalData' >
	  			<div className='subsc_item' >
	  				<div>{this.translate('user.basic')}</div>
	  				<div className="subsc_ico" >B</div>
	  				<div className={typeof this.props.data !=='undefined' && this.props.data.status ? 'hide' : 'subsc_nonActive' } >
	  					{this.translate('user.subsNonActive')}
	  				</div>
	  				<div className={typeof this.props.data !=='undefined' &&  this.props.data.status ? 'subsc_active' : 'hide' } >
	  					{this.translate('user.subsActive')}
	  				</div>
	  			</div>
	  		</Link>
	  	)
	  }
}
Basic.propTypes = {
  //who: React.PropTypes.string.isRequired,
};
TranslatedComponent(Basic);
export default Basic

