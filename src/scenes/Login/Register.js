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
     'terms':false,
     'showedMsg': localStorage.getItem('error'),
     'isOpen': localStorage.getItem('error') ? true : false,
     'deactive': 'disabled',
     'success':false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  resetForm = () => {
    this.setState(this.baseState)
  }
  componentDidMount() {
    this.setState({
      'style':{
        'margin-top':document.querySelector('.breadcrumb') ? document.querySelector('.breadcrumb').offsetHeight + 'px' : '0'
      }
    })
  }
  componentWillUnmount(){
    Utils.scrollToTop(300);
  }
  componentDidUpdate() {
    
    // Will execute as normal
  }
  onSuccess = (_response) => {
    _response.status === 'successfull'
    ? this.setState({
          isOpen: true,
          showedMsg: 'register.successfull',
          success: true
      })
    : this.setState({
          isOpen: true,
          showedMsg: 'register.' + _response.reason
      });
  }
  onError = (_response, _error) =>{
    this.setState({
          isOpen: true,
          showedMsg: _error
      });
  }
  toggleModal = () => {
      this.setState({
          isOpen: !this.state.isOpen
      });
   }
  handleChange(event) {
    
    switch(event.target.id){
      case 'email':
          this.setState({[event.target.id]:event.target.value});
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
          this.setState({[event.target.id]:event.target.value});
          this.state.pwd !== this.state.pwdRepit
          ? this.setState({
            'passwordNotMatch':this.translate('register.passwordNotMatch'),
            'pwdClass':'notValid_input'
          })
          : this.setState({
            'passwordNotMatch':'',
            'pwdClass':''
          })
      break;
      case 'pwdRepit':
          this.setState({[event.target.id]:event.target.value});
          this.state.pwd !== this.state.pwdRepit
          ? this.setState({
            'passwordNotMatch':this.translate('register.passwordNotMatch'),
            'pwdClass':'notValid_input'
          })
          : this.setState({
            'passwordNotMatch':'',
            'pwdClass':''
          })
      break;
      case 'nick':
          this.setState({[event.target.id]:event.target.value});
      break;
      case 'terms':
          this.setState({[event.target.id]:event.target.checked});
          this.setState({
            'terms':event.target.checked
          })
      break;
      default:
          this.setState({[event.target.id]:event.target.value});
      break
    }
    this.state.email !== '' && this.state.pwd !== '' && this.state.pwdRepit !== '' && this.state.nick !== ''
    && this.state.emailValidation === '' && this.state.passwordNotMatch === '' && this.state.terms
    ? this.state.deactive = ''
    : this.state.deactive = 'disabled';
    
  }
  handleSubmit(event) {
    window.setSpinner();
    this.setState(() => ({
        showedMsg: ''
      }))
    event.preventDefault();
    API.action('createAccount', this.state, this.onSuccess, this.onError);
  }


  render() {
    if(this.state.success){
        return (
          <auth style={this.state.style} >
            <div className="basicOuter" >
              <div className="basicInner">
                  <div>{this.translate('register.successfull')}</div>
                  <Link to='/'><div className="backPB" >{this.translate('back')}</div></Link>
              </div>
            </div>
          </auth> 
          )
      }
    return (
      <div className='mainContainer' style={this.state.style} >
        <register>
          <div class='register'>
            <div className="basicOuter" >
          	  	<div className="basicInner">
          	    	<h1>{this.translate('create.account')}</h1>
                  <form onSubmit={this.handleSubmit} autocomplete="on" >
                    <div><label>{this.translate('email').toUpperCase()}</label></div>
                    <div><input id="email" type="text"  onChange={this.handleChange} className={ this.state.emailClass} value={this.state.email} /></div>
                    <div className="notValid_msg" >{this.state.emailValidation}</div>
                    <div><label>{this.translate('nick').toUpperCase()}</label></div>
                    <div><input id="nick" type="text"  onChange={this.handleChange} value={this.state.nick} /></div>
                    <div><label>{this.translate('password').toUpperCase()}</label></div>
                    <div><input id="pwd" type="password" onChange={this.handleChange} className={ this.state.pwdClass } value={this.state.pwd} /></div>
                    <div className="notValid_msg" >{this.state.passwordNotMatch}</div>
                    <div><label>{this.translate('password.repit').toUpperCase()}</label></div>
                    <div><input id="pwdRepit" type="password" onChange={this.handleChange} className={ this.state.pwdClass } value={this.state.pwdRepit} /></div>
                    <div><input id="terms" type="checkbox" onChange={this.handleChange}  checked={this.state.terms}  /><Link to='/terms' target="_blank" > {this.translate('user.terms').toUpperCase()}</Link></div>
                    <div><div className={"submitBtn " + this.state.deactive }  onClick={this.handleSubmit} >{this.translate('continue').toUpperCase()}</div></div>
                  </form>
                  <Link to='/'><div className="backPB" >{this.translate('back')}</div></Link>
          		</div>
        	  </div>
            <Modal show={this.state.isOpen} onClose={this.toggleModal} >
              {this.translate(this.state.showedMsg)}
            </Modal>
        </div>
      </register>
    </div>  
    );
  }
}
Register.propTypes = {
  //who: React.PropTypes.string.isRequired,
};


// Returns nothing because it mutates the class
TranslatedComponent(Register);
export default Register;