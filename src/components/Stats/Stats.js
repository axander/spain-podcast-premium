import React from 'react'
import { Link, Route } from 'react-router-dom'
import TranslatedComponent from '../../utils/TranslatedComponent.js';
import Comment from './Comment.js'
import Date from './Date.js'
import Played from './Played.js'
import Like from './Like.js'
import './Stats.scss'

class Stats extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <div className="item_stats mt25" >
          <Like num={this.props.data.likes} />
          <Comment num={this.props.data.comments} />
          <Date num={this.props.data.date} />
          <Played num={this.props.data.played} />
        </div>
    )
  }
}
Stats.propTypes = {
  //who: React.PropTypes.string.isRequired,
};
// Returns nothing because it mutates the class
TranslatedComponent(Stats);
export default Stats;