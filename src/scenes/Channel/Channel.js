import React from 'react'
import { Modal, API } from '../../services/Rest.js'
import Submenu from '../../components/Submenu/Submenu.js'
import UsuarioApi from '../../services/api2.js'
import SingleLayout from '../../components/SingleLayout/SingleLayout.js'
import later from '../../assets/images/later.png'
import fav from '../../assets/images/fav.png'
import share from '../../assets/images/share.png'
import { Link, Route } from 'react-router-dom'
import TranslatedComponent from '../../utils/TranslatedComponent.js'
import Utils from '../../utils/Utils.js'
import Lists from '../../utils/Lists.js'
import './channel.scss'

class Channel extends React.Component {
  constructor(props) {
    super(props);
    console.log('channel');
    console.log(props);
    typeof props.location !== 'undefined'
    ? localStorage.setItem('lastState',props.location.pathname)
    : null;
    this.state = {
      'data':[ ]
    }
    this.clickHandler = this.clickHandler.bind(this);
    this.clickHandlerChannelLater = this.clickHandlerChannelLater.bind(this);
    this.clickHandlerChannelFav = this.clickHandlerChannelFav.bind(this);
    this.clickHandlerChannelShare = this.clickHandlerChannelShare.bind(this);   
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
  clickHandler(event, _name){
    Utils.scrollToTop(300);
    event.target.id !== localStorage.getItem('lastChannel')
    ? (
        localStorage.removeItem('lastProgram'),
        localStorage.removeItem('lastPodcast'),
        localStorage.setItem('lastChannelName', JSON.stringify(_name))
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
  clickHandlerChannelLater(event,_channel){
    event.stopPropagation();
    console.log('this.props');
    console.log(this.props);
    this.props.auth.isAuthenticated
    ? Lists.saveToList('channels','later',_channel)
    : localStorage.getItem('app')
      ? (
          this.props.auth.afterRequiredApp = function(){
            Lists.saveToList('channels','later', _channel)
          },
          window.location.href = './#/login'
        )
      : this.props.auth.required(function(){
        Lists.saveToList('channels','later', _channel)
      })
  }
  clickHandlerChannelFav(event, _channel){
    event.stopPropagation();
    this.props.auth.isAuthenticated
    ? Lists.saveToList('channels','fav',_channel)
    : localStorage.getItem('app')
      ? (
          this.props.auth.afterRequiredApp = function(){
            Lists.saveToList('channels','fav',_channel)
          },
          window.location.href = './#/login'
        )
      : this.props.auth.required(function(){
        Lists.saveToList('channels','fav', _channel)
      })
  }
  clickHandlerChannelShare(event){
    event.stopPropagation();
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

  /*{p.desc[localStorage.getItem('language')]}*/
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
                  <div className="col-xs-6 col-md-3 col-lg-4" >
                    <div className={ p.id === localStorage.getItem('lastChannel') ? "contentSelected" : "" } >
                      <Link to={'/program/'+p.id} >
                        <div id={p.id} className="row item" name={p.name[localStorage.getItem('language')]} style={ 'background-image:url("' + p.image + '")'} onClick={ (event, _name) => this.clickHandler(event, p.name)} >
                          <div className="col-xs-6 ">
                            <div className="rot">
                              {p.name[localStorage.getItem('language')]}
                            </div>
                          </div>
                          <div class="col-xs-6 desc_cont">
                            <div className="desc">
                              &#10095;
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                      <div className="options" >
                        <div><div><img id='later' src={later} alt="later" onClick={ (event, _channel) => this.clickHandlerChannelLater(event, p.id) } /></div></div>
                        <div><div><img id='fav' src={fav} alt="fav" onClick={ (event, _channel) => this.clickHandlerChannelFav(event, p.id) } /></div></div>
                        <div><div><img id='share' src={share} alt="share" onClick={ this.clickHandlerChannelShare } /></div></div>
                      </div>
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