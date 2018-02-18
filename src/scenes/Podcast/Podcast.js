import React from 'react'
import { Modal, API } from '../../services/Rest.js'
import PlayerApp from '../../components/Player/PlayerApp/PlayerApp.js'
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
import './podcast.scss'

class Podcast extends React.Component {
  constructor(props) {
    super(props);
    console.log('props podcast');
    console.log(props);
    typeof props.location !== 'undefined'
    ? localStorage.setItem('lastState',props.location.pathname)
    : null;
    this.state = {
      'schemmaShow':false,
      'schemma':[],
      'data':[ ],
      'program': typeof this.props.match === 'undefined' ? 'FORBESDAILY' : typeof this.props.match.params.program === 'undefined' ? ( localStorage.getItem('lastProgram') ? localStorage.getItem('lastProgram') : 'FORBESDAILY' ) : this.props.match.params.program
    }
    this.clickHandlerPodcastLater = this.clickHandlerPodcastLater.bind(this);
    this.clickHandlerPodcastFav = this.clickHandlerPodcastFav.bind(this);
    this.clickHandlerPodcastShare = this.clickHandlerPodcastShare.bind(this);
    this.setSchemmaFav = this.setSchemmaFav.bind(this);
    this.setSchemmaLater = this.setSchemmaLater.bind(this);
    this.setSchemmaShare = this.setSchemmaShare.bind(this);

  }
  onSuccess = (_response) => {
    _response.status === 'successfull'
    ? ( 
      this.setState ({
        'data':_response.data
      }),
      localStorage.setItem('podcast', JSON.stringify(_response.data))
    )
    : this.setState({
        isOpen: true,
        showedMsg: 'podcast.' + _response.reason
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
  setSchemmaLater(){
    this.props.initSchemma.setSchemma = Lists.saveToList('podcast','later',this.state.podcast.id);
    this.props.initSchemma.show('podcast','later',this.state.podcast);
  }
  clickHandlerPodcastLater(event, _podcast){
    event.stopPropagation();
    this.state.podcast = _podcast
    this.props.auth.isAuthenticated
    ? this.setSchemmaLater()
    : localStorage.getItem('app')
      ? (
          this.props.auth.afterRequiredApp = this.setSchemmaLater,
          window.location.href = './#/login'
        )
      : this.props.auth.required(this.setSchemmaLater)
  }
  setSchemmaFav(){
    this.props.initSchemma.setSchemma = Lists.saveToList('podcast','fav',this.state.podcast.id);
    this.props.initSchemma.show('podcast','fav',this.state.podcast);
  }
  clickHandlerPodcastFav(event, _podcast){
    event.stopPropagation();
    this.state.podcast = _podcast
    this.props.auth.isAuthenticated
    ? this.setSchemmaFav()
    : localStorage.getItem('app')
      ? (
          this.props.auth.afterRequiredApp = this.setSchemmaFav,
          window.location.href = './#/login'
        )
      : this.props.auth.required(this.setSchemmaFav)
  }
  setSchemmaShare(){
    this.props.initSchemma.setSchemma = Lists.saveToList('podcast','share',this.state.podcast.id);
    this.props.initSchemma.show('podcast','share',this.state.podcast);
  }
  clickHandlerPodcastShare(event, _podcast){
    event.stopPropagation();
    this.state.podcast = _podcast
    this.props.auth.isAuthenticated
    ? this.setSchemmaShare()
    : localStorage.getItem('app')
      ? (
          this.props.auth.afterRequiredApp = this.setSchemmaShare,
          window.location.href = './#/login'
        )
      : this.props.auth.required(this.setSchemmaShare)
  }
  componentDidMount(){
    typeof localStorage.getItem('program')!=='undefined' && localStorage.getItem('program') && localStorage.getItem('lastProgram') === this.state.program
    ? this.setState ({
        'data':JSON.parse(localStorage.getItem('podcast'))
      })
    : ( 
      localStorage.setItem('lastProgram',this.state.program ),
      window.setSpinner(),
      API.action('getListPod'+this.state.program, { 'program' : this.state.program }, this.onSuccess, this.onError, 'GET')
      )
  }
  /*<div class="col-xs-6">
    <div className="desc">
      {p.desc[localStorage.getItem('language')]}
    </div>
  </div>*/
  /*<PlayerApp />*/
  render() {
    Utils.scrollToTop(300);
    return (
      <div className={ Utils.checkScene('/podcast') ? 'podcast' : 'podcast resetPaddingBottom' }>
        <div className={ Utils.checkScene('/podcast') ? '' : 'hide' } >
          <h1>{this.translate('menu.podcast').toUpperCase() + ' ' + this.translate('program') + ' ' + ( localStorage.getItem('lastProgramName') ? JSON.parse(localStorage.getItem('lastProgramName'))[localStorage.getItem('language')] : '' ) }</h1>
        </div>
        
        <div className={ Utils.checkScene('/podcast') ? '' : 'resetPaddingTop' }>
          <div class="row" >
            {
              this.state.data.map(p => (
                <div className="col-xs-6 col-md-3 col-lg-4" >
                  <div className={ p.id === localStorage.getItem('lastPodcast') ? "contentSelected" : "" } >
                      <div id={p.id} className="row item" name={p.name[localStorage.getItem('language')]} style={ 'background-image:url("' + p.image + '")'} onClick={() => this.props.initplayer.play(p.source, p.id, p.name, p)} >
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
                  </div>
                    <div className="options" >
                      <div><div><img id='later' src={later} alt="later" onClick={ (event, _podcast) => this.clickHandlerPodcastLater(event, p) } /></div></div>
                      <div><div><img id='fav' src={fav} alt="fav" onClick={ (event, _podcast) => this.clickHandlerPodcastFav(event, p) } /></div></div>
                      <div><div><img id='share' src={share} alt="share" onClick={ (event, _podcast) => this.clickHandlerPodcastShare(event, p) } /></div></div>
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
//<div className={this.state.schemmaShow ? 'ListSchemma show':'ListSchemma' } ><ListSchemma schemma={this.state.schemma} /></div>
Podcast.propTypes = {
  //who: React.PropTypes.string.isRequired,
};


// Returns nothing because it mutates the class
TranslatedComponent(Podcast);
export default Podcast;