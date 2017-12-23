import React from 'react'
import { Switch, Route } from 'react-router-dom'
import TranslatedComponent from '../../utils/TranslatedComponent.js';
import Home from '../Home/Home.js'
import User from '../User/User.js'
import Content from '../Content/Content.js'
import Podcast from '../Podcast/Podcast.js'
class MainContainer extends React.Component {
  
  render() {
    return (
      <div>
        <maincontainer>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/user' component={User} />
            <Route path='/content' component={Content}/>
            <Route path='/podcast' component={Podcast}/>
          </Switch>
        </maincontainer>

      </div>
    );
  }
}

MainContainer.propTypes = {
  //who: React.PropTypes.string.isRequired,
};


// Returns nothing because it mutates the class
TranslatedComponent(MainContainer);
export default MainContainer;