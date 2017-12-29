import React from 'react'
import Submenu from '../../components/Submenu/Submenu.js'
import UsuarioApi from '../../services/api2.js'
import SingleLayout from '../../components/SingleLayout/SingleLayout.js'
import { Link, Route } from 'react-router-dom'
import TranslatedComponent from '../../utils/TranslatedComponent.js';

class Later extends React.Component {
  /*constructor(props) {
    super(props);
  }*/
  componentDidMount() {
    // Will execute as normal
  }
  render() {
    return (
      <div className="later">
        <h1>{this.translate('user.later').toUpperCase()}</h1>
      </div> 
    );
  }
}

Later.propTypes = {
  //who: React.PropTypes.string.isRequired,
};


// Returns nothing because it mutates the class
TranslatedComponent(Later);
export default Later;