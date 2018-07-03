import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

function uId () {
  const randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26))
  return randLetter + Date.now()
}

Vue.use(Vuex)

const state = {
  toDo: [{ id: uId(), created: new Date(), title: '안녕하세요1' }],
  doing: [{ id: uId(), created: new Date(), title: '안녕하세요2' }],
  done: [{ id: uId(), created: new Date(), title: '안녕하세요3' }],
  dialog: false,
  toEdit: {},
  toEditCards: null
}

const mutations = {
  updateCards (state, { cards, value }) {
    state[cards] = value
  },
  addCard (state, { cards, value }) {
    state[cards].push({ id: uId(), title: value, created: new Date() })
  },
  deleteCard (state) {
    const idx = state[state.toEditCards].findIndex(card => card.id === state.toEdit.id)
    if (idx !== -1) {
      Vue.delete(state[state.toEditCards], idx)
    }
    state.dialog = false
    state.toEdit = {}
    state.toEditCards = null
  },
  setDialog (state, payload) {
    state.dialog = payload
  },
  openDialog (state, { card, cards }) {
    state.dialog = true
    state.toEditCards = cards
    state.toEdit = card
  }
}

const mapFuncObj = (list, fn) => list.reduce((acc, v) => ({ ...acc, ...fn(v) }), {})

const saveBefore = (action) => ({
  [action] ({ commit, dispatch }, payload) {
    commit(action, payload)
    if (action === 'setDialog' && payload) {
      return
    }
    dispatch('saveCards')
  }
})

const actions = {
  saveCards ({ state }) {
    const { toDo, doing, done } = state
    console.log({ toDo, doing, done })
    return axios.post('http://topinut.lento.in/', { toDo, doing, done })
      .then(res => console.log('card saved!'))
  },
  ...mapFuncObj(['updateCards', 'addCard', 'deleteCard', 'setDialog'], saveBefore)
}

export default data => new Vuex.Store({
  state: { ...state, ...data }, mutations, actions
})
