import React from 'react'
import { Link, Route } from 'react-router-dom'
import TranslatedComponent from '../../utils/TranslatedComponent.js';
import './Pages.scss'

class Pages extends React.Component {
  constructor(props) {
    super(props);
  
  }
  componentDidMount() {
    // Will execute as normal
  }
  render() {
    return (
      <div className='pages'>
          Componente Paginado del listado seleccionado
      </div>
    );
  }
}

Pages.propTypes = {
  //who: React.PropTypes.string.isRequired,
};


// Returns nothing because it mutates the class
TranslatedComponent(Pages);
export default Pages;