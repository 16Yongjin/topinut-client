import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import store from './store'
import axios from 'axios'

Vue.config.productionTip = false

axios.get('http://topinut.lento.in')
  .then(({data}) => {
    console.log('done initial loading data', data)
    new Vue({
      store: store(data),
      render: h => h(App)
    }).$mount('#app')
  })
