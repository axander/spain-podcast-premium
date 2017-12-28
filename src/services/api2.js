import { polyfill } from 'es6-promise'; polyfill();
// A simple data API that will be used to get the data for our
// components. On a real website, a more robust data fetching
// solution would be more appropriate.
const UsuarioApi = {
  options: {
    '/':[
      { number: 1, name: "Home Op1", position: "G", sub:"/" },
      { number: 2, name: "Home Op2", position: "D", sub:"/" },
      { number: 3, name: "Home Op3", position: "D" , sub:"/" },
      { number: 4, name: "Home Op4", position: "M", sub:"/" }
    ],
    '/user':[
      { id:"personalData", name: "personalData", position: "U" , sub:"/user" },
      { id:"bankData", name: "bankData", position: "U" , sub:"/user" },
      { id:"sessionData", name: "sessionData", position: "U" , sub:"/user" },
      { id:"subscriptionData", name: "subscriptionData", position: "U" , sub:"/user" }
    ],
    '/content':[
      { number: 9, name: "content Op1", position: "G" , sub:"/content" },
      { number: 10, name: "content Op2", position: "D" , sub:"/content" },
      { number: 11, name: "content Op3", position: "D" , sub:"/content" },
      { number: 12, name: "content Op4", position: "M" , sub:"/content" }
    ],
    '/podcast':[
      { number: 13, name: "podcast Op1", position: "G" , sub:"/podcast" },
      { number: 14, name: "podcast Op2", position: "D" , sub:"/podcast" },
      { number: 15, name: "podcast Op3", position: "D" , sub:"/podcast" },
      { number: 16, name: "podcast Op4", position: "M" , sub:"/podcast" }
    ]
  },
  all: function(_op) { return this.options[_op]},
  get: function(id) {
    const isOption = p => p.id === id
    return this.options.find(isOption)
  }
}

export default UsuarioApi