import React from 'react'
import { Switch, Route } from 'react-router-dom'
import TranslatedComponent from '../../utils/TranslatedComponent.js';
import Home from '../Home/Home.js'
import Home_web from '../Home/web/Home_web.js'
import User from '../User/User.js'
import Content from '../Content/Content.js'
import Podcast from '../Podcast/Podcast.js'
import Favourites from '../Favourites/Favourites.js'
import Downloads from '../Downloads/Downloads.js'
import Historial from '../History/History.js'
import Later from '../Later/Later.js'
import Shared from '../Shared/Shared.js'


class MainContainer extends React.Component {
  render() {
    return (
      <div className='mainContainer' >
        <maincontainer>
          <Switch>
            <Route exact path='/' component={ localStorage.getItem('app') ? Home : Home_web } />
            <Route path='/user' component={User} />
            <Route path='/content' component={Content}/>
            <Route path='/podcast' component={Podcast}/>
            <Route path='/favourites' render={(props) => (
              <Favourites {...props} initplayer={this.props.initplayer} />
            )}/>
            <Route path='/downloads' component={Downloads} />
            <Route path='/later' render={(props) => (
              <Later {...props} initplayer={this.props.initplayer} />
            )}/>
            <Route path='/history' component={Historial} />
            <Route path='/shared' render={(props) => (
              <Shared {...props} initplayer={this.props.initplayer} />
            )}/>
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