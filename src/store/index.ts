import { createStore, Store } from 'vuex'
import { localStoragePlugin } from './plugins/localStoragePlugin'

export interface Person {
  url: string
  name: string
  mass: string
  height: string
  hair_color: string
}

export interface State {
  people: Person[]
  favorites: Person[]
}

export default createStore<State>({
  state: {
    people: [],
    favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
  },
  mutations: {
    setPeople(state, people: Person[]) {
      state.people = people
    },
    addToFavorites(state, person: Person) {
      if (!state.favorites.find((p) => p.url === person.url)) {
        state.favorites.push(person)
      }
    },
    removeFromFavorites(state, person: Person) {
      state.favorites = state.favorites.filter((p) => p.url !== person.url)
    },
  },
  actions: {
    async fetchPeople({ commit }) {
      try {
        const response = await fetch('https://swapi.dev/api/people')
        const data = await response.json()
        commit('setPeople', data.results)
      } catch (error) {
        console.error('Error:', error)
      }
    },
  },
  getters: {
    getPersonById: (state) => (name: string) => {
      return state.people.find((person) => person.url === name)
    },
    getFavorites: (state) => {
      return state.favorites
    },
  },
  plugins: [localStoragePlugin as (store: Store<State>) => void],
})
