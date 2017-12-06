// A simple data API that will be used to get the data for our
// components. On a real website, a more robust data fetching
// solution would be more appropriate.
const SingleUserAPI = {
  singleUsers: [
    { number: 1, name: "Home Op1", position: "G", sub:"./" },
    { number: 2, name: "Home Op2", position: "D", sub:"./"  },
    { number: 3, name: "Home Op3", position: "D", sub:"./"  },
    { number: 4, name: "Home Op4", position: "M", sub:"./"  },
    { number: 5, name: "Registro", position: "G" , sub:"/user" },
    { number: 6, name: "Identificación", position: "D", sub:"/user"  },
    { number: 7, name: "Modificación", position: "D", sub:"/user"  },
    { number: 8, name: "Consulta", position: "M", sub:"/user"  },
    { number: 9, name: "Contenido Listado Op1", position: "G", sub:"/content"  },
    { number: 10, name: "Contenido Listado Op2", position: "D", sub:"/content"  },
    { number: 11, name: "Contenido Listado Op3", position: "D", sub:"/content"  },
    { number: 12, name: "Contenido Listado Op4", position: "M", sub:"/content"  },
    { number: 13, name: "Podcast Op1", position: "G", sub:"/podcast"  },
    { number: 14, name: "Podcast Op2", position: "D", sub:"/podcast"  },
    { number: 15, name: "Podcast Op3", position: "D", sub:"/podcast"  },
    { number: 16, name: "Podcast Op4", position: "M", sub:"/podcast"  }
  ],
  all: function() { return this.singleUsers},
  get: function(id) {
    const isSingleUser = p => p.number === id
    return this.singleUsers.find(isSingleUser)
  }
}

export default SingleUserAPI