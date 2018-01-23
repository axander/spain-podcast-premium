import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import TranslatedComponent from '../../../utils/TranslatedComponent.js';
import './styles/footer_web.scss'

class Footer_about extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {

  }
  componentDidUpdate(){
    
  }

  render() {
    return (
      <div>
        <h1>{this.translate('spainpodcast').toUpperCase()}</h1>
        <Link to={'/info/about'} ><div>{this.translate('footer.about')}</div></Link>
        <Link to={'/info/help_center'} ><div>{this.translate('footer.help')}</div></Link>
        <Link to={'/info/ads'} ><div>{this.translate('footer.ads')}</div></Link>
      </div>  
    );
  }
}

Footer_about.propTypes = {
  //who: React.PropTypes.string.isRequired,
};


// Returns nothing because it mutates the class
TranslatedComponent(Footer_about);
export default Footer_about;