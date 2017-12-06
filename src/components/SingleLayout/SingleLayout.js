import React from 'react'
import SingleUserAPI from '../../services/api.js'
import { Link } from 'react-router-dom'

// The Player looks up the player using the number parsed from
// the URL's pathname. If no player is found with the given
// number, then a "player not found" message is displayed.
const SingleLayout = (props) => {
  const singleUser = SingleUserAPI.get(
    parseInt(props.match.params.number, 10)
  )
  console.log(props);
  if (!singleUser) {
    return <div>Sorry, but the singleUser was not found</div>
  }
  return (
    <div>
      <h1>{singleUser.name} (#{singleUser.number})</h1>
      <h2>Position: {singleUser.position}</h2>
      <Link to={singleUser.sub}><div className="backPB" >Back</div></Link>
    </div>

  )
}

export default SingleLayout