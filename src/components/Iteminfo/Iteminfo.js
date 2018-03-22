import React from 'react'
import { Link, Route } from 'react-router-dom'
import TranslatedComponent from '../../utils/TranslatedComponent.js';
import Stats from '../Stats/Stats.js'
import Lists from '../../utils/Lists.js'
import './Iteminfo.scss'

class Iteminfo extends React.Component {
  constructor(props) {
    super(props);
    console.log('iteminfo');
    console.log(this.props);
    this.state={
      'data':this.props.data,
      'actions':this.props.actions,
      'origen': this.props.origen
    }
    this.clickHandlerChannelLater = this.clickHandlerChannelLater.bind(this);
    this.clickHandlerChannelFav = this.clickHandlerChannelFav.bind(this);
    this.clickHandlerChannelShare = this.clickHandlerChannelShare.bind(this); 
    this.setSchemmaFav = this.setSchemmaFav.bind(this);
    this.setSchemmaLater = this.setSchemmaLater.bind(this);
    this.setSchemmaShare = this.setSchemmaShare.bind(this);  
    this.showMenuResponsive= this.showMenuResponsive.bind(this);
    this.hideMenuResponsive= this.hideMenuResponsive.bind(this);
  }
  setSchemmaLater(){
    this.props.initSchemma.setSchemma = Lists.saveToList(this.state.origen,'later',this.state.data.id);
    this.props.initSchemma.show(this.state.origen,'later',this.state.data);
  }
  clickHandlerChannelLater(event, _channel){
    this.hideMenuResponsive();
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
    this.props.initSchemma.setSchemma = Lists.saveToList(this.state.origen,'fav',this.state.data.id);
    this.props.initSchemma.show(this.state.origen,'fav',this.state.data);
  }
  clickHandlerChannelFav(event){
    event.stopPropagation();
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
    this.props.initSchemma.setSchemma = Lists.saveToList(this.state.origen,'share',this.state.data.id);
    this.props.initSchemma.show(this.state.origen,'later',this.state.data);
  }
  clickHandlerChannelShare(event){
    this.hideMenuResponsive();
    event.stopPropagation();
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
  hideMenuResponsive(){
    this.setState({
      'menuResponsive':''
    })
  }
  showMenuResponsive(){
    this.setState({
      'menuResponsive':'menu_responsive_show'
    })
  }
  componentDidMount() {
    // Will execute as normal
    var state = localStorage.getItem('lastState').split('/')[1];
    typeof this.state.data === 'undefined'
    ? this.setState({
        'lastState':state,
        'data':JSON.parse(localStorage.getItem('lastItemData'+state)),
        'origen': state === 'program' ? 'channel' : state === 'podcast' ? 'program' : state === 'static' ? 'podcast' : null
      })
    : localStorage.setItem('lastItemData'+this.props.destiny, JSON.stringify(this.props.data));
  }
  
  render() {
    let lan = localStorage.getItem('language');
    return (
      typeof this.state.data !== 'undefined'
      ? (
          <div className='iteminfo'>
              <div>
                <div className={'iteminfo_image_container_'+this.props.origen} >
                  <div className ="iteminfo_image" style={"background-image:url('"+this.state.data.image+"')"} ></div>
                </div>
                <div class="iteminfo_container" >
                  <Link to={typeof this.props.dataOrigenLink !== 'undefined' ? this.props.dataOrigenLink : '/channel' }><div className="iteminfo_origen" >
                    {typeof this.props.dataOrigen !== 'undefined' ? JSON.parse(this.props.dataOrigen)[lan] : this.translate('header.explore')}
                  </div></Link>
                  <div className="iteminfo_name" >
                    {this.state.data.name[lan]}
                  </div>
                </div>
              </div>
              <div>
                <div className={'iteminfo_image_container_wrapper_'+this.props.origen} >
                </div>
                <div class="iteminfo_container_desc" >
                  <div className="iteminfo_desc">
                    {this.state.data.desc[lan]}
                  </div>
                  <div>
                    <Stats data={this.state.data.info} />
                  </div>
                  <div className='item_info_container_to_lists mb25' >
                    <div className='item_info_container_to_lists_item' id='fav' onClick={ (event) => this.clickHandlerChannelFav(event)  }  >{this.translate('user.toFavourites')}</div>
                    <div className='item_info_container_to_lists_item' id='later' onClick={ (event, _item) => this.clickHandlerChannelLater(event, this.state.data) } >{this.translate('user.toLater')}</div>
                    <div className='item_info_container_to_lists_item' id='share' onClick={ (event, _item) => this.clickHandlerChannelShare(event, this.state.data) } >{this.translate('user.toSubscribe')}</div>
                    <div className='item_info_container_to_lists_item' id='share' onClick={ (event, _item) => this.clickHandlerChannelShare(event, this.state.data) } >{this.translate('user.share')}</div>
                    <div className='item_info_container_to_lists_item' id='share'  onClick={this.showMenuResponsive} >
                      <span class="icon-more-horizontal"></span>
                      <span>{this.translate('more')}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className={"menu_responsive " + this.state.menuResponsive} onClick={this.hideMenuResponsive} >
                <div className="menu_responsive_option" >
                  <span class="icon-x"></span>
                </div>
                <div><div className="menu_responsive_option" onClick={ (event, _item) => this.clickHandlerChannelLater(event, this.state.data) } >{this.translate('user.toLater')}</div></div>
                <div><div className="menu_responsive_option" onClick={ (event, _item) => this.clickHandlerChannelShare(event, this.state.data) } >{this.translate('user.share')}</div></div>
              </div>
          </div>
      )
      : ''
    )
  }
}

Iteminfo.propTypes = {
  //who: React.PropTypes.string.isRequired,
};


// Returns nothing because it mutates the class
TranslatedComponent(Iteminfo);
export default Iteminfo;