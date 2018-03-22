import React from 'react'
import { Modal, API } from '../../services/Rest.js'
import { Link, Route } from 'react-router-dom'
import TranslatedComponent from '../../utils/TranslatedComponent.js'
import Utils from '../../utils/Utils.js'
import './Lists.scss'

class Lists extends React.Component {
  constructor(props) {
    super(props);
    typeof props.location !== 'undefined'
    ? localStorage.setItem('lastState',props.location.pathname)
    : null;
    this.state = {
      'data':[ ]
    }
    this.handleResize = this.handleResize.bind(this);
  }
  onSuccess = (_response) => {
    Utils.scrollToTop(300);
    _response.status === 'successfull'
    ? this.setState ({
        'data':_response.data,
      })
    : this.setState({
        isOpen: true,
        showedMsg: 'lists.' + _response.reason
    });
  }
  onError = (_response, _error) =>{
    this.setState({
          isOpen: true,
          showedMsg: _error
      });
  }
  componentDidMount(){
    window.addEventListener('resize', this.handleResize);
    this.setState({
      'style':{
        'margin-top':document.querySelector('.breadcrumb') ? document.querySelector('.breadcrumb').offsetHeight + 'px' : '0'
      }
    })
    API.action('getListChan', { 'phase': localStorage.getItem('phase_channel') || 0 }, this.onSuccess, this.onError, 'GET');//,
    window.setSpinner();
  }
  handleResize() {
    this.setState({
      'style':{
        'margin-top':document.querySelector('.breadcrumb') ? document.querySelector('.breadcrumb').offsetHeight + 'px' : '0'
      }
    })
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }
  render() {
    return (
      <div className='lists' style={this.state.style} >
        <h1>Lists</h1>
        <Link to='/lists/favourites' ><div className="neutralPB_bordered">A favoritos</div></Link>
        <Link to='/lists/later' ><div className="neutralPB_bordered">A Escuchar más tarde</div></Link>
        <Link to='/lists/subscribes' ><div className="neutralPB_bordered">A Subscritos</div></Link>
        <Link to='/lists/history' ><div className="neutralPB_bordered">A Historial</div></Link>
        <Link to='/lists/downloads' ><div className="neutralPB_bordered">A Downloads</div></Link>
        <Link to='/lists/shared' ><div className="neutralPB_bordered">A Compartidos</div></Link>
        <Modal show={this.state.isOpen} onClose={this.toggleModal}  >
          {this.translate(this.state.showedMsg)}
        </Modal>
      </div>
    );
  }
}

Lists.propTypes = {
  //who: React.PropTypes.string.isRequired,
};


// Returns nothing because it mutates the class
TranslatedComponent(Lists);
export default Lists;