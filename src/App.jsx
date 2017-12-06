import React from 'react'

import Menu from './components/Menu/Menu.js'

import Main from './scenes/Main/Main.js'

class App extends React.Component {
	
  	render() {
	  	return(
	  		<div>
			  	<Main />
			    <Menu />
			</div>
	  	)
	  }

}

export default App