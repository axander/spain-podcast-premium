import React from 'react'
import Submenu from '../../components/Submenu/Submenu.js'
import UsuarioApi from '../../services/api2.js'
import SingleLayout from '../../components/SingleLayout/SingleLayout.js'
import { Link, Route } from 'react-router-dom'
import TranslatedComponent from '../../utils/TranslatedComponent.js';


class Podcast extends React.Component {
  /*constructor(props) {
    super(props);
  }*/
  componentDidMount() {
    // Will execute as normal
  }
  render() {
    return (
      <div className="basicOuter" >
        <div className="basicInner">
          <h1>PODCAST</h1>
          {
              UsuarioApi.options[this.props.match.path].map(p => (
                <Link key={p.number}  to={this.props.match.path+'/'+p.number} ><div className='submenuOp' >
                  {p.name}
                </div></Link>
              ))
            }
            <Route path={this.props.match.path+'/:number'} component={SingleLayout} />
        </div>  
        <Submenu  sub={this.props.match.path}/>  
      </div>
    );
  }
}

Podcast.propTypes = {
  //who: React.PropTypes.string.isRequired,
};


// Returns nothing because it mutates the class
TranslatedComponent(Podcast);
export default Podcast;