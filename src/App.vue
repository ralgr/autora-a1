<template>
  <div id="col-12">
    <LeafletMap/>
    <ResultList/>
  </div>
</template>

<script>
import LeafletMap from './components/LeafletMap.vue'
import ResultList from './components/ResultList.vue'

export default {
  name: 'app',
  components: {
    LeafletMap,
    ResultList
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
