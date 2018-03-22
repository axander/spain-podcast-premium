import React from 'react'
import { Modal, API } from '../../services/Rest.js'
import { Link, Route } from 'react-router-dom'
import TranslatedComponent from '../../utils/TranslatedComponent.js';
import Opinion from '../../blocks/Opinion/Opinion.js';
import IteminfoStatic from '../../components/Iteminfo/IteminfoStatic.js'
import Utils from '../../utils/Utils.js'
import News from '../../blocks/News/News.js'
import './StaticPlayer.scss'

class StaticPlayer extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    typeof props.location !== 'undefined'
    ? localStorage.setItem('lastState',props.location.pathname)
    : null; 
    this.state = {
    }
    this.handleResize = this.handleResize.bind(this);
  }
  onSuccess = (_response) => {
    Utils.scrollToTop(300);
    _response.status === 'successfull'
    ? ( 
      this.setState ({
        'reload':true
      })
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
  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    Utils.scrollToTop(300);
    this.setState({
      'style':{
        'margin-top':document.querySelector('.breadcrumb') ? document.querySelector('.breadcrumb').offsetHeight + 'px' : '0'
      }
    });
    window.setSpinner();//,
    API.action('getListPod', { 'program' : this.state.program, 'phase': parseFloat(localStorage.getItem('phase_podcast_'+localStorage.getItem('lastChannelName'))) || 0 }, this.onSuccess, this.onError, 'GET');
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }
  handleResize() {
    this.setState({
      'style':{
        'margin-top':document.querySelector('.breadcrumb') ? document.querySelector('.breadcrumb').offsetHeight + 'px' : '0'
      }
    })
  }
  render() {
    let podcast;
    if(typeof this.props.initplayer.data.source !== 'undefined'){
      podcast = this.props.initplayer.data;
      localStorage.setItem('lastPodcastPlayed', JSON.stringify(podcast));
    }else{
      podcast = JSON.parse(localStorage.getItem('lastPodcastPlayed'));
    }
    return (
      <div className='staticplayer' style={this.state.style}>
        <div class="row" >
            <div>
              <IteminfoStatic podcast={podcast} data={this.props.location.data} destiny={this.props.location.destiny} auth={this.props.auth}  origen="podcast" dataOrigenLink={localStorage.getItem('lastProgramLink')}  dataOrigen={localStorage.getItem('lastProgramName')} initSchemma={this.props.initSchemma}/>
            </div>
        </div>
          <Opinion origen={this.props.match.params.podcast} auth={this.props.auth} />
          <News />
      </div>
    );
  }
}

StaticPlayer.propTypes = {
  //who: React.PropTypes.string.isRequired,
};


// Returns nothing because it mutates the class
TranslatedComponent(StaticPlayer);
export default StaticPlayer;