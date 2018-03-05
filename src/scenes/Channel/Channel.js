import React from 'react'
import { Modal, API } from '../../services/Rest.js'
import Submenu from '../../components/Submenu/Submenu.js'
import UsuarioApi from '../../services/api2.js'
import Pages from '../../components/Pages/Pages.js'
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
    console.log('props channel');
    console.log(props);
    typeof props.location !== 'undefined'
    ? localStorage.setItem('lastState',props.location.pathname)
    : null;
    this.state = {
      'data':[ ],
      'options':[]
    }
    this.options =[];
    this.clickHandler = this.clickHandler.bind(this);
    this.clickHandlerChannelLater = this.clickHandlerChannelLater.bind(this);
    this.clickHandlerChannelFav = this.clickHandlerChannelFav.bind(this);
    this.clickHandlerChannelShare = this.clickHandlerChannelShare.bind(this); 
    this.setSchemmaFav = this.setSchemmaFav.bind(this);
    this.setSchemmaLater = this.setSchemmaLater.bind(this);
    this.setSchemmaShare = this.setSchemmaShare.bind(this);  
    this.clickHandlerOpen = this.clickHandlerOpen.bind(this);
    this.clickHandlerClose = this.clickHandlerClose.bind(this);
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
  setSchemmaLater(){
    this.props.initSchemma.setSchemma = Lists.saveToList('channel','later',this.state.channel.id);
    this.props.initSchemma.show('channel','later',this.state.channel);
  }
  clickHandlerChannelLater(event, _channel){
    event.stopPropagation();
    this.state.channel = _channel;
    this.props.auth.isAuthenticated
    ? this.setSchemmaLater()
    : (
      localStorage.setItem('savingList',true),
      localStorage.getItem('app')
      ? (
          this.props.auth.afterRequiredApp = this.setSchemmaLater,
          window.location.href = './#/login'
        )
      : this.props.auth.required(this.setSchemmaLater)
    )
  }
  setSchemmaFav(){
    this.props.initSchemma.setSchemma = Lists.saveToList('channel','fav',this.state.channel.id);
    this.props.initSchemma.show('channel','fav',this.state.channel);
  }
  clickHandlerChannelFav(event, _channel){
    event.stopPropagation();
    this.state.channel = _channel;
    this.props.auth.isAuthenticated
    ? this.setSchemmaFav()
    : (
      localStorage.setItem('savingList',true),
      localStorage.getItem('app')
      ? (
          this.props.auth.afterRequiredApp = this.setSchemmaFav,
          window.location.href = './#/login'
        )
      : this.props.auth.required(this.setSchemmaFav)
    )
  }
  setSchemmaShare(){
    this.props.initSchemma.setSchemma = Lists.saveToList('channel','share',this.state.channel.id);
    this.props.initSchemma.show('channel','later',this.state.channel);
  }
  clickHandlerChannelShare(event, _channel){
    event.stopPropagation();
    this.state.channel = _channel;
    this.props.auth.isAuthenticated
    ? this.setSchemmaShare()
    : localStorage.getItem('app')
      ? (
          localStorage.setItem('savingList',true),
          this.props.auth.afterRequiredApp = this.setSchemmaShare,
          window.location.href = './#/login'
        )
      : this.props.auth.required(this.setSchemmaShare)
  }
  clickHandlerClose(_option){
    this.options[_option]= false;
    this.setState({
      'options':this.options
    })
  }
  clickHandlerOpen(_option){
    this.options[_option]= true;
    this.setState({
      'options':this.options
    })
  }
  componentDidMount(){
    this.setState({
      'style':{
        'margin-top':document.querySelector('.breadcrumb') ? document.querySelector('.breadcrumb').offsetHeight + 'px' : '0'
      }
    })
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
      <div className={ Utils.checkScene('/channel') ? 'channel' : 'channel resetPaddingBottom' } style={this.state.style} >
        <div className={ Utils.checkScene('/channel') ? 'hide' : 'hide' } >
          <h1>{this.translate('menu.channel').toUpperCase()}</h1>
        </div>
        <div className={ Utils.checkScene('/channel') ? '' : 'resetPaddingTop' }>
          <div class="row"  >
            {
              this.state.data.map((p, index) => (
                  <div className="col-xs-12 col-md-4" >
                    <div className ={ (index-1)%3===0 ? 'item_container' : index%3===0 ? 'item_container_left' : 'item_container_right'} >
                      <div className={ p.id === localStorage.getItem('lastChannel') ? "contentSelected" : "" } >
                          <div className="row item" >
                            <div className="col-xs-12 ">
                              <div className="rot">
                                {p.name[localStorage.getItem('language')]}
                              </div>
                            </div>
                            <div class="desc_cont">
                              {/*<div className="options" >
                                <div><div><img id='later' src={later} alt="later" onClick={ (event, _channel) => this.clickHandlerChannelLater(event, p) } /></div></div>
                                <div><div><img id='fav' src={fav} alt="fav" onClick={ (event, _channel) => this.clickHandlerChannelFav(event, p) } /></div></div>
                                <div><div><img id='share' src={share} alt="share" onClick={ (event, _channel) => this.clickHandlerChannelShare(event, p) } /></div></div>
                              </div>*/}
                              <div class="item_actions">
                                  <Link to={'/program/'+p.id+'/'+p.name[localStorage.getItem('language')]} id={p.id}  onClick={ (event, _name) => this.clickHandler(event, p.name)} >
                                    <div><div class='basicOuter'><div class='basicInner'>
                                        <div className="item_desc" name={p.name[localStorage.getItem('language')]}  style={ 'background-image:url("' + p.image + '")'} >
                                        </div>
                                    </div></div></div>
                                    <div><div class='basicOuter'><div class='basicInner'>
                                      <div class='item_actions_text' >
                                        Ver lista
                                        <div class="item_actions_go_list"><div><div>❯</div></div></div>
                                      </div>
                                    </div></div></div>
                                  </Link>
                                  <div><div class='basicOuter'><div class='basicInner'>
                                      <div class="item_actions_options" onClick={() => this.clickHandlerOpen(index)} >•••</div>
                                  </div></div></div>
                              </div>
                            </div>
                            <div className={this.state.options[index] ? 'item_container_to_lists' : 'hide' }  >
                              <div className='item_container_to_lists_item' id='fav' onClick={ (event, _channel) => this.clickHandlerChannelFav(event, p) } >{this.translate('user.toFavourites')}</div>
                              <div className='item_container_to_lists_item' id='later' onClick={ (event, _channel) => this.clickHandlerChannelLater(event, p) }  >{this.translate('user.toLater')}</div>
                              <div className='item_container_to_lists_item' id='share' onClick={ (event, _channel) => this.clickHandlerChannelShare(event, p) }  >{this.translate('user.toSubscribe')}</div>
                              <div className='item_container_to_lists_item' id='share' onClick={ (event, _channel) => this.clickHandlerChannelShare(event, p) }  >{this.translate('user.share')}</div>
                              <div className='item_container_to_lists_close' onClick={() => this.clickHandlerClose(index)} >X</div>
                            </div>
                          </div>
                      </div>
                    </div>
                  </div>
              ))
            }
          </div>
          <div class="row" >
            <div className="col-xs-12" >
              <Pages />
            </div>
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