import React from 'react'
import { Link, Route } from 'react-router-dom'
import TranslatedComponent from '../../utils/TranslatedComponent.js';
import Opinion from '../Opinion/Opinion.js';
import StaticPlayerDescription from './StaticPlayerDescription.js';
import News from '../../blocks/News/News.js'
import './StaticPlayer.scss'

class StaticPlayer extends React.Component {
  constructor(props) {
    super(props);
  
  }
  componentDidMount() {
    this.setState({
      'style':{
        'margin-top':document.querySelector('.breadcrumb') ? document.querySelector('.breadcrumb').offsetHeight + 'px' : '0'
      }
    })
  }
  render() {
    return (
      <div className='staticplayer' style={this.state.style}>
          Player estático
          <StaticPlayerDescription />
          <Opinion />
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