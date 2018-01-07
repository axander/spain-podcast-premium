const Utils = {
  	formatGetParameters: function(_params){
		var getParams = _params 
						? Object.keys(_params).map(function(key) { return key + '=' + _params[key] }).join('&')
						:undefined;
		return getParams
	},
	validateEmail: function(email) {
	  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	  return re.test(email);
	},
    validateCode: function(_code) {
      var re = _code.length>0 ? true : false;
      return re;
    },
	checkScene: function(_scene){
    	var checked = false;
    	typeof localStorage.getItem('lastState') !== 'undefined' && localStorage.getItem('lastState') && localStorage.getItem('lastState').indexOf(_scene)>=0
    	? checked = true
    	: checked = false;
    	return checked
    },
    timeElapsed: function(_start, _daysLeft){
    	var daysLeftM = _daysLeft * 86400000;
		var startMsec = _start;
		var elapsed = (( startMsec + daysLeftM ) - new Date().getTime()) / 86400000; 
		return elapsed.toFixed(0);
    },
    leapYear:function(_date){
    	var y = new Date(_date).getFullYear();
    	var x = (y % 100 === 0) ? (y % 400 === 0) : (y % 4 === 0);
    	return x
    },
    checkSubscription: function(_data){
    	var typeSubscription = '';
    	var subscription = {'premium':1,'invited':1,'basic':1};
    	var lapsed ={'premium':0,'invited':0,'basic':0};
    	var yearDays = this.leapYear(_data.subscription.type.premium.activationDate)? 366 : 365;
    	var codeInv = '';
    	//1 check premium
    	// check if it is lapsed
    	_data.subscription.type.premium.status &&  _data.subscription.type.premium.status !== 2 && this.timeElapsed(_data.subscription.type.premium.activationDate, yearDays)>0
	    	? ( 
	    		subscription.premium = 1,
	    		typeSubscription = 'premium',
	    		lapsed.premium = 0
	    	)
	    	: _data.subscription.type.premium.status &&  _data.subscription.type.premium.status !== 2
    			? (
    				subscription.premium = 2,
    				lapsed.premium = 1
    			)
    			: subscription.premium = 0;
    	//1 check invited
    	// check if it is lapsed
    	_data.subscription.type.invited.status &&  _data.subscription.type.invited.status !== 2 && this.timeElapsed(_data.subscription.type.invited.activationDate, 30)>0
    		? (
    			subscription.invited = 1,
    			!subscription.premium ? typeSubscription = 'invited' : null,
    			lapsed.invited = 0
    		)
	    	: _data.subscription.type.invited.status &&  _data.subscription.type.invited.status !== 2
    			? (
    				subscription.invited = 2,
    				lapsed.invited = 1
    			)
    			: subscription.invited = 0;
		if(lapsed.invited){
			for( var j in _data.codesFrom ){
		        _data.codesFrom[j].code === _data.subscription.type.invited.code
		        ? ( 
		        	_data.codesFrom[j].status = 2,
		        	codeInv =  _data.subscription.type.invited.code
		        )
		        : null;
		      } 
		}
    	//1 check basic
    	// check if it is lapsed
    	_data.subscription.type.basic.status &&  _data.subscription.type.basic.status !== 2 && this.timeElapsed(_data.subscription.type.basic.activationDate, yearDays)>0
    		? (
    			subscription.basic = 1,
    			!subscription.premium && !subscription.invited ? typeSubscription = 'basic' : null,
    			lapsed.basic = 0
    		)
	    	: _data.subscription.type.basic.status &&  _data.subscription.type.basic.status !== 2
    			? (
    				subscription.basic = 2,
    				lapsed.basic = 1
    			)
    			: subscription.basic = 0;	
    	return { 'type': typeSubscription, 'status': subscription, 'lapsed': lapsed , 'codesData': _data.codesFrom, 'codeInv': codeInv  }
    }
}

export default Utils