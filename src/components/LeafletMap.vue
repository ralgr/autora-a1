<template>
  <div class="brew-map">
    <l-map :zoom="zoom"
           :center="center">
       <l-tile-layer :url="url"
                     :attribution="attribution"></l-tile-layer>
       <l-marker  v-for="(stop, index) in locations" :key="stop.stop_id"
                  :lat-lng="createMarker(stop.location.geocode.lat, stop.location.geocode.lng)">
          <l-popup>
            <span class="stop-visuals">
              <strong>{{ stop.name }}<br/></strong>
            </span>
            <button type="button" class="btn btn-primary">Description</button>
          </l-popup>
       </l-marker>
    </l-map>
  </div>
</template>

<script>
import {LMap, LTileLayer, LMarker, LPopup, LIcon} from 'vue2-leaflet'

export default {
  name: 'LeafletMap',

  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LIcon
  },

  props: {
    locations: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      zoom:3,
      center: L.latLng(21.453068633086783, -8.173828125000002),
      url:'https://tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=7322db1e4e254654a10f61d4a4b906c3',
      attribution:'&copy; <a href="https://www.thunderforest.com/privacy/">Thunderforest</a>',
    }
  },

  methods: {
    createMarker(lat, lng) {
      return L.latLng(lat, lng)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .brew-map {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
  }
  .stop-visuals {
    color: black;
    font-size: 2em;
  }
</style>
