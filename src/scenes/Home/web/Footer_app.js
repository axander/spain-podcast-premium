import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import TranslatedComponent from '../../../utils/TranslatedComponent.js';
import './styles/footer_web.scss'
import googlePlay from '../../../assets/images/googlePlay.png' 
import facebook_dark from '../../../assets/images/facebook_dark.png'
import youtube_dark from '../../../assets/images/youtube_dark.png' 
import twitter_dark from '../../../assets/images/twitter_dark.png' 
import instagram_dark from '../../../assets/images/instagram_dark.png' 
import facebook_light from '../../../assets/images/facebook_light.png'
import youtube_light from '../../../assets/images/youtube_light.png' 
import twitter_light from '../../../assets/images/twitter_light.png' 
import instagram_light from '../../../assets/images/instagram_light.png' 
import DownApple from '../../../components/App/Buttons/DownApple.js';
import DownAndroid from '../../../components/App/Buttons/DownAndroid.js';


class Footer_app extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {

  }
  componentDidUpdate(){
    
  }

  render() {
    return (
      <div class="footer_app" >
       	<h1>{this.translate('footer.downloads').toUpperCase()}</h1>
        <div>
          <DownApple />
          <DownAndroid />
        </div>
        <h1>{this.translate('footer.followus').toUpperCase()}</h1>
        <div>
          <div className={ 'social social'+localStorage.getItem('template')} ><img src={ localStorage.getItem('template') === 'dark' ? youtube_light : youtube_dark } alt="youtube" /></div>
          <div className={ 'social social'+localStorage.getItem('template')} ><img src={ localStorage.getItem('template') === 'dark' ? instagram_light : instagram_dark } alt="instagram" /></div>
          <div className={ 'social social'+localStorage.getItem('template')} ><img src={ localStorage.getItem('template') === 'dark' ? twitter_light : twitter_dark } alt="twitter" /></div>
          <div className={ 'social social'+localStorage.getItem('template')} ><img src={ localStorage.getItem('template') === 'dark' ? facebook_light : facebook_dark } alt="facebook2" /></div>
        </div>
      </div>  
    );
  }
}

Footer_app.propTypes = {
  //who: React.PropTypes.string.isRequired,
};


// Returns nothing because it mutates the class
TranslatedComponent(Footer_app);
export default Footer_app;