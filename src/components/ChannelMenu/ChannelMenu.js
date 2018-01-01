import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import ChannelMenuPB from './ChannelMenuPB.js'
import TranslatedComponent from '../../utils/TranslatedComponent.js';
import { Modal, API } from '../../services/Rest.js'
// The Header creates links that can be used to navigate
// between routes.

class ChannelMenu extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
        	'show': '',
        	'showProgram':'',
        	'showPodcast':'',
        	'state':'channels',
        	'toogle':false,
        	'data':[],
        	'dataProgram':[],
        	'dataPodcast':[],
        	'channel':'',
        	'program':'',
        	'podcast':''
        };
        this.clickHandler = this.clickHandler.bind(this);
        this.clickHandlerChannel = this.clickHandlerChannel.bind(this);
        this.clickHandlerProgram = this.clickHandlerProgram.bind(this);
        this.clickHandlerPodcast = this.clickHandlerPodcast.bind(this);
        this.backChannel = this.backChannel.bind(this);
        this.backProgram = this.backProgram.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.forwardProgram = this.forwardProgram.bind(this);
        this.forwardPodcast = this.forwardPodcast.bind(this);
    }
	clickHandler(event){
		switch(this.state.state){
			case 'channels':
				if(!this.state.toogle || this.state.show === '' ){
					this.state.toogle = true;
					this.setState({
						'data':JSON.parse(localStorage.getItem('channels')),
					    'show': 'showContents',
					    'channel':localStorage.getItem('lastChannel')
					}),
					document.getElementById('root').addEventListener('click', this.handleClickOutside, true)
				}else if(this.state.toogle ){
					this.state.toogle = false;
					this.setState({
					    'show': ''
					});
					document.getElementById('root').removeEventListener('click', this.handleClickOutside, true)
				}
			break;
			case 'program':
				if(!this.state.toogle || this.state.showProgram === '' ){
					this.state.toogle = true
					this.setState({
						'dataProgram':JSON.parse(localStorage.getItem('program')),
					    'showProgram': 'showContents',
					    'program':localStorage.getItem('lastProgram')
					}),
					document.getElementById('root').addEventListener('click', this.handleClickOutside, true)
				}else if(this.state.toogle ){
					this.state.toogle = false;
					this.setState({
					    'showProgram': ''
					});
					document.getElementById('root').removeEventListener('click', this.handleClickOutside, true)
				}
			break;
			case 'podcast':
				if(!this.state.toogle || this.state.showPodcast === '' ){
					this.state.toogle = true
					this.setState({
						'dataPodcast':JSON.parse(localStorage.getItem('podcast')),
					    'showPodcast': 'showContents',
					    'podcast':localStorage.getItem('lastPodcast')
					}),
					document.getElementById('root').addEventListener('click', this.handleClickOutside, true)
				}else if(this.state.toogle ){
					this.state.toogle = false;
					this.setState({
					    'showPodcast': ''
					});
					document.getElementById('root').removeEventListener('click', this.handleClickOutside, true)
				}
			break;
			default:
			break;
		}
    }
    clickHandlerChannel(event){
		typeof localStorage.getItem('program')!=='undefined' && localStorage.getItem('program') && localStorage.getItem('lastChannel') === event.target.id
	    ? ( this.setState ({
		      	'toogle':false,
		        'dataProgram':JSON.parse(localStorage.getItem('program')),
		        'show': '',
		        'showProgram': 'showContents',
		        'state':'program'
		      }),
	    	document.getElementById('root').addEventListener('click', this.handleClickOutside, true)
	      )
	    : ( 
	      localStorage.setItem('lastChannel',event.target.id ),
	      this.state.channel = event.target.id,
		  this.state.program = '',
		  this.state.podcast = '',
		  localStorage.removeItem('lastProgram'),
		  localStorage.removeItem('lastPodcast'),
		  localStorage.removeItem('program'),
		  localStorage.removeItem('podcast'),
	      window.setSpinner(),
	      API.action('getListPro', { 'channel' : event.target.id }, this.onSuccessProgram, this.onError, 'GET')
	      )
	    ;
    }
    clickHandlerProgram(event){
    	typeof localStorage.getItem('podcast')!=='undefined' && localStorage.getItem('podcast') && localStorage.getItem('lastProgram') === event.target.id
    	? ( this.setState ({
		      	'toogle':false,
		        'dataPodcast':JSON.parse(localStorage.getItem('podcast')),
		        'show': '',
		        'showProgram': '',
		        'showPodcast': 'showContents',
		        'state':'podcast'
		    }),
	    	document.getElementById('root').addEventListener('click', this.handleClickOutside, true)
	      )
	    : ( 
	      localStorage.setItem('lastProgram',event.target.id ),
	      this.state.program = event.target.id,
		  this.state.podcast = '',
		  localStorage.removeItem('lastPodcast'),
		  localStorage.removeItem('podcast'),
	      window.setSpinner(),
	      API.action('getListPod', { 'program' : event.target.id }, this.onSuccessPodcast, this.onError, 'GET')
	      )
	    ;
    }
    clickHandlerPodcast(event){
		this.state.podcast = event.target.id;
		localStorage.setItem('lastPodcast',event.target.id );
    }
    backChannel(event){
		this.setState({
			'state':'channels',
			'toogle':false,
		    'show': '',
		    'showProgram': ''
		 });
    }
    backProgram(event){
		this.setState({
			'state':'program',
			'toogle':false,
		    'show': '',
		    'showProgram': 'showContents',
		    'showPodcast': ''
		 });
    }
    forwardProgram(event){
    	typeof localStorage.getItem('program')!=='undefined'  && localStorage.getItem('program')
    	? this.setState({
			'state':'program',
			'toogle':false,
		    'show': '',
		    'showProgram': 'showContents',
		    'dataProgram':JSON.parse(localStorage.getItem('program'))
		 })
    	: this.setState({
			'state':'program',
			'toogle':false,
		    'show': '',
		    'showProgram': 'showContents',
		 });
    }
    forwardPodcast(event){
		this.setState({
			'state':'podcast',
			'toogle':false,
		    'show': '',
		    'showProgram': '',
		    'showPodcast':'showContents'
		 });
    }
    componentDidMount() {
	}
	componentWillUnmount() {
		document.getElementById('root').removeEventListener('click', this.handleClickOutside, true);
	}

	handleClickOutside(event) {
	    const domNode = ReactDOM.findDOMNode(this);
	    if (!domNode || !domNode.contains(event.target)) {
	    	switch(this.state.state){
				case 'channels':
					this.setState({
					    'show': ''
					 });
				break;
				case 'program':
					this.setState({
					    'showProgram': ''
					 })
				break;
				case 'podcast':
					this.setState({
					    'showPodcast': ''
					 });
				break;
				default:
				break;
			}
	    }
	    document.getElementById('root').removeEventListener('click', this.handleClickOutside, true);
	}
	onSuccess = (_response) => {
	    _response.status === 'successfull'
	    ? ( 
	      this.setState ({
	        'data':_response.data
	      }),
	      localStorage.setItem('channels', JSON.stringify(_response.data))
	    )
	    : this.setState({
	        isOpen: true,
	        showedMsg: 'channels.' + _response.reason
	    });
	}
	onSuccessProgram = (_response) => {
	    _response.status === 'successfull'
	    ? ( 
	      this.setState ({
	      	'toogle':true,
	        'dataProgram':_response.data,
	        'show': '',
	        'showProgram': 'showContents',
	        'state':'program'
	      }),
	      localStorage.setItem('program', JSON.stringify(_response.data))
	    )
	    : this.setState({
	        isOpen: true,
	        showedMsg: 'program.' + _response.reason
	    });
	    document.getElementById('root').addEventListener('click', this.handleClickOutside, true)
	}
	onSuccessPodcast = (_response) => {
	    _response.status === 'successfull'
	    ? ( 
	      this.setState ({
	      	'toogle':true,
	        'dataPodcast':_response.data,
	        'show': '',
	        'showProgram': '',
	        'showPodcast': 'showContents',
	        'state':'podcast'
	      }),
	      localStorage.setItem('podcast', JSON.stringify(_response.data))
	    )
	    : this.setState({
	        isOpen: true,
	        showedMsg: 'podcast.' + _response.reason
	    });
	    document.getElementById('root').addEventListener('click', this.handleClickOutside, true)
	}
	onError = (_response, _error) =>{
	    this.setState({
	        isOpen: true,
	        showedMsg: _error
	    });
	}
	toggleModal = () => {
	    this.setState({
	        isOpen: !this.state.isOpen
	    });
	}
	componentDidMount(){
	    typeof localStorage.getItem('channels')!=='undefined'  && localStorage.getItem('channels')
	    ? this.setState ({
	        'data':JSON.parse(localStorage.getItem('channels')),
	        'channel':localStorage.getItem('lastChannel')
	      })
	    : ( 
	      window.setSpinner(),
	      API.action('getListChan', {}, this.onSuccess, this.onError, 'get')
	      )
	}
  	render() {
	  	return(
	  		<div  onClick={ this.clickHandler } >
		  		<ChannelMenuPB ></ChannelMenuPB>
		  		<channelOptions id="menuContainer" className={this.state.show } >
				    <nav>
				    	<div className='contentStateRot' >{this.translate('menu.channel')}</div>
				    	<div className={this.state.channel !== '' ? 'forwardContentPB' : 'hide'}  onClick={this.forwardProgram} >{this.translate('menu.program')}⇨</div>
				    	<div className="scrollCont" >
				    		<div className="scrollableCont" >
						            {
						            this.state.data.map(p => (
						              <div id={p.id} className={this.state.channel === p.id ? 'row item contentSelected' : 'row item' } style={ 'background-image:url("' + p.image + '")' } onClick={ this.clickHandlerChannel } >
						                <div className="col-xs-6 " >
						                  <div className="rot">
						                    {p.name[localStorage.getItem('language')]}
						                  </div>
						                </div>
						                <div class="col-xs-6">
						                  <div className="desc">
						                    {p.desc[localStorage.getItem('language')]}
						                  </div>
						                </div>
						              </div>
						            ))
						          }
						    </div>
					    </div>
				    </nav>
				</channelOptions>
				<programOptions id="menuContainer" className={this.state.showProgram} >
				    <nav>
				    	<div>
				    		<div className='contentStateRot' >{this.translate('menu.program')+':'+this.translate('channel')+this.state.channel}</div>
				    		<div className={this.state.program !== '' ? 'forwardContentPB' : 'hide'} onClick={this.forwardPodcast} >{this.translate('menu.podcast')}⇨</div>
				    		<div className='backContentPB' onClick={this.backChannel} >⇦{this.translate('menu.channel')}</div>
				    	</div>
				    	<div className="scrollCont" >
				    		<div className="scrollableCont" >
						            {
						            this.state.dataProgram.map(p => (
						              <div id={p.id} className={this.state.program === p.id ? 'row item contentSelected' : 'row item' } style={ 'background-image:url("' + p.image + '")' } onClick={ this.clickHandlerProgram } >
						                <div className="col-xs-6 ">
						                  <div className="rot">
						                    {p.name[localStorage.getItem('language')]}
						                  </div>
						                </div>
						                <div class="col-xs-6">
						                  <div className="desc">
						                    {p.desc[localStorage.getItem('language')]}
						                  </div>
						                </div>
						              </div>
						            ))
						          }
						    </div>
					    </div>
				    </nav>
				</programOptions>
				<podcastOptions id="menuContainer" className={this.state.showPodcast} >
				    <nav>
				    	<div>
				    		<div className='contentStateRot' >{this.translate('menu.podcast')+':'+this.translate('program')+this.state.program}</div>
				    		<div className='backContentPB' onClick={this.backProgram} >⇦{this.translate('menu.program')}</div>
				    	</div>
				    	<div className="scrollCont" >
				    		<div className="scrollableCont" >
						            {
						            this.state.dataPodcast.map(p => (
						              <div id={p.id} className={this.state.podcast === p.id ? 'row item contentSelected' : 'row item' } style={ 'background-image:url("' + p.image + '")' } onClick={ this.clickHandlerPodcast } >
						                <div className="col-xs-6 ">
						                  <div className="rot">
						                    {p.name[localStorage.getItem('language')]}
						                  </div>
						                </div>
						                <div class="col-xs-6">
						                  <div className="desc">
						                    {p.desc[localStorage.getItem('language')]}
						                  </div>
						                </div>
						              </div>
						            ))
						          }
						    </div>
					    </div>
				    </nav>
				</podcastOptions>
			</div>
	  	)
	  }
}
ChannelMenu.propTypes = {
  //who: React.PropTypes.string.isRequired,
};


// Returns nothing because it mutates the class
TranslatedComponent(ChannelMenu);
export default ChannelMenu