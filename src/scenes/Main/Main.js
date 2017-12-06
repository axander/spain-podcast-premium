import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from '../Home/Home.js'
import User from '../User/User.js'
import Content from '../Content/Content.js'
import Podcast from '../Podcast/Podcast.js'

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/user' component={User}/>
      <Route path='/content' component={Content}/>
      <Route path='/podcast' component={Podcast}/>
    </Switch>
  </main>
)

export default Main
