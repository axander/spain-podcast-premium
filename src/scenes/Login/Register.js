import React from 'react'
import TranslatedComponent from '../../utils/TranslatedComponent.js';
import Utils from '../../utils/Utils.js';
import { Link } from 'react-router-dom'
import { Modal, API } from '../../services/Rest.js'


class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     'email':'',
     'emailClass':'',
     'emailValidation':'',
     'nick':'',
     'pwd':'',
     'passwordNotMatch':'',
     'pwdClass':'',
     'pwdRepit':'',
     'showedError': localStorage.getItem('error'),
     'isOpen': localStorage.getItem('error') ? true : false,
     'deactive': 'disabled'
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
    switch(event.target.id){
      case 'email':
          !Utils.validateEmail(event.target.value)
          ? this.setState({
            'emailValidation':this.translate('register.emailNotValid'),
            'emailClass':'notValid_input'
          })
          : this.setState({
            'emailValidation':'',
            'emailClass':''
          })
      break;
      case 'pwd':
          this.state.pwd !== this.state.pwdRepit
          ? this.setState({
            'passwordNotMatch':this.translate('register.passwordNotMatch'),
            'pwdClass':'notValid_input'
          })
          : this.setState({
            'passwordNotMatch':'',
            'pwdClass':''
          })
      case 'pwdRepit':
          this.state.pwd !== this.state.pwdRepit
          ? this.setState({
            'passwordNotMatch':this.translate('register.passwordNotMatch'),
            'pwdClass':'notValid_input'
          })
          : this.setState({
            'passwordNotMatch':'',
            'pwdClass':''
          })
      default:
      break
    }
    this.state.email !== '' && this.state.pwd !== '' && this.state.pwdRepit !== '' && this.state.nick !== ''
    && this.state.emailValidation === '' && this.state.passwordNotMatch === ''
    ? this.state.deactive = ''
    : this.state.deactive = 'disabled';
    
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
                <div><input id="email" type="text"  onChange={this.handleChange} className={ this.state.emailClass } /></div>
                <div className="notValid_msg" >{this.state.emailValidation}</div>
                <div><label>{this.translate('nick').toUpperCase()}</label></div>
                <div><input id="nick" type="text"  onChange={this.handleChange} /></div>
                <div><label>{this.translate('password').toUpperCase()}</label></div>
                <div><input id="pwd" type="password" onChange={this.handleChange} className={ this.state.pwdClass } /></div>
                <div className="notValid_msg" >{this.state.passwordNotMatch}</div>
                <div><label>{this.translate('password.repit').toUpperCase()}</label></div>
                <div><input id="pwdRepit" type="password" onChange={this.handleChange} className={ this.state.pwdClass } /></div>
                <div><div className={"submitBtn " + this.state.deactive }  onClick={this.handleSubmit} >{this.translate('continue').toUpperCase()}</div></div>
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