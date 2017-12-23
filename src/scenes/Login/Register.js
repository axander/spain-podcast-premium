import React from 'react'
import TranslatedComponent from '../../utils/TranslatedComponent.js';
import { Link } from 'react-router-dom'
import { Modal, API } from '../../services/Rest.js'


class Register extends React.Component {
  constructor(props) {
    super(props);
    console.log('here');
    console.log(props);
    this.state = {
     'email':'',
     'nick':'',
     'password':'',
     'showedError': localStorage.getItem('error'),
     'isOpen': localStorage.getItem('error') ? true : false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    
  }
  componentDidUpdate(){
    /*localStorage.getItem('error')
    ? ( this.setState({
          isOpen: true,
          showedError: localStorage.getItem('error')
      }) , localStorage.removeItem('error') )
    :null;*/
  }
  onSuccess = (_response) => {
    _response.status === 'successful'
    ? alert('ok')
    : this.setState({
          isOpen: true,
          showedError: 'register.' + _response.reason
      });
  }
  onError = (_response, _error) =>{
    this.setState({
          isOpen: true,
          showedError: _error
      });
  }
  toggleModal = () => {
      this.setState({
          isOpen: !this.state.isOpen
      });
   }
  handleChange(event) {
    console.log(event.target.id);
    this.setState({[event.target.id]:event.target.value});
  }
  handleSubmit(event) {
    window.setSpinner();
    this.setState(() => ({
        showedError: ''
      }))
    event.preventDefault();
    API.action('createAccount', this.state, this.onSuccess, this.onError);
  }


  render() {
    return (
      <auth>

        <div className="basicOuter" >
      	  	<div className="basicInner">

      	    	<h1>{this.translate('create.account')}</h1>
              <form onSubmit={this.handleSubmit}>
                <div><label>{this.translate('email').toUpperCase()}</label></div>
                <div><input id="email" type="text"  onChange={this.handleChange} /></div>
                <div><label>{this.translate('nick').toUpperCase()}</label></div>
                <div><input id="nick" type="text"  onChange={this.handleChange} /></div>
                <div><label>{this.translate('password').toUpperCase()}</label></div>
                <div><input id="pwd" type="text" onChange={this.handleChange} /></div>
                <div><label>{this.translate('password.repit').toUpperCase()}</label></div>
                <div><input id="pwd" type="text" onChange={this.handleChange} /></div>
                <Link to='/recover' className='contrast'><div>{this.translate('register.recoverPwd')}</div></Link>
                <div><div className="submitBtn" onClick={this.handleSubmit} >{this.translate('continue').toUpperCase()}</div></div>
              </form>
              <Link to='/'><div className="backPB" >{this.translate('back')}</div></Link>
      		</div>
    	  </div>
        <Modal show={this.state.isOpen} onClose={this.toggleModal} >
          {this.translate(this.state.showedError)}
        </Modal>
      </auth>  
    );
  }
}

Register.propTypes = {
  //who: React.PropTypes.string.isRequired,
};


// Returns nothing because it mutates the class
TranslatedComponent(Register);
export default Register;