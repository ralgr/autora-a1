<template lang="html">
  <div class="col-12">
    <!-- Result list error shower-->
    <small class="text-muted"
           v-show="locations">{{ locations.length }} results</small>
    <small class="text-muted"
           v-show="errors"><span class="text-danger">{{ errors }}</span></small>

    <!-- Result list -->
    <ul class="list-group"
        :class="{overflow: long}">
      <li class="list-group-item"
          v-for="(stop, index) in locations"
          :key="stop.stop_id"
          @click="highlightCard(index)"
          @mouseover="hovered(index)"
          @mouseleave="unhovered(index)">{{ stop.name }}</li>
    </ul>

    <!-- Highlight cards -->
    <div class="cardFocus"
         v-if="clicked">
      <div class="card"
           style="width: 18rem;">
           <!-- Card image -->
           <cld-image :cloudName="selectedLocation.picture.cloudinary_cloud_name"
                      :publicId="selectedLocation.picture.cloudinary_public_id"
                      secure="true"
                      dpr="auto"
                      width="auto"
                      crop="scale">
             <cld-transformation height="250"
                                 crop="thumb"
                                 gravity="faces"/>
           </cld-image>
        <div class="card-body">
          <h5 class="card-title">{{ selectedLocation.name }}</h5>
          <p class="card-text">{{ selectedLocation.summary }}</p>
          <h6 class="card-title">Accessibility Information</h6>
          <p class="card-text">{{ wheelchair }}</p>
          <h6 class="card-title">Location Details</h6>
          <p class="card-text">{{ selectedLocation.location.address }}</p>
          <p class="card-text">{{ selectedLocation.location.country }}</p>
          <a href="#"
             class="btn btn-secondary btn-space"
             @click="closeCard">Close</a>
          <a href="#"
             class="btn btn-success btn-space"
             @click="save">Save</a>
          <a href="#"
             class="btn btn-primary btn-space"
             @click="reCenter(selectedLocation.location.geocode.lng, selectedLocation.location.geocode.lat)">Find</a>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {CldImage, CldTransformation} from 'cloudinary-vue'
import EventBus from '../event_bus/EventBus'
import { db,} from '../config/Firebase'
import AuthStore from '../stores/AuthStore'

export default {
  name: 'ResultList',

  components: {
    CldImage,
    CldTransformation
  },

  props: {
    locations: {
      type: Array,
      required: true
    },
    errors: {
      required: true
    }
  },

  data() {
    return {
        clicked: false,
        focusZoom: 20,
        selectedLocation: null
    }
  },

  methods: {
    highlightCard(index) {
      this.selectedLocation = this.locations[index];
      this.clicked = true;
    },
    closeCard() {
      this.clicked = false;
    },
    hovered(index) {
      this.$emit('hovered-stop', index)
    },
    unhovered(index) {
      this.$emit('unhovered-stop', index)
    },
    reCenter(lng, lat) {
      this.clicked = false;
      let lnglat = {lng: lng, lat: lat, zm: this.focusZoom}
      EventBus.$emit('re-center', lnglat)
    },
    save() {
      db.collection('saved-stops')
        .add({
          user: AuthStore.state.user.email,
          name: this.selectedLocation.name,
          address: this.selectedLocation.location.address,
          accessibility: this.wheelchair,
          latlng: [this.selectedLocation.location.geocode.lng, this.selectedLocation.location.geocode.lat]
        })
      console.log('Save event occurred');
    }
  },

  computed: {
    long() {
      return this.locations.length >= 10 ? true : false
    },
    wheelchair() {
      return this.selectedLocation.accessibility.wheelchair ? 'Wheelchair access available.' : 'No wheelchair access / Undefined.'
    }
  },

  mounted() {
    EventBus.$on('open-description', location => {
      this.selectedLocation = location;
      this.clicked = true;
    });
  }
}
</script>

<style lang="scss" scoped>
  .overflow {
    overflow-y: scroll;
    height: 50vh;
  }

  ul {
    li:hover {
      transition: all 0.2s ease-in-out;
      background: royalblue;
      color: white;
      cursor: pointer;;
    }
  }

  .btn-space {
    margin: 0.15em;
    float: right;
  }
</style>
