import React from 'react'
import { Modal, API } from '../../services/Rest.js'
import Submenu from '../../components/Submenu/Submenu.js'
import UsuarioApi from '../../services/api2.js'
import SingleLayout from '../../components/SingleLayout/SingleLayout.js'
import Iteminfo from '../../components/Iteminfo/Iteminfo.js'
import Opinion from '../../components/Opinion/Opinion.js'
import Pages from '../../components/Pages/Pages.js'
import later from '../../assets/images/later.png'
import fav from '../../assets/images/fav.png'
import share from '../../assets/images/share.png'
import { Link, Route } from 'react-router-dom'
import TranslatedComponent from '../../utils/TranslatedComponent.js'
import Utils from '../../utils/Utils.js'
import Lists from '../../utils/Lists.js'
import ListSchemma from '../../components/Lists/ListSchemma.js'
import './program.scss';

class Program extends React.Component {
  constructor(props) {
    super(props);
    console.log('props program');
    console.log(props);
    typeof props.location !== 'undefined'
    ? localStorage.setItem('lastState',props.location.pathname)
    : null;
    this.state = {
      'data':[ ],
      'channel': typeof this.props.match === 'undefined' ? 'F4RB2S' : typeof this.props.match.params.channel === 'undefined' ? ( localStorage.getItem('lastChannel') ? localStorage.getItem('lastChannel') : 'F4RB2S' ) : this.props.match.params.channel,
      'options':[]
    }
    this.options =[];
    this.clickHandler = this.clickHandler.bind(this);
    this.clickHandlerProgramLater = this.clickHandlerProgramLater.bind(this);
    this.clickHandlerProgramFav = this.clickHandlerProgramFav.bind(this);
    this.clickHandlerProgramShare = this.clickHandlerProgramShare.bind(this);   
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
  setSchemmaLater(){
    this.props.initSchemma.setSchemma = Lists.saveToList('program','later',this.state.program.id);
    this.props.initSchemma.show('program','later',this.state.program);
  }
  clickHandlerProgramLater(event, _program){
    event.stopPropagation();
    this.state.program = _program;
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
    this.props.initSchemma.setSchemma = Lists.saveToList('program','fav',this.state.program.id);
    this.props.initSchemma.show('program','fav',this.state.program);
  }
  clickHandlerProgramFav(event, _program){
    event.stopPropagation();
    this.state.program = _program;
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
    this.props.initSchemma.setSchemma = Lists.saveToList('program','share',this.state.program.id);
    this.props.initSchemma.show('program','share',this.state.program);
  }
  clickHandlerProgramShare(event, _program){
    event.stopPropagation();
    this.state.program = _program
    this.props.auth.isAuthenticated
    ? this.setSchemmaShare()
    : (
      localStorage.setItem('savingList',true),
      localStorage.getItem('app')
      ? (
          this.props.auth.afterRequiredApp = this.setSchemmaShare,
          window.location.href = './#/login'
        )
      : this.props.auth.required(this.setSchemmaShare)
    )
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
    Utils.scrollToTop(300);
    this.setState({
      'style':{
        'margin-top':document.querySelector('.breadcrumb') ? document.querySelector('.breadcrumb').offsetHeight + 'px' : '0'
      }
    })
    typeof localStorage.getItem('program')!=='undefined' && localStorage.getItem('program') && localStorage.getItem('lastChannel') === this.state.channel
    ? this.setState ({
        'data':JSON.parse(localStorage.getItem('program'))
      })
    : ( 
      localStorage.setItem('lastChannel',this.state.channel),
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
      <div className={ Utils.checkScene('/program') ? 'program' : 'program resetPaddingBottom' } style={this.state.style} >
        <div className={ Utils.checkScene('/program') ? 'hide' : 'hide' } >
          <h1>{this.translate('menu.program').toUpperCase() + ' ' + this.translate('channel') + ' ' + ( localStorage.getItem('lastChannelName') ? JSON.parse(localStorage.getItem('lastChannelName'))[localStorage.getItem('language')] : '' ) }</h1>
        </div>
        <div class="row" >
          <div className="col-xs-12" >
            <Iteminfo />
          </div>
        </div>
        <div className={ Utils.checkScene('/program') ? '' : 'resetPaddingTop' }>
          <div class="row" >
            {
              this.state.data.map((p, index) => (
                <div className="col-xs-12 col-md-4" >
                    <div className ={ (index-1)%3===0 ? 'item_container' : index%3===0 ? 'item_container_left' : 'item_container_right'} >
                      <div className={ p.id === localStorage.getItem('lastProgram') ? "contentSelected" : "" }>
                          <div className="row item" >
                            <div className="col-xs-12 ">
                              <div className="rot">
                                {p.name[localStorage.getItem('language')]}
                              </div>
                            </div>
                            <div class="desc_cont">
                              {/*<div className="options" >
                                <div><div><img id='later' src={later} alt="later" onClick={ (event, _program) => this.clickHandlerProgramLater(event, p) }  /></div></div>
                                <div><div><img id='fav' src={fav} alt="fav" onClick={ (event, _program) => this.clickHandlerProgramFav(event, p) } /></div></div>
                                <div><div><img id='share' src={share} alt="share" onClick={ (event, _program) => this.clickHandlerProgramShare(event, p) }  /></div></div>
                              </div>*/}
                              <div class="item_actions">
                                  <Link to={'/podcast/'+p.id+'/'+p.name[localStorage.getItem('language')]} id={p.id}  onClick={ (event, _name) => this.clickHandler(event, p.name)}  >
                                    <div><div class='basicOuter'><div class='basicInner'>
                                        <div className="item_desc" name={p.name[localStorage.getItem('language')]} style={ 'background-image:url("' + p.image + '")'} >
                                          
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
                              <div className='item_container_to_lists_item' id='fav' onClick={ (event, _program) => this.clickHandlerProgramFav(event, p) } >{this.translate('user.toFavourites')}</div>
                              <div className='item_container_to_lists_item' id='later' onClick={ (event, _program) => this.clickHandlerProgramLater(event, p) }  >{this.translate('user.toLater')}</div>
                              <div className='item_container_to_lists_item' id='share' onClick={ (event, _program) => this.clickHandlerProgramShare(event, p) }  >{this.translate('user.toSubscribe')}</div>
                              <div className='item_container_to_lists_item' id='share' onClick={ (event, _program) => this.clickHandlerProgramShare(event, p) }  >{this.translate('user.share')}</div>
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
          <div class="row" >
            <div className="col-xs-12" >
              <Opinion />
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

Program.propTypes = {
  //who: React.PropTypes.string.isRequired,
};


// Returns nothing because it mutates the class
TranslatedComponent(Program);
export default Program;