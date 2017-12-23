import React from 'react'
import TranslatedComponent from '../../utils/TranslatedComponent.js';
import { Link } from 'react-router-dom'
import { Modal, API } from '../../services/Rest.js'


class Confirm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     'showedError': localStorage.getItem('error'),
     'isOpen': localStorage.getItem('error') ? true : false,
     'loggedAs': localStorage.getItem('logged') ? 'basicBorderBtn inline' : 'hide',
     'notLogged': localStorage.getItem('logged') ? 'hide' : 'contrast basicBorderBtn inline',
     'nickName': JSON.parse(localStorage.getItem('client')) ? JSON.parse(localStorage.getItem('client')).personalData.nickName : null,
     'msg':!localStorage.getItem('logged') ? this.translate('confirm.wait') : this.translate('confirm.successful')
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    var urlParameters = [];
    typeof window.location.href.split('?')[1] !== 'undefined'
    ? ( urlParameters = window.location.href.split('?')[1].split('&'),
        this.setParameters(),
        window.setSpinner(),
        this.setState(() => ({
          showedError: ''
        })),
        window.history.replaceState({}, document.title, "./#/confirm"),
        API.action('confirmAccount', this.state, this.onSuccess, this.onError)
      )
    : this.setState(() => ({
          'isOpen': true,
          'notLogged': localStorage.getItem('logged') ? 'hide' : 'contrast basicBorderBtn inline',
          'msg': '',
          'showedError': 'confirm.0003'
        }));
    
  }
  setParameters(_urlParameters){
    for( var j in _urlParameters){
          var param = _urlParameters[j].split('=');
          this.state[param[0]] = param[1];
        }
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
    _response.status === 'successfull'
    ? ( 
      localStorage.setItem('logged',true),
      console.log(_response),
      localStorage.setItem('client',JSON.stringify(_response.data)),
      localStorage.setItem('token',_response.token),
      this.setState({
          'isOpen': true,
          'showedError': 'confirm.successful',
          'loggedAs': localStorage.getItem('logged') ? 'basicBorderBtn inline' : 'hide',
          'notLogged': localStorage.getItem('logged') ? 'hide' : 'basicBorderBtn inline',
          'nickName': JSON.parse(localStorage.getItem('client')) ? JSON.parse(localStorage.getItem('client')).personalData.nickName : null,
          'msg': this.translate('confirm.successful')
      })
    )
    : this.setState({
          isOpen: true,
          showedError: 'confirm.' + _response.reason
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
    
  }


  render() {
    return (
      <auth>
        <div className="basicOuter" >
      	  	<div className="basicInner">
              <div>{this.state.msg}</div>
              <Link to='/' className="contrast" ><div  className={this.state.notLogged} >{this.translate('back')}</div></Link>
              <Link to='/user' className='contrast'><div className={this.state.loggedAs}>{this.translate('logged.as')}{this.state.nickName}</div></Link>
      		</div>
    	  </div>
        <Modal show={this.state.isOpen} onClose={this.toggleModal} >
          {this.translate(this.state.showedError)}
        </Modal>
      </auth>  
    );
  }
}

Confirm.propTypes = {
  //who: React.PropTypes.string.isRequired,
};


// Returns nothing because it mutates the class
TranslatedComponent(Confirm);
export default Confirm;