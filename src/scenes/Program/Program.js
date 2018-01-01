import React from 'react'
import { Modal, API } from '../../services/Rest.js'
import Submenu from '../../components/Submenu/Submenu.js'
import UsuarioApi from '../../services/api2.js'
import SingleLayout from '../../components/SingleLayout/SingleLayout.js'
import { Link, Route } from 'react-router-dom'
import TranslatedComponent from '../../utils/TranslatedComponent.js';

class Program extends React.Component {
  constructor(props) {
    super(props);
    typeof props.location !== 'undefined'
    ? localStorage.setItem('lastState',props.location.pathname)
    : null;
    this.state = {
      'data':[ ],
      'channel': typeof this.props.match === 'undefined' ? this.props.channel : typeof this.props.match.params.channel === 'undefined' ? ( localStorage.getItem('lastChannel') ? localStorage.getItem('lastChannel') : 'Generic' ) : this.props.match.params.channel
    }
    this.checkScene = this.checkScene.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
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
      localStorage.setItem('program', JSON.stringify(_response.data))
    )
    : this.setState({
        isOpen: true,
        showedError: 'program.' + _response.reason
    });
  }
  clickHandler(event){
    event.target.id !== localStorage.getItem('lastProgram')
    ? (
        localStorage.removeItem('lastPodcast')
      )
    : null;
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
    typeof localStorage.getItem('program')!=='undefined' && localStorage.getItem('program') && localStorage.getItem('lastChannel') === this.state.channel
    ? this.setState ({
        'data':JSON.parse(localStorage.getItem('program'))
      })
    : ( 
      localStorage.setItem('lastChannel',this.state.channel ),
      window.setSpinner(),
      API.action('getListPro', { 'channel' : this.state.channel }, this.onSuccess, this.onError, 'GET')
      )
  }

  render() {
    return (
      <div className={ this.checkScene('/program') ? 'program' : 'program resetPaddingBottom' }>
        <div className={ this.checkScene('/program') ? '' : 'hide' } >
          <h1>{this.translate('menu.program').toUpperCase() + ' ' + this.translate('channel') + ' ' + this.state.channel }</h1>
        </div>
        <div className={ this.checkScene('/program') ? '' : 'resetPaddingTop' }>
          <div class="row" >
            {
              this.state.data.map(p => (
                <div className={ p.id === localStorage.getItem('lastProgram') ? "col-xs-12 col-md-6 col-lg-4 contentSelected" : "col-xs-12 col-md-6 col-lg-4" } >
                  <Link to={'/podcast/'+p.id}  >
                    <div id={p.id} className="row item" style={ 'background-image:url("' + p.image + '")' } onClick={this.clickHandler} >
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
          {this.translate(this.state.showedError)}
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