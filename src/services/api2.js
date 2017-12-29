import { polyfill } from 'es6-promise'; polyfill();
// A simple data API that will be used to get the data for our
// components. On a real website, a more robust data fetching
// solution would be more appropriate.
const UsuarioApi = {
  options: {
    '/':[
      { id:"Home01", name: "Home Op1", position: "H", sub:"/" },
      { id:"Home02", name: "Home Op2", position: "H", sub:"/" },
      { id:"Home03", name: "Home Op3", position: "H" , sub:"/" },
      { id:"Home04", name: "Home Op4", position: "H", sub:"/" }
    ],
    '/user':[
      { id:"personalData", name: "personalData", position: "U" , sub:"/user" },
      { id:"bankData", name: "bankData", position: "U" , sub:"/user" },
      { id:"sessionData", name: "sessionData", position: "U" , sub:"/user" },
      { id:"subscriptionData", name: "subscriptionData", position: "U" , sub:"/user" },
      { id:"deleteAccount", name: "deleteAccount", position: "U" , sub:"/user" }
    ],
    '/content':[
      { id:"Content01", name: "content Op1", position: "C" , sub:"/content" },
      { id:"Content02", name: "content Op2", position: "C" , sub:"/content" },
      { id:"Content03", name: "content Op3", position: "C" , sub:"/content" }
    ],
    '/podcast':[
      { id:"Podcast01", name: "podcast Op1", position: "P" , sub:"/podcast" },
      { id:"Podcast02", name: "podcast Op2", position: "P" , sub:"/podcast" },
      { id:"Podcast03", name: "podcast Op3", position: "P" , sub:"/podcast" },
      { id:"Podcast04", name: "podcast Op4", position: "P" , sub:"/podcast" }
    ],
    '/favourites':[
      { id:"Fav01", name: "Fav Op1", position: "F" , sub:"/favourites" },
      { id:"Fav02", name: "Fav Op2", position: "F" , sub:"/favourites" },
      { id:"Fav03", name: "Fav Op3", position: "F" , sub:"/favourites" },
      { id:"Fav04", name: "Fav Op4", position: "F" , sub:"/favourites" }
    ]
  },
  all: function(_op) { return this.options[_op]},
  get: function(id) {
    const isOption = p => p.id === id
    return this.options.find(isOption)
  }
}

export default UsuarioApi