import React from 'react'
import { Switch, Route } from 'react-router-dom'
import FullUser from './FullUser.js'
import SingleUser from './SingleUser.js'

// The Roster component matches one of two different routes
// depending on the full pathname
const User = () => (
  	<Switch>
	    <Route exact path='/user' component={FullUser}/>
	    <Route path='/user/:number' component={SingleUser} />
	</Switch>
)
export default User