import { polyfill } from 'es6-promise'; polyfill();
// A simple data API that will be used to get the data for our
// components. On a real website, a more robust data fetching
// solution would be more appropriate.
const SingleUserAPI = {
  singleUsers: [
    { id:'Home01', number: 1, name: "Home Op1", position: "G", sub:"./" },
    { id:'Home02', number: 2, name: "Home Op2", position: "D", sub:"./"  },
    { id:'Home03', number: 3, name: "Home Op3", position: "D", sub:"./"  },
    { id:'Home04', number: 4, name: "Home Op4", position: "M", sub:"./"  },
    { id:'personalData', name: "Personal Data", position: "U", sub:"/user"  },
    { id:'bankData', name: "Bank Data", position: "U", sub:"/user"  },
    { id:'subscriptionData', name: "Subscription Data", position: "U", sub:"/user"  },
    { id:'sessionData', name: "Session Data", position: "U", sub:"/user"  },
    { id:'Home01', number: 10, name: "Contenido Listado Op2", position: "D", sub:"/content"  },
    { id:'Home01', number: 11, name: "Contenido Listado Op3", position: "D", sub:"/content"  },
    { id:'Home01', number: 12, name: "Contenido Listado Op4", position: "M", sub:"/content"  },
    { id:'Home01', number: 13, name: "Podcast Op1", position: "G", sub:"/podcast"  },
    { id:'Home01', number: 14, name: "Podcast Op2", position: "D", sub:"/podcast"  },
    { id:'Home01', number: 15, name: "Podcast Op3", position: "D", sub:"/podcast"  },
    { id:'Home01', number: 16, name: "Podcast Op4", position: "M", sub:"/podcast"  }
  ],
  all: function() { return this.singleUsers},
  get: function(id) {
    const isSingleUser = p => p.id === id
    return this.singleUsers.find(isSingleUser)
  }
}

export default SingleUserAPI