import React from 'react'
import { Modal, API } from '../../services/Rest.js'
import Submenu from '../../components/Submenu/Submenu.js'
import UsuarioApi from '../../services/api2.js'
import SingleLayout from '../../components/SingleLayout/SingleLayout.js'
import { Link, Route } from 'react-router-dom'
import TranslatedComponent from '../../utils/TranslatedComponent.js';
import Utils from '../../utils/Utils.js';

class Channel extends React.Component {
  constructor(props) {
    super(props);
    typeof props.location !== 'undefined'
    ? localStorage.setItem('lastState',props.location.pathname)
    : null;
    this.state = {
      'data':[ ]
    }
    this.clickHandler = this.clickHandler.bind(this);
  }
  onSuccess = (_response) => {
    _response.status === 'successfull'
    ? ( 
      this.setState ({
        'data':_response.data
      }),
      localStorage.setItem('channels', JSON.stringify(_response.data))
    )
    : this.setState({
        isOpen: true,
        showedMsg: 'channels.' + _response.reason
    });
  }
  clickHandler(event){
    event.target.id !== localStorage.getItem('lastChannel')
    ? (
        localStorage.removeItem('lastProgram'),
        localStorage.removeItem('lastPodcast')
      )
    : null;
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

  componentDidMount(){
    typeof localStorage.getItem('channels')!=='undefined'  && localStorage.getItem('channels')
    ? this.setState ({
        'data':JSON.parse(localStorage.getItem('channels'))
      })
    : ( 
      API.action('getListChan', {}, this.onSuccess, this.onError, 'get'),
      window.setSpinner()
      )
  }

  render() {
    return (
      <div className={ Utils.checkScene('/channel') ? 'channel' : 'channel resetPaddingBottom' }>
        <div className={ Utils.checkScene('/channel') ? '' : 'hide' } >
          <h1>{this.translate('menu.channel').toUpperCase()}</h1>
        </div>
        <div className={ Utils.checkScene('/channel') ? '' : 'resetPaddingTop' }>
          <div class="row" >
            {
              this.state.data.map(p => (
                  <div className={ p.id === localStorage.getItem('lastChannel') ? "col-xs-12 col-md-6 col-lg-4 contentSelected" : "col-xs-12 col-md-6 col-lg-4" } >
                    <Link to={'/program/'+p.id} >
                      <div id={p.id} className="row item" id={p.id} style={ 'background-image:url("' + p.image + '")'} onClick={this.clickHandler} >
                        <div className="col-xs-6 ">
                          <div className="rot">
                            {p.name[localStorage.getItem('language')]}
                          </div>
                        </div>
                        <div class="col-xs-6">
                          <div className="desc">
                            {p.desc[localStorage.getItem('language')]}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
              ))
            }
          </div>
        </div>
        <Modal show={this.state.isOpen} onClose={this.toggleModal} >
          {this.translate(this.state.showedMsg)}
        </Modal>
      </div> 
    );
  }
}

Channel.propTypes = {
  //who: React.PropTypes.string.isRequired,
};


// Returns nothing because it mutates the class
TranslatedComponent(Channel);
export default Channel;