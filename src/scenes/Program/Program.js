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
import './program.scss';

class Program extends React.Component {
  constructor(props) {
    super(props);

    typeof props.location !== 'undefined'
    ? localStorage.setItem('lastState',props.location.pathname)
    : null;
    this.state = {
      'data':[ ],
      'channel': typeof this.props.match === 'undefined' ? 'F4RB2S' : typeof this.props.match.params.channel === 'undefined' ? ( localStorage.getItem('lastChannel') ? localStorage.getItem('lastChannel') : 'F4RB2S' ) : this.props.match.params.channel
    }
    this.clickHandler = this.clickHandler.bind(this);
    this.clickHandlerProgramLater = this.clickHandlerProgramLater.bind(this);
    this.clickHandlerProgramFav = this.clickHandlerProgramFav.bind(this);
    this.clickHandlerProgramShare = this.clickHandlerProgramShare.bind(this);   
  }
  onSuccess = (_response) => {
    _response.status === 'successfull'
    ? ( 
      this.setState ({
        'data':_response.data
      }),
      localStorage.setItem('program', JSON.stringify(_response.data))
    )
    : this.setState({
        isOpen: true,
        showedMsg: 'program.' + _response.reason
    });
  }
  clickHandler(event, _name){
    localStorage.setItem('lastProgramName', JSON.stringify(_name));
    event.target.id !== localStorage.getItem('lastProgram')
    ? (
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
  clickHandlerProgramLater(event, _program){
    event.stopPropagation();
    this.props.auth.isAuthenticated
    ? Lists.saveToList('programs','later',_program)
    : localStorage.getItem('app')
      ? (
          this.props.auth.afterRequiredApp = function(){
            Lists.saveToList('programs','later',_program)
          },
          window.location.href = './#/login'
        )
      : this.props.auth.required(function(){
        Lists.saveToList('programs','later',_program)
      })
  }
  clickHandlerProgramFav(event, _program){
    event.stopPropagation();
    this.props.auth.isAuthenticated
    ? Lists.saveToList('programs','fav',_program)
    : localStorage.getItem('app')
      ? (
          this.props.auth.afterRequiredApp = function(){
            Lists.saveToList('programs','fav',_program)
          },
          window.location.href = './#/login'
        )
      : this.props.auth.required(function(){
        Lists.saveToList('programs','fav',_program)
      })
  }
  clickHandlerProgramShare(event){
    event.stopPropagation();
  }
  componentDidMount(){
    Utils.scrollToTop(300);
    typeof localStorage.getItem('program')!=='undefined' && localStorage.getItem('program') && localStorage.getItem('lastChannel') === this.state.channel
    ? this.setState ({
        'data':JSON.parse(localStorage.getItem('program'))
      })
    : ( 
      window.setSpinner(),
      API.action('getListPro'+this.state.channel, { 'channel' : this.state.channel }, this.onSuccess, this.onError, 'GET')
      )
  }
   /*<div class="col-xs-6">
                        <div className="desc">
                          {p.desc[localStorage.getItem('language')]}
                        </div>
                      </div>*/
  render() {

    return (
      <div className={ Utils.checkScene('/program') ? 'program' : 'program resetPaddingBottom' }>
        <div className={ Utils.checkScene('/program') ? '' : 'hide' } >
          <h1>{this.translate('menu.program').toUpperCase() + ' ' + this.translate('channel') + ' ' + ( localStorage.getItem('lastChannelName') ? JSON.parse(localStorage.getItem('lastChannelName'))[localStorage.getItem('language')] : '' ) }</h1>
        </div>
        <div className={ Utils.checkScene('/program') ? '' : 'resetPaddingTop' }>
          <div class="row" >
            {
              this.state.data.map(p => (
                <div className="col-xs-6 col-md-3 col-lg-4" >
                  <div className={ p.id === localStorage.getItem('lastProgram') ? "contentSelected" : "" }>
                    <Link to={'/podcast/'+p.id}  >
                      <div id={p.id} className="row item" style={ 'background-image:url("' + p.image + '")' } onClick={ (event, _name) => this.clickHandler(event, p.name)} >
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
                    <div><div><img id='later' src={later} alt="later" onClick={ (event, _program) => this.clickHandlerProgramLater(event, p.id) }  /></div></div>
                    <div><div><img id='fav' src={fav} alt="fav" onClick={ (event, _program) => this.clickHandlerProgramFav(event, p.id) } /></div></div>
                    <div><div><img id='share' src={share} alt="share" onClick={ this.clickHandlerProgramShare } /></div></div>
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

Program.propTypes = {
  //who: React.PropTypes.string.isRequired,
};


// Returns nothing because it mutates the class
TranslatedComponent(Program);
export default Program;