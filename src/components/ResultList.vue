<template lang="html">
  <div class="col-12">
    <!-- Result list -->
    <small class="text-muted"
           v-show="locations.length">{{ locations.length }} results</small>
    <small class="text-muted"
           v-show="!locations.length && !errors">No results</small>
    <small class="text-muted"
           v-show="errors"><span class="text-danger">{{ errors }}</span></small>
    <ul class="list-group"
        :class="{overflow: long}">
      <li class="list-group-item"
          v-for="(stop, index) in locations"
          :key="stop.stop_id"
          @click="highlightCard(index)">{{ stop.name }}</li>
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
             class="btn btn-primary"
             @click="closeCard">Close</a>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {CldImage, CldTransformation} from 'cloudinary-vue';

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
    }
  },

  computed: {
    long() {
      return this.locations.length >= 10 ? true : false
    },
    wheelchair() {
      return this.selectedLocation.accessibility.wheelchair ? 'Wheelchair access available.' : 'No wheelchair access / Undefined.'
    }
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
</style>
