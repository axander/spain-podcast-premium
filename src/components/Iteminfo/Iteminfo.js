import React from 'react'
import { Link, Route } from 'react-router-dom'
import TranslatedComponent from '../../utils/TranslatedComponent.js';
import './Iteminfo.scss'

class Iteminfo extends React.Component {
  constructor(props) {
    super(props);
  
  }
  componentDidMount() {
    // Will execute as normal
  }
  render() {
    return (
      <div className='iteminfo'>
        Componente Información del item seleccionado
      </div>
    );
  }
}

Iteminfo.propTypes = {
  //who: React.PropTypes.string.isRequired,
};


// Returns nothing because it mutates the class
TranslatedComponent(Iteminfo);
export default Iteminfo;