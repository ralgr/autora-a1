<template lang="html">
  <div class="container">
    <div class="col-12">

      <div class="row">
        <div class="col-11 padding visual-override">
          <h1 class="display-5">Information Map</h1>
          <SearchBar @show-locations="showResults"/>
        </div>
        <div class="col-1">
          <LeafletMap :locations="locations"/>

        </div>
      </div>

    </div>
  </div>
</template>

<script>
import LeafletMap from '../components/LeafletMap'
import SearchBar from '../components/SearchBar'

export default {
  name: 'MapApp',

  components: {
    LeafletMap,
    SearchBar
  },

  data() {
    return {
      groupContext: null,
      stopType: null,
      locations: [],
      mapErr: null,
      hovered: null
    }
  },

  methods: {
    showResults(locations) {
      this.mapErr = null
      this.locations = locations
    },
    hoveredStop(index) {
      this.hovered = index
    }
  }
}
</script>

<style lang="scss" scoped>
  .padding {
    padding: 1em;
  }
  .visual-override {
    z-index: 1 !important;
    position: fixed;
    left: 0px;
    top: 10em;
    width: 22em;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }
  .visual-override:hover {
    background: rgba(22, 23, 22, 0.3);
    transition: all 0.2s ease-in-out;
  }
  .title-vis-override {
    z-index: 9998 !important;
    position: fixed;
    left: 0px;
    top: 5em;
    padding-left: 2em;
  }
</style>
