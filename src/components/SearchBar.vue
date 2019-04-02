<template lang="html">
  <div class="col-12">
    <div class="row">

      <div class="col-12">
        <div class="row">

          <div class="col-7">

            <form @submit.prevent="exeSearch">
              <div class="form-group">
                <label for="groupCont"><strong>Group Context</strong></label>
                <select id="groupCont"
                        class="groupCont"
                        name="groupCont"
                        v-model="selectedCont">
                  <option v-for="(context, index) in groupCont"
                          :key="index"
                          :value="context.type">{{ context.name }}</option>
                </select>
              </div>

              <div class="form-group">
                <label for="stopTypes"><strong>Stop Type</strong></label>
                <select id="stopTypes"
                        class="stopTypes"
                        name="stopTypes"
                        v-model="selectedType">
                  <option v-for="(type, index) in stopTypes"
                          :key="index"
                          :value="type.type">{{ type.name }}</option>
                </select>
              </div>

              <button type="submit" class="btn btn-success">Go!</button>

            </form>

          </div>

        </div>

        <div class="row">

            <ResultList :locations="locations"
                        :errors="errors"/>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { AUTORA_KEY } from '../config/AutoraKey'
import ResultList from './ResultList'

export default {
  name: 'SearchBar',

  components: {
    ResultList
  },

  data() {
    return {
      groupCont: [
        {name: 'Solo', type: 'solo'},
        {name: 'Couple', type: 'couple'},
        {name: 'Friends', type: 'friends'},
        {name: 'Kids', type: 'kids'},
        {name: 'Teenagers', type: 'teenagers'},
        {name: 'Group', type: 'group'},
        {name: 'Party', type: 'party'}
      ],
      stopTypes: [
        {name: 'Accommodation', type: 'accom'},
        {name: 'Food', type: 'food'},
        {name: 'Event', type: 'event'},
        {name: 'Points of interest', type: 'poi'},
        {name: 'Attraction', type: 'attraction'},
        {name: 'Tour', type: 'tour'}
      ],
      selectedCont: null,
      selectedType: null,
      locations: [],
      key: AUTORA_KEY,
      errors: null
    }
  },

  methods: {
    exeSearch() {
      console.log('Executing search');
      const autora = axios.create({ headers: { 'Authorization': 'Bearer ' + this.key } })
      var url = `https://api.autoura.com/api/stops/search?group_context=${this.selectedCont}&stop_types=${this.selectedType}`
      autora.get(url)
        .then(r => {
          this.errors = null;
          let response = r.data.response.map(response => {
            response.iconSize = null;
            return response
          })
          this.locations = response
          this.$emit('show-locations', this.locations)
        }).catch(e => {
          this.errors = null;
          let errMsg = {500: 'Stop type is required at the minimum.'};
          let error = errMsg[e.response.status];
          this.errors = error
        });
    }
  }
}

</script>

<style lang="scss" scoped>
  select {
    border-radius: 5px;
    padding: .2em;
    width: 100%;
  }

  .search {
    width: 100%;
    padding: .5em;
    border-radius: 5px;
    border-width: 1px;
  }

</style>
