import React from 'react'
import Link from 'react-router-dom'
import { Modal, API } from '../../services/Rest.js'
import TranslatedComponent from '../../utils/TranslatedComponent.js';

class Invitations extends React.Component {
  constructor(props) {
    super(props);
    var client = JSON.parse(localStorage.getItem('client')).personalData;
    this.state = {
      'isOpen': localStorage.getItem('proccess') === 'subscribing' ? true : false,
      'showedMsg': localStorage.getItem('proccess') === 'subscribing' ? 'register.subscription.invited' : null ,
      'codesTo': JSON.parse(localStorage.getItem('client')).paymentData.codesTo,
      'codesFrom': JSON.parse(localStorage.getItem('client')).paymentData.codesFrom
    };
  }
  componentDidMount() {
    localStorage.getItem('proccess') === 'subscribing'
    ? localStorage.removeItem('proccess')
    : null;
  }
  toggleModal = () => {
    this.setState({
        isOpen: !this.state.isOpen
    });
   }
  render() {
    return (
      <invitations>
        <div>
          <div class="row">
            <div class="col-xs-12">
              <div className="inv_intro">
                Enter code to activate invitation
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-xs-6">
              <div>Invitation codes list Codes From</div>
              {
                this.state.codesFrom.map(p => (
                    <div className="inv_item" >
                      <div>{p.id}</div>
                      <div>{p.date}</div>
                      <div>{p.code}</div>
                      <div>{p.status}</div>
                      <div>{p.deferred}</div>
                      <div className={ !p.status ? 'code_nonActive':'hide'}>{this.translate('user.codeNonActive')} <div className="next" >►</div></div>
                      <div className={ p.status === 1 ? 'code_active':'hide'} >{this.translate('user.codeActive')}</div>
                      <div className={ p.status === 2 ? 'code_lapsed':'hide'} >{this.translate('user.codeLapsed')}</div>
                    </div>
                ))
              }
            </div>
            <div class="col-xs-6">
              <div>Invitation codes list Codes To</div>
              {
                this.state.codesTo.map(p => (
                    <div className="inv_item" >
                      <div>{p.id}</div>
                      <div>{p.date}</div>
                      <div>{p.code}</div>
                      <div>{p.status}</div>
                      <div>{p.deferred}</div>
                      <div className={ !p.status ? 'code_nonActive':'hide'}>{this.translate('user.codeNonSent')} <div className="next">►</div></div>
                      <div className={ p.status === 1 ? 'code_active':'hide'} >{this.translate('user.codeSent')}</div>
                      <form>
                        <div className={ p.status === 2 ? '':'hide'} ><input type="text" /></div>
                        <div className={ p.status === 2 ? 'code_lapsed':'hide'} >{this.translate('user.codeLapsed')}</div>
                      </form>
                    </div>
                ))
              }
            </div>
            
          </div>
        </div>
        <Modal show={this.state.isOpen} onClose={this.toggleModal} >
          {this.translate(this.state.showedMsg)}
        </Modal>
      </invitations> 
    );
  }
}

Invitations.propTypes = {
  //who: React.PropTypes.string.isRequired,
};


// Returns nothing because it mutates the class
TranslatedComponent(Invitations);
export default Invitations;