// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'
import store from './store/store'

Vue.use(VueMaterial)

// Initialize Firebase
var config = {
  apiKey: "AIzaSyARzHvxkE2OltzCipFR311uemD8dOdnq3U",
  authDomain: "sitema-tercnico.firebaseapp.com",
  databaseURL: "https://sitema-tercnico.firebaseio.com",
  projectId: "sitema-tercnico",
  storageBucket: "sitema-tercnico.appspot.com",
  messagingSenderId: "915897620611"
};
firebase.initializeApp(config);

window.firebase = firebase


Vue.config.productionTip = false

/* eslint-disable no-new */

const unsuscribe = firebase.auth().onAuthStateChanged(user => {

  store.dispatch('setUser', user)

  new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
  })

  unsuscribe()


})