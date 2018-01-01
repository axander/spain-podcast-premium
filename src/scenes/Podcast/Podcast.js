import React from 'react'
import { Modal, API } from '../../services/Rest.js'
import Submenu from '../../components/Submenu/Submenu.js'
import UsuarioApi from '../../services/api2.js'
import SingleLayout from '../../components/SingleLayout/SingleLayout.js'
import { Link, Route } from 'react-router-dom'
import TranslatedComponent from '../../utils/TranslatedComponent.js';

class Podcast extends React.Component {
  constructor(props) {
    super(props);
    typeof props.location !== 'undefined'
    ? localStorage.setItem('lastState',props.location.pathname)
    : null;
    this.state = {
      'data':[ ],
      'program': typeof this.props.match === 'undefined' ? this.props.program : typeof this.props.match.params.program === 'undefined' ? ( localStorage.getItem('lastProgram') ? localStorage.getItem('lastProgram') : 'Generic' ) : this.props.match.params.program
    }
    this.checkScene = this.checkScene.bind(this);
  }
  checkScene(_scene){
    var checked = false;
    localStorage.getItem('lastState').indexOf(_scene)>=0
    ? checked = true
    : checked = false;
    return checked
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
        showedError: 'podcast.' + _response.reason
    });
  }
  onError = (_response, _error) =>{
    this.setState({
          isOpen: true,
          showedError: _error
      });
  }
  toggleModal = () => {
      this.setState({
          isOpen: !this.state.isOpen
      });
   }

  componentDidMount(){
    typeof localStorage.getItem('program')!=='undefined' && localStorage.getItem('program') && localStorage.getItem('lastProgram') === this.state.program
    ? this.setState ({
        'data':JSON.parse(localStorage.getItem('podcast'))
      })
    : ( 
      localStorage.setItem('lastProgram',this.state.program ),
      window.setSpinner(),
      API.action('getListPod', { 'program' : this.state.program }, this.onSuccess, this.onError, 'GET')
      )
  }

  render() {
    return (
      <div className={ this.checkScene('/podcast') ? 'podcast' : 'podcast resetPaddingBottom' }>
        <div className={ this.checkScene('/podcast') ? '' : 'hide' } >
          <h1>{this.translate('menu.podcast').toUpperCase() + ' ' + this.translate('program') + ' ' + this.state.program }</h1>
        </div>
        <div className={ this.checkScene('/podcast') ? '' : 'resetPaddingTop' }>
          <div class="row" >
            {
              this.state.data.map(p => (
                  <div className={ p.id === localStorage.getItem('lastPodcast') ? "col-xs-12 col-md-6 col-lg-4 contentSelected" : "col-xs-12 col-md-6 col-lg-4" }>
                    <div className="row item" style={ 'background-image:url("' + p.image + '")' } >
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
                  </div>
              ))
            }
          </div>
        </div>
        <Modal show={this.state.isOpen} onClose={this.toggleModal} >
          {this.translate(this.state.showedError)}
        </Modal>
      </div> 
    );
  }
}

Podcast.propTypes = {
  //who: React.PropTypes.string.isRequired,
};


// Returns nothing because it mutates the class
TranslatedComponent(Podcast);
export default Podcast;