import React from 'react'
import { Link, Route } from 'react-router-dom'
import TranslatedComponent from '../../utils/TranslatedComponent.js';
import './Opinion.scss'

class Opinion extends React.Component {
  constructor(props) {
    super(props);
  
  }
  componentDidMount() {
    // Will execute as normal
  }
  render() {
    return (
      <div className='opinion'>
          Componente Opinión del item seleccionado
      </div>
    );
  }
}

Opinion.propTypes = {
  //who: React.PropTypes.string.isRequired,
};


// Returns nothing because it mutates the class
TranslatedComponent(Opinion);
export default Opinion;