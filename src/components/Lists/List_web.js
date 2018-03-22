import React from 'react'
import { Link, Route } from 'react-router-dom'
import TranslatedComponent from '../../utils/TranslatedComponent.js';
import {API} from '../../services/Rest.js'
import LocalSpinner from '../../blocks/Common/LocalSpinner/LocalSpinner.js'
import LocalError from '../../blocks/Common/LocalError/LocalError.js'
import Pages from '../Pages/Pages.js'
import './Lists_web.scss'

class Lists_web extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      'init':true,
      'loading':true,
      'error':false,
      'data':[]
    }
    this.setPhase = this.setPhase.bind(this);
  }
  onSuccess = (_response) => {
    _response.status === 'successfull'
    ? (
        this.setState({
          'init':false,
          'loading':false,
          'error':false,
          'data':_response.data,
          'total':_response.total,
          'phase':localStorage.getItem('phase_'+this.props.type) || 0,
          'perPhase':_response.perPhase
        })
      )
    : (
        this.setState({
          'init':false,
          'loading':false,
          'error':true
        })
      );
  }
  onError = (_response, _error) =>{
    this.setState({
          'init':false,
          'loading':false,
          'error':true
        })
  }
  componentDidMount(){

      API.action('getList'+this.props.type, { 'phase': localStorage.getItem('phase_'+this.props.type) || 0 }, this.onSuccess, this.onError, 'GET');
  }
  setPhase(_phase){
    API.action('getList'+this.props.type, { 'phase': localStorage.getItem('phase_'+this.props.type) || 0 }, this.onSuccess, this.onError, 'GET');//,
    window.setSpinner();
  }
  render() {
    var lan = localStorage.getItem('language');
    let PagesList;
    if(this.state.total>0){
      PagesList = <Pages total={this.state.total} perPhase={this.state.perPhase} setPhase= {this.setPhase} auth={this.props.auth} list={this.props.type} />
    }
    return (
      <div className='list_web' >
        <div className='listsWebBlock' >
          <div>
            {this.state.data.map(( p , index) => {
              return (
                <div className="listsWebBlock_item" >
                  <div className="listsWebBlock_item_play" onClick={() => this.props.initplayer.play(p.source, p.id, p.name, p)} >
                    <div className='listsWebBlock_item_play_PB'>
                      <div className='listsWebBlock_item_play_PB_deco'>
                        <div>&#9658;</div>
                      </div>
                    </div>
                  </div>
                  <div className="listsWebBlock_item_image" onClick={() => this.props.initplayer.play(p.source, p.id, p.name, p)} ><div className="listsWebBlock_item_image_thumb" style={p.style} ></div></div>
                  <div className="listsWebBlock_item_descrip" >{index+1+this.state.phase*this.state.perPhase}. {p.name[lan]}</div>
                  <div className="listsWebBlock_item_options" >
                    <div className="listsWebBlock_item_options_deco" >•••</div>
                  </div>
                  <div className="listsWebBlock_item_duration" >{p.duration}</div>
                  <div className="listsWebBlock_item_delete" >
                    <div className='listsWebBlock_item_del_PB'>
                      <div className='listsWebBlock_item_del_PB_deco'>
                        <div>x</div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <div class="row" >
            <div className="col-xs-12" >
              {PagesList}
            </div>
          </div>
          <div className={this.state.loading ? 'spinner':'hide'} ><LocalSpinner /></div>
          <div className={this.state.error ? 'error':'hide'} ><LocalError /></div>
        </div>
      </div>
    );
  }
}

Lists_web.propTypes = {
  //who: React.PropTypes.string.isRequired,
};


// Returns nothing because it mutates the class
TranslatedComponent(Lists_web);
export default Lists_web;