import React from 'react'
import { Modal, API } from '../../services/Rest.js'
import Submenu from '../../components/Submenu/Submenu.js'
import SingleLayout from '../../components/SingleLayout/SingleLayout.js'
import { Link, Route } from 'react-router-dom'
import TranslatedComponent from '../../utils/TranslatedComponent.js';

class Program extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'data':[
        { name:'Alejandro'},
        { name:'Pedro'}
      ]
   }
  }
  onSuccess = (_response) => {
    console.log(_response);
    this.setState ({
      'data':_response.Authors
    })
  }
  onError = (_response, _error) =>{
    console.log('error');
  }
  componentDidMount(){
    window.setSpinner();
    API.action('https://www.booknomads.com/api/v0/isbn/9789000035526', {}, this.onSuccess, this.onError, 'get');
  }

  render() {
    return (
      <div className="program" >
        <h1>{this.translate('menu.program').toUpperCase()}</h1>
        <div>
            {
            this.state.data.map(p => (
              <div>{p.Name}</div>
            ))
          }
        </div>
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