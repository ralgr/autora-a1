<template lang="html">
  <div class="container">
    <div class="col-12">

      <div class="row">
        <div class="col-12 title-vis-override">
          <h1 class="display-5">Description Map</h1>
        </div>
      </div>
      <div class="row">
        <div class="col-12 padding visual-override">
          <SearchBar @on-search="showResults"
                     @on-search-error="showError"/>
          <ResultList :locations="locations"
                      :errors="mapErr"/>
        </div>
        <div class="col-6">
          <LeafletMap :locations="locations"/>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import LeafletMap from '../components/LeafletMap'
import ResultList from '../components/ResultList'
import SearchBar from '../components/SearchBar'

export default {
  name: 'MapApp',

  components: {
    LeafletMap,
    ResultList,
    SearchBar
  },

  data() {
    return {
      groupContext: null,
      stopType: null,
      locations: [],
      mapErr: null
    }
  },

  methods: {
    showResults(locations) {
      this.mapErr = null
      this.locations = locations
    },
    showError(errors) {
      this.mapErr = null
      this.mapErr = errors
    }
  }
}
</script>

<style lang="scss" scoped>
  .padding {
    padding: 1em;
  }
  .visual-override {
    z-index: 9998 !important;
    position: fixed;
    left: 0px;
    top: 10em;
    width: 13%;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }
  .visual-override:hover {
    background: rgba(22, 23, 22, 0.1);
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
