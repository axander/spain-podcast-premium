import React from 'react'
import Submenu from '../../components/Submenu/Submenu.js'
import UsuarioApi from '../../services/api2.js'
import SingleLayout from '../../components/SingleLayout/SingleLayout.js'
import { Link, Route } from 'react-router-dom'
import TranslatedComponent from '../../utils/TranslatedComponent.js';

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.checkScene = this.checkScene.bind(this);
  }
  checkScene(_scene){
    var checked = false;
    localStorage.getItem('lastState').indexOf(_scene)>=0
    ? checked = true
    : checked = false;
    return checked
  }
  render() {
    return (
      <div className="basicOuter" >
        <div className="basicInner">
          <h1>{this.translate('menu.content').toUpperCase()}</h1>
           {
              UsuarioApi.options[this.props.match.path].map(p => (
                <Link key={p.id}  to={this.props.match.path+'/'+p.id} ><div className={ this.checkScene(this.props.match.path+'/'+p.id) ? 'submenuOp tabSelected' : 'submenuOp' } >
                  {p.name}
                </div></Link>
              ))
            }
            <Route path={this.props.match.path+'/:id'} component={SingleLayout} />
         </div> 
         <Submenu  sub={this.props.match.path}/> 
      </div>
    );
  }
}

Content.propTypes = {
  //who: React.PropTypes.string.isRequired,
};


// Returns nothing because it mutates the class
TranslatedComponent(Content);
export default Content;