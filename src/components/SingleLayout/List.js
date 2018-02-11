import React from 'react'
import { Switch, Route } from 'react-router-dom'
import TranslatedComponent from '../../utils/TranslatedComponent.js'
import './List.scss'


// The Player looks up the player using the number parsed from
// the URL's pathname. If no player is found with the given
// number, then a "player not found" message is displayed.


class List extends React.Component {
  constructor(props) {
    super(props);
    console.log('favs');
    console.log(props);
    this.recursiveCloneChildren = this.recursiveCloneChildren.bind(this);
  }

  recursiveCloneChildren(child){
    console.log('cloned');
    console.log(child);
    if(child.folder) { 
      return  (
                child.children.map( p => (
                    !p.children ? (<div className='list_item' >{p.id}</div>) : (<div className="list_block" ><div>{p.folder}</div><div>{this.recursiveCloneChildren(p)}</div></div>)
                ))
              )
              
    }
    return <div>{child.id}</div>
  }


  render() {
    return (
      <list>
        {
          this.props.data.map( p => (
              !p.children ? (<div className='list_item' >{p.id}</div>) : (<div className="list_block" ><div>{p.folder}</div><div>{this.recursiveCloneChildren(p)}</div></div>)
          ))
        }
      </list>

    )}
}

List.propTypes = {
  //who: React.PropTypes.string.isRequired,
};


// Returns nothing because it mutates the class
TranslatedComponent(List);
export default List;