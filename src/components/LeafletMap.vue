<template>
  <div class="leaf-map">
    <l-map :zoom="zoom"
           :center="center"
           @update:center="updateCenter"
           @update:zoom="updateZoom"
           >
       <l-tile-layer :url="url"
                     :attribution="attribution"></l-tile-layer>
       <l-marker  v-for="(stop, index) in locations"
                  :key="stop.stop_id"
                  :lat-lng="createMarker(stop.location.geocode.lat, stop.location.geocode.lng)"
                  :z-index-offset="stop.zIndex">
          <l-popup>
            <span class="stop-visuals">
              <strong>{{ stop.name }}<br/></strong>
            </span>
            {{ stop.location.address }}<br/>
            <button type="button"
                    class="btn btn-primary"
                    @click="openDescription(index)">Description</button>
          </l-popup>
          <l-icon :icon-size="stop.iconSize"
                  :icon-url="icon">
          </l-icon>
       </l-marker>
    </l-map>
  </div>
</template>

<script>
import {LMap, LTileLayer, LMarker, LPopup, LIcon} from 'vue2-leaflet'
import {CldImage, CldTransformation} from 'cloudinary-vue'
import icon from '../assets/pin.svg'
import EventBus from '../event_bus/EventBus'

export default {
  name: 'LeafletMap',

  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LIcon,
    CldImage,
    CldTransformation
  },

  props: {
    locations: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      center: L.latLng(-8.173828125000002, 21.453068633086783),
      zoom: 3,
      url:'https://tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=7322db1e4e254654a10f61d4a4b906c3',
      attribution:'&copy; <a href="https://www.thunderforest.com/privacy/">Thunderforest</a>',
      clicked: false,
      selectedLocation: null,
      icon: icon,
      saves: []
    }
  },

  methods: {
    createMarker(lat, lng) {
      return L.latLng(lat, lng)
    },
    enlarge(icon) {
      console.log(icon);
    },
    updateZoom(zoom) {
      this.zoom = zoom;
    },
    updateCenter(center) {
      this.center = center;
    },
    openDescription(index) {
      let location = this.locations[index];
      EventBus.$emit('open-description', location)
    }
  },

  mounted() {
    EventBus.$on('re-center', lnglat => {
      this.zoom = lnglat.zm;
      this.center = L.latLng(lnglat.lat, lnglat.lng);
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .leaf-map {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
  }
  .stop-visuals {
    color: black;
    font-size: 1.5em;
  }
</style>
