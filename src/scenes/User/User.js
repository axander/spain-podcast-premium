import React from 'react'
import Submenu from '../../components/Submenu/Submenu.js'
import UsuarioApi from '../../services/api2.js'
import SingleLayout from '../../components/SingleLayout/SingleLayout.js'
import { Link, Route } from 'react-router-dom'
import TranslatedComponent from '../../utils/TranslatedComponent.js';

class User extends React.Component {
  /*constructor(props) {
    super(props);
  }*/
  componentDidMount() {
    // Will execute as normal
  }
  render() {
    return (
      <div className="user">
        <h1>{this.translate('user').toUpperCase()}</h1>
        {
              UsuarioApi.options[this.props.match.path].map(p => (
                <Link key={p.number}  to={this.props.match.path+'/'+p.id} ><div className='submenuOp' >
                  {this.translate('user.'+p.name)}
                </div></Link>
              ))
            }
            <Route path={this.props.match.path+'/:id'} component={SingleLayout} />
        <Submenu  sub={this.props.match.path}/> 
      </div> 

    );
  }
}

User.propTypes = {
  //who: React.PropTypes.string.isRequired,
};


// Returns nothing because it mutates the class
TranslatedComponent(User);
export default User;