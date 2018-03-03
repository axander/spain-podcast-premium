import React from 'react'

const List = {
	"config":{
		"service":"config",
		"method":"GET"
	},
	"createAccount":{
		"service":"user/createAccount",
		"method":"POST"
	},
	"confirmAccount":{
		"service":"user/confirmAccount",
		"method":"POST"
	},
	"login":{
		"service":"user/login",
		"method":"POST"
	},
	"logout":{
		"service":"user/logout",
		"method":"POST"
	},
	"loginExt":{
		"service":"user/loginExt",
		"method":"POST"
	},
	"getUserData":{
		"service":"user/getUserData",
		"method":"GET"
	},
	"saveUserData":{
		"service":"user/saveUserData",
		"method":"POST"
	},
	"getPersonalData":{
		"service":"user/getPersonalData",
		"method":"GET"
	},
	"savePersonalData":{
		"service":"user/savePersonalData",
		"method":"POST"
	},
	"getSessionData":{
		"service":"user/getSessionData",
		"method":"GET"
	},
	"saveSessionData":{
		"service":"user/saveSessionData",
		"method":"POST"
	},
	"getPaymentData":{
		"service":"user/getPaymentData",
		"method":"GET"
	},
	"savePaymentData":{
		"service":"user/savePaymentData",
		"method":"POST"
	},
	"getTypeSubscription":{
		"service":"user/getTypeSubscription",
		"method":"GET"
	},
	"saveTypeSubscription":{
		"service":"user/saveTypeSubscription",
		"method":"POST"
	},
	"updateSubscription":{
		"service":"user/updateSubscription",
		"method":"POST"
	},
	"deleteAccount":{
		"service":"user/deleteAccount",
		"method":"POST"
	},
	"confirmDeleteAccount":{
		"service":"user/confirmDeleteAccount",
		"method":"POST"
	},
	"recoverPassword":{
		"service":"user/recoverPassword",
		"method":"GET"
	},
	"confirmRecoverPassword":{
		"service":"user/confirmRecoverPassword",
		"method":"POST"
	},
	"changePassword":{
		"service":"user/changePassword",
		"method":"POST"
	},
	"getListProSubs":{
		"service":"content/getListProSubs",
		"method":"GET"
	},
	"getListProFav":{
		"service":"content/getListProFav",
		"method":"GET"
	},
	"getListPodFav":{
		"service":"content/getListPodFav",
		"method":"GET"
	},
	"getListPodHistory":{
		"service":"content/getListPodHistory",
		"method":"GET"
	},
	"getListPodLater":{
		"service":"content/getListPodLater",
		"method":"GET"
	},
	"getListPodDown":{
		"service":"content/getListPodDown",
		"method":"GET"
	},
	"getTypeSubscription":{
		"service":"user/getTypeSubscription",
		"method":"GET"
	},
	"getListPayments":{
		"service":"user/getListPayments",
		"method":"GET"
	},
	"getListCodeInv":{
		"service":"user/getListCodeInv",
		"method":"GET"
	},
	"sendCodeInv":{
		"service":"user/sendCodeInv",
		"method":"POST"
	},
	"setCodeInv":{
		"service":"user/setCodeInv",
		"method":"POST"
	},
	"getListDevice":{
		"service":"user/getListDevice",
		"method":"GET"
	},
	"getListIdentity":{
		"service":"user/getListIdentity",
		"method":"GET"
	},
	"getListChan":{
		"service":"content/getListChan",
		"method":"GET"
	},
	"getListPro":{
		"service":"content/getListPro",
		"method":"GET"
	},
		"getListProSP13NM2D31":{
		"service":"content/getListProSP13NM2D31",
		"method":"GET"
	},
		"getListProF4RB2S":{
		"service":"content/getListProF4RB2S",
		"method":"GET"
	},
		"getListProD2P4RT2":{
		"service":"content/getListProD2P4RT2",
		"method":"GET"
	},
		"getListProH3ST4R31":{
		"service":"content/getListProH3ST4R31",
		"method":"GET"
	},
		"getListProM1G1Z3N2":{
		"service":"content/getListProM1G1Z3N2",
		"method":"GET"
	},
	"getListPod":{
		"service":"content/getListPod",
		"method":"GET"
	},
	"getListPodFORBESDAILY":{
		"service":"content/getListPodFORBESDAILY",
		"method":"GET"
	},
	"getListPodFORBESEMPRENDE":{
		"service":"content/getListPodFORBESEMPRENDE",
		"method":"GET"
	},
	"getListPodFORBESPEOPLE":{
		"service":"content/getListPodFORBESPEOPLE",
		"method":"GET"
	},
	"getListPodFORBESREVIEW":{
		"service":"content/getListPodFORBESREVIEW",
		"method":"GET"
	},
	"getListPodFORBESSUMMIT30U30":{
		"service":"content/getListPodFORBESSUMMIT30U30",
		"method":"GET"
	},
	"getListPodFORBESSUMMITRS":{
		"service":"content/getListPodFORBESSUMMITRS",
		"method":"GET"
	},
	"search":{
		"service":"content/search",
		"method":"GET"
	},
	"getPodInfo":{
		"service":"content/getPodInfo",
		"method":"GET"
	},
	"getListPodRel":{
		"service":"content/getListPodRel",
		"method":"GET"
	},
	"getListPodNext":{
		"service":"content/getListPodNext",
		"method":"GET"
	},
	"getListPodBefore":{
		"service":"content/getListPodBefore",
		"method":"GET"
	},
	"getListPodLike":{
		"service":"content/getListPodLike",
		"method":"GET"
	},
	"getListPodShare":{
		"service":"content/getListPodShare",
		"method":"GET"
	},
	"setListPodLike":{
		"service":"content/setListPodLike",
		"method":"POST"
	},
	"setListProSubs":{
		"service":"content/setListProSubs",
		"method":"POST"
	},
	"setListPodFav":{
		"service":"content/setListPodFav",
		"method":"POST"
	},
	"setListPodLater":{
		"service":"content/setListPodLater",
		"method":"POST"
	},
	"setListPodShare":{
		"service":"content/setListPodShare",
		"method":"POST"
	},
	"getPod":{
		"service":"content/getPod",
		"method":"GET"
	},
	"setListPodOff":{
		"service":"content/setListPodOff",
		"method":"POST"
	},
	"getModelo":{
		"service":"blocks/getModelo",
		"method":"GET"
	},
	"getAdv":{
		"service":"blocks/getAdv",
		"method":"GET"
	},
	"getSlider":{
		"service":"blocks/getSlider",
		"method":"GET"
	},
	"getMostListened":{
		"service":"blocks/getMostListened",
		"method":"GET"
	},
	"getDownload":{
		"service":"blocks/getDownload",
		"method":"GET"
	},
	"getTravel":{
		"service":"blocks/getTravel",
		"method":"GET"
	},
	"getSubscription":{
		"service":"blocks/getSubscription",
		"method":"GET"
	},
	"getListsBasic":{
		"service":"blocks/getListsBasic",
		"method":"POST"
	}
}
export default List
