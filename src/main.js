import './scss/main.scss' //Bootstrap SASS import
import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router' //Router imports
import SignIn from './views/SignIn'
import SignUp from './views/SignUp'
import MapApp from './views/MapApp'
import AuthStore from './stores/AuthStore'
import { Icon }  from 'leaflet' //leaflet imports
import 'leaflet/dist/leaflet.css'

//Use vue-Router.
Vue.use(Router);

//Routes for the router.
const routes = [
  {path: '/sign-up', component: SignUp},
  {path: '/sign-in', component: SignIn},
  {path: '/', component: MapApp,
              meta: {
                requiresAuth: true
              }
  }
];

//Activate the router.
const router = new Router({routes});

router.beforeEach((to, from, next) => {
  //The if statement below returns a boolean.
  //record are the paths?
  //So it asks if any of the records require auth?
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!AuthStore.state.user) {
      next('/sign-in');
    } else {
      next()
    }
  } else {
    next()
  }
})

//Leaflet codes
// this part resolve an issue where the markers would not appear
delete Icon.Default.prototype._getIconUrl;

Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
