const Utils = {
  formatGetParameters: function(_params){
		var getParams = _params 
						? Object.keys(_params).map(function(key) { return key + '=' + _params[key] }).join('&')
						:undefined;
		return getParams
	}
}

export default Utils