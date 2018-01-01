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
	checkScene: function(_scene){
    	var checked = false;
    	typeof localStorage.getItem('lastState') !== 'undefined' && localStorage.getItem('lastState') && localStorage.getItem('lastState').indexOf(_scene)>=0
    	? checked = true
    	: checked = false;
    	return checked
    }
}

export default Utils