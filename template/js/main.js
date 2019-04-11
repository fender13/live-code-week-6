const baseURL = 'http://localhost:3000'
const token = localStorage.getItem('token')

var app = new Vue({
  el: '#app',
  data: {
    isLogin: false,
    email: '',
    password: '',
    errorLogin: '',
    randomJoke: '',
    faveJokes: []

  },
  created() {
    if (token != null) {
      this.verifyUser()
    }
  },
  methods: {
    verifyUser() {
      axios
        .get(`${baseURL}/verify`, {
          headers: { access_token: token }
        })

        .then(({ data }) => {
          this.isLogin = true
          this.getRandomJokes()
          this.getAllFaveJokes()
        })
        .catch(({ response }) => {
          console.log(response)
        })
    },
    userLogin() {
      let dataLogin = {
        email: this.email,
        password: this.password
      }

      axios
        .post(`${baseURL}/login`, dataLogin)

        .then(({ data }) => {
          localStorage.setItem('token', data.token)
          this.isLogin = true
          this.getRandomJokes()
          this.getAllFaveJokes()
        })
        .catch(({ response }) => {
          this.errorLogin = response.data.message
        })
    },
    getRandomJokes() {
      axios
        .get(`${baseURL}/jokes`)

        .then(({ data }) => {
          this.randomJoke = data.jokes
        })
        .catch(({ response }) => {
          console.log(response)
        })
    },
    saveRandomJoke(joke) {
      let dataJoke = {
        joke: joke
      }

      axios
        .post(`${baseURL}/favorites`, dataJoke, {
          headers: { access_token: token }
        })

        .then(({ data }) => {
          this.getRandomJokes()
          this.faveJokes.push(data)
        })
        .catch(({ response }) => {
          console.log(response)
        })
    },
    getAllFaveJokes() {
      axios
        .get(`${baseURL}/saved`, {
          headers: { access_token: token}
        })

        .then(({ data }) => {
          this.faveJokes = []
          this.faveJokes = data
        })
        .catch(({ response }) => {
          console.log(response)
        })
    },
    deleteSavedJoke(id) {
      axios
        .delete(`${baseURL}/favorites/${id}`, {
          headers: { access_token: token}
        })

        .then(({ data }) => {
          let idDelete = data._id
          
          for (let i = 0; i < this.faveJokes.length; i++) {
            if (this.faveJokes[i]._id == idDelete) {
              this.faveJokes.splice(i, 1)
            }
          }

        })
        .catch(({ response }) => {
          console.log(response)
        })

    },
    userLogout() {
      localStorage.clear()
      this.isLogin = false
    } 
  }
})