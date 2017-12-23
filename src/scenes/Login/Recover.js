import React from 'react'
import TranslatedComponent from '../../utils/TranslatedComponent.js';
import { Link } from 'react-router-dom'


class Recover extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     'user':'',
     'pwd':''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    console.log(event.target.id);
    this.setState({[event.target.id]:event.target.value});
  }

  handleSubmit(event) {
    console.log(this.state);
    event.preventDefault();
  }
  componentDidMount() {
    
  }

  render() {
    return (
      <auth>

        <div className="basicOuter" >
      	  	<div className="basicInner">

      	    	<h1>{this.translate('register.recoverPwd.rot')}</h1>
              <form onSubmit={this.handleSubmit}>
                <div><label>{this.translate('email').toUpperCase()}</label></div>
                <div><input id="email" type="text"  onChange={this.handleChange} /></div>
                <div><div className="submitBtn" onClick={this.handleSubmit} >{this.translate('continue').toUpperCase()}</div></div>
              </form>
              <Link to='/login'><div className="backPB" >{this.translate('back')}</div></Link>
      		</div>
    	  </div>
      </auth>  
    );
  }
}

Recover.propTypes = {
  //who: React.PropTypes.string.isRequired,
};


// Returns nothing because it mutates the class
TranslatedComponent(Recover);
export default Recover;