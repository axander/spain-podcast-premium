import React from 'react'
import TranslatedComponent from '../../utils/TranslatedComponent.js';
import Utils from '../../utils/Utils.js';
import { Modal, API } from '../../services/Rest.js'

class DeleteAccount extends React.Component {
  constructor(props) {
    super(props);
    var client = JSON.parse(localStorage.getItem('client')).personalData;
    this.state = {
      'name':client.name,
      'surname':client.surname,
      'email':client.email,
      'nickName':client.nickName
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    window.setSpinner();
    this.setState(() => ({
        showedMsg: ''
      }))
    event.preventDefault();
    API.action('savePersonalData', this.state, this.onSuccess, this.onError);
  }
  onSuccess = (_response) => {
    _response.status === 'successfull'
    ? ( 
      this.setState({
          'isOpen': true,
          'showedMsg': 'user.form.successful',
      })
    )
    : this.setState({
          isOpen: true,
          showedMsg: 'user.form.' + _response.reason
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
  componentDidMount() {
    // Will execute as normal
  }
  render() {
    return (
      <deleteAccount>
        <div className="container" >
          <form onSubmit={this.handleSubmit}>
            <div className="row">
              <div class="col-xs-12 col-md-6">
                <div><label>{this.translate('user.nick').toUpperCase()}</label></div>
                <div><input id="nickName" type="text" value={this.state.nickName} /></div>
              </div>
              <div class="col-xs-12 col-md-6">
                <div><label>{this.translate('user.email').toUpperCase()}</label></div>
                <div><input id="email" type="text"  value={this.state.email} /></div>
              </div>
            </div>
            <div className="row">
              <div class="col-xs-12 col-md-6">
                <div><label>{this.translate('user.name').toUpperCase()}</label></div>
                <div><input id="name" type="text"  value={this.state.name} /></div>
              </div>
              <div class="col-xs-12 col-md-6">
                <div><label>{this.translate('user.surname').toUpperCase()}</label></div>
                <div><input id="surname" type="text" value={this.state.surname} /></div>
              </div>
            </div>
            <div><div className="submitBtn" onClick={this.handleSubmit} >{this.translate('continue').toUpperCase()}</div></div>
          </form>
        </div>
        <Modal show={this.state.isOpen} onClose={this.toggleModal} >
          {this.translate(this.state.showedMsg)}
        </Modal>
      </deleteAccount> 
    );
  }
}

DeleteAccount.propTypes = {
  //who: React.PropTypes.string.isRequired,
};


// Returns nothing because it mutates the class
TranslatedComponent(DeleteAccount);
export default DeleteAccount;