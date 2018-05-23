import React from 'react'

const List = {
	"config":{
		"service":"config",
		"method":"GET"
	},
	"createAccount":{
		"service":"register",
		"method":"POST"
	},
	"confirmAccount":{
		"service":"activate",
		"method":"GET"
	},
	"loginOld":{
		"service":"user/login",
		"method":"POST"
	},
	"login":{
		"service":"login",
		"method":"GET"
	},
	"getInfo":{
		"service":"getInfo",
		"method":"GET"
	},
	"logout":{
		"service":"logout",
		"method":"GET"
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
		"service":"updateProfile",
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
		"service":"delete-account",
		"method":"GET"
	},
	"confirmDeleteAccount":{
		"service":"user/confirmDeleteAccount",
		"method":"POST"
	},
	"recoverPassword":{
		"service":"recover",
		"method":"GET"
	},
	"confirmRecoverPassword":{
		"service":"confirmRecoverPassword",
		"method":"POST"
	},
	"changePassword":{
		"service":"user/changePassword",
		"method":"POST"
	},
	"getList":{
		"service":"getList",
		"method":"GET"
	},
	"getListPodSubs":{
		"service":"content/getListPodSubs",
		"method":"GET"
	},
	"getListPodFav":{
		"service":"content/getListPodFav",
		"method":"GET"
	},
	"getListEpiFav":{
		"service":"content/getListEpiFav",
		"method":"GET"
	},
	"getListEpiHistory":{
		"service":"content/getListEpiHistory",
		"method":"GET"
	},
	"getListEpiLater":{
		"service":"content/getListEpiLater",
		"method":"GET"
	},
	"getListEpiDown":{
		"service":"content/getListEpiDown",
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
	"getListChanOld":{
		"service":"content/getListChan",
		"method":"POST"
	},
	"getListChan":{
		"service":"canal",
		"method":"GET"
	},
	"getListChanMarketing":{
		"service":"marketing",
		"method":"GET"
	},
	"getListPodOld":{
		"service":"content/getListPod",
		"method":"POST"
	},
	"getListPod":{
		"service":"canal/podcasts",
		"method":"GET"
	},
		"getListPodSP13NM2D31":{
		"service":"content/getListPodSP13NM2D31",
		"method":"POST"
	},
		"getListPodF4RB2S":{
		"service":"content/getListPodF4RB2S",
		"method":"POST"
	},
		"getListPodD2P4RT2":{
		"service":"content/getListPodD2P4RT2",
		"method":"POST"
	},
		"getListPodH3ST4R31":{
		"service":"content/getListPodH3ST4R31",
		"method":"POST"
	},
		"getListPodM1G1Z3N2":{
		"service":"content/getListPodM1G1Z3N2",
		"method":"POST"
	},
	"getListEpiOld":{
		"service":"content/getListEpi",
		"method":"POST"
	},
	"getListEpi":{
		"service":"podcast/episodes",
		"method":"GET"
	},
	"getEpisode":{
		"service":"episode",
		"method":"GET"
	},
	"getListEpiFORBESDAILY":{
		"service":"content/getListEpiFORBESDAILY",
		"method":"POST"
	},
	"getListEpiFORBESEMPRENDE":{
		"service":"content/getListEpiFORBESEMPRENDE",
		"method":"POST"
	},
	"getListEpiFORBESPEOPLE":{
		"service":"content/getListEpiFORBESPEOPLE",
		"method":"POST"
	},
	"getListEpiFORBESREVIEW":{
		"service":"content/getListEpiFORBESREVIEW",
		"method":"POST"
	},
	"getListEpiFORBESSUMMIT30U30":{
		"service":"content/getListEpiFORBESSUMMIT30U30",
		"method":"POST"
	},
	"getListEpiFORBESSUMMITRS":{
		"service":"content/getListEpiFORBESSUMMITRS",
		"method":"POST"
	},
	"search":{
		"service":"search",
		"method":"GET"
	},
	"getPodInfo":{
		"service":"content/getPodInfo",
		"method":"GET"
	},
	"getListEpiRel":{
		"service":"content/getListEpiRel",
		"method":"GET"
	},
	"getListEpiNext":{
		"service":"content/getListEpiNext",
		"method":"GET"
	},
	"getListEpiBefore":{
		"service":"content/getListEpiBefore",
		"method":"GET"
	},
	"getListEpiLike":{
		"service":"content/getListEpiLike",
		"method":"GET"
	},
	"getListEpiShare":{
		"service":"content/getListEpiShare",
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
	"carousel":{
		"prevent":"getSlider",
		"service":"carousel",
		"method":"GET"
	},
	"getMostListenedOld":{
		"service":"blocks/getMostListened",
		"method":"GET"
	},
	"getMostListened":{
		"service":"most-listened",
		"method":"GET"
	},
	"getDownload":{
		"service":"blocks/getDownload",
		"method":"GET"
	},
	"getClaim":{
		"service":"claim-podcast",
		"method":"GET"
	},
	"getClaimPremium":{
		"service":"claim-podcast-premium",
		"method":"GET"
	},
	"getTravelOld":{
		"service":"blocks/getTravel",
		"method":"GET"
	},
	"getTravel":{
		"service":"different-trip",
		"method":"GET"
	},
	"getFeatured":{
		"service":"featured-podcast",
		"method":"GET"
	},
	"getSubscription":{
		"service":"blocks/getSubscription",
		"method":"GET"
	},
	"getListsBasic":{
		"service":"blocks/getListsBasic",
		"method":"POST"
	},
	"getNews":{
		"service":"blocks/getNews",
		"method":"POST"
	},
	"getOpinion":{
		"service":"comment",
		"method":"GET"
	},
	"saveOpinion":{
		"service":"comment",
		"method":"POST"
	},
	"deleteOpinion":{
		"service":"comment",
		"method":"DELETE"
	},
	"getBills":{
		"service":"user/getBills",
		"method":"POST"
	},
	"getSubscriptionList":{
		"service":"user/getSubscriptionList",
		"method":"POST"
	},
	"getListLater":{
		"service":"user/getListLater",
		"method":"POST"
	},
	"getListSuscribed":{
		"service":"user/getListSuscribed",
		"method":"POST"
	},
	"getListDownload":{
		"service":"user/getListDownload",
		"method":"POST"
	},
	"getListFavourite":{
		"service":"user/getListFavourite",
		"method":"POST"
	},
	"getListHistorial":{
		"service":"user/getListHistorial",
		"method":"POST"
	},
	"getListShared":{
		"service":"user/getListShared",
		"method":"POST"
	},
	"getNewOld":{
		"service":"content/getNew",
		"method":"POST"
	},
	"getNew":{
		"service":"podcast/new-episodes",
		"method":"GET"
	},
	"getNewChannel":{
		"service":"new-canal-episodes",
		"method":"GET"
	},
	"getPodcastOrigen":{
		"service":"podcast/origin",
		"method":"GET"
	},
	"getChannelOrigen":{
		"service":"canal",
		"method":"GET"
	},
	"getChannelOrigen2":{
		"description":"no slug",
		"service":"canal-details",
		"method":"GET"
	},
	"getEpisodeOrigen":{
		"service":"episode/origin",
		"method":"GET"
	},
	"saveToList":{
		"service":"saveToList",
		"method":"POST"
	},
	"setAvatar":{
		"service":"setAvatar",
		"method":"POST"
	},
	"getStatic":{
		"service":"pages",
		"method":"GET"
	},
	"getOffers":{
		"service":"offers",
		"method":"GET"
	},
	"getFile":{
		"service":"file-episode",
		"method":"GET"
	},
	"lastEpisodes":{
		"service":"last-episodes",
		"method":"GET"
	},
	"savePremiumPaypal":{
		"service":"paypal",
		"method":"GET"
	},
	"savePromotional":{
		"service":"promotional",
		"method":"GET"
	},
	"confirmPremium":{
		"service":"confirmPremium",
		"method":"GET"
	}
	
	
}
export default List
