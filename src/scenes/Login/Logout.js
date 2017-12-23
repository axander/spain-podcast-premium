import React from 'react'
import TranslatedComponent from '../../utils/TranslatedComponent.js';
import { Link } from 'react-router-dom'


class Logout extends React.Component {
  
  render() {
    return (
      <logout>
        <div className="basicOuter" >
          <div className="basicInner">
            <h1>{this.translate('bye')}</h1>
            <div>
              <Link to='/'><div className="backPB" >{this.translate('continue')}</div></Link>
            </div>
          </div>
        </div>
      </logout>
    );
  }
}

Logout.propTypes = {
  //who: React.PropTypes.string.isRequired,
};


// Returns nothing because it mutates the class
TranslatedComponent(Logout);
export default Logout;