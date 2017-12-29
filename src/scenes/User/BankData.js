import React from 'react'
import { Link, Route } from 'react-router-dom'
import TranslatedComponent from '../../utils/TranslatedComponent.js';

class BankData extends React.Component {
  /*constructor(props) {
    super(props);
  }*/
  componentDidMount() {
    // Will execute as normal
  }
  render() {
    return (
      <div className="history">
        <h1>{this.translate('user.history').toUpperCase()}</h1>
      </div> 
    );
  }
}

BankData.propTypes = {
  //who: React.PropTypes.string.isRequired,
};


// Returns nothing because it mutates the class
TranslatedComponent(BankData);
export default BankData;