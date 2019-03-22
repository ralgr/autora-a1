import './scss/main.scss' //Bootstrap SASS import
import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router' //Router imports
import SignIn from './views/SignIn'
import SignUp from './views/SignUp'
import MapApp from './views/MapApp'

//Use vue-Router.
Vue.use(Router);

//Routes for the router.
const routes = [
  {path: '/sign-up', component: SignUp},
  {path: '/sign-in', component: SignIn},
  {path: '/map-app', component: MapApp}
];

//Activate the router.
const router = new Router({routes});

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
