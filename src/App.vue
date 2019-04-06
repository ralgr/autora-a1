<template>
  <div class="container position">
    <div v-if="loading" class="col-5 offset-md-5 loader-pos">
      <div class="spinner-border text-primary" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>

    <div v-if="!loading" class="col-5 mx-auto">

      <div class="row">
        <div class="col-12 visual-override">

          <!-- [navigation links] -->
          <ul class="nav">
            <li class="nav-item"
                v-if="!user">
              <router-link class="nav-link" :to="'/sign-up'">
                Sign up
              </router-link>
            </li>
            <li class="nav-item"
                v-if="!user">
              <router-link class="nav-link" :to="'/sign-in'">
                Sign in
              </router-link>
            </li>
            <li class="nav-item"
                v-if="user">
              <router-link class="nav-link" :to="'/sign-in'">
                <span @click="signOut">
                  Sign out ({{ user.email }})
                </span>
              </router-link>
            </li>
            <li class="nav-item"
                v-if="user">
              <button type="button"
                      name="savedLocations"
                      class="btn btn-outline-info"
                      @click="openSaves">Saved locations</button>
            </li>
          </ul>
        </div> <!-- [header1 column] end -->
      </div> <!-- [header row] end -->
    </div> <!-- [#container] end -->

    <div class="row"
         v-if="!loading">
      <div class="col-12">
        <router-view/> <!--  The view window. The area in which views are shown. -->
      </div>
    </div> <!-- [content row] end -->

    <div class="saveContainer">
      <SaveList :saves="saved"/>
    </div>

    </div>
</template>

<script>
import { fireB } from './config/Firebase'
import AuthStore from './stores/AuthStore'
import SaveList from './components/SaveList'
import { db,} from './config/Firebase'
import EventBus from './event_bus/EventBus'

export default {
  name: 'app',

  components: {
    SaveList
  },

  data() {
    return{
      user: null,
      loading: true,
      saved: []
    }
  },

  methods: {
    signOut() {
      console.log('A user has signed out');
      fireB.auth().signOut();
      this.user = null;
      EventBus.$emit('close-down', this.user);
      AuthStore.clearAuthAction();
      console.log('user now contains: ' + this.user);
      this.$router.push('/sign-in');
    },
    openSaves() {
      console.log('Triggered open saves');
      db.collection('saved-stops')
        .onSnapshot(snap => {
          this.saved = [];
          snap.forEach(doc => {
            if (doc.data().user === AuthStore.state.user.email) {
              this.saved.push(doc);
            }
          })
        });
      EventBus.$emit('open-saves', this.saved)
    }
  },

  created() {
    console.log('Created event fired on App.vue');
    fireB.auth().onAuthStateChanged(user => {
      this.loading = false
      if (user) {
        // User is signed in.
        this.user = user;
        AuthStore.setAuthAction(user);
        this.$router.push('/')
        console.log(user.email + ' is currently logged in');
        console.log(this.user.email + ' is currently in the user variable');
        console.log(AuthStore.state.user.email + ' is currently in the user state');
        // ...
      } else {
        // User is signed out.
        fireB.auth().signOut();
        // this.user = null;
        // ...
      }
    });
  }
}
</script>

<style lang="scss" scoped>
  .position {
    position: relative;
  }
  .loader-pos {
    margin-top: 5vh;
  }
  .visual-override {
    z-index: 9998 !important;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    padding: 0.5em;
  }
  .visual-override:hover {
    background: white;
    transition: all 0.2s ease-in-out;
  }
</style>
