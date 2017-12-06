import React from 'react'
import Submenu from '../../components/Submenu/Submenu.js'
import UsuarioApi from '../../services/api2.js'
import SingleLayout from '../../components/SingleLayout/SingleLayout.js'
import { Link, Route } from 'react-router-dom'
const Podcast = (props) => (
  <div className="basicOuter" >
  	<div className="basicInner">
    	<h1>PODCAST</h1>
    	{
          UsuarioApi.options[props.match.path].map(p => (
            <Link key={p.number}  to={props.match.path+'/'+p.number} ><div className='submenuOp' >
              {p.name}
            </div></Link>
          ))
        }
        <Route path={props.match.path+'/:number'} component={SingleLayout} />
	</div>	
	<Submenu  sub={props.match.path}/>	
	
  </div>
)

export default Podcast