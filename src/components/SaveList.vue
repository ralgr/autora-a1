<template lang="html">
  <div v-if="clicked">
    <div class="card position"
         :class="{overflow: long}"
         style="width: 21.65rem;"
         id="saveList"
         @mousedown="mouseDown"
         @mouseup="mouseUp"
         @mousemove="mouseMove">
        <div class="card-body custom-cursor">
          <h5 class="card-title">Saved locations</h5>
          <p><small class="text-muted">Note** To see the marker when clicking the find on map button, search for the locations using the Search Bar on the left first.</small></p>
          <h6 class="card-subtitle mb-2 text-muted">Places to visit:</h6>

          <div class="card card-margin"
               style="width: 18rem;"
               v-for="save in saves"
               :key="save.id">
            <div class="card-body">
              <h5 class="card-title">{{ save.data().name }}</h5>
              <p class="card-text">{{ save.data().address }}</p>
              <a href="#"
                 class="card-link"
                 @click="reCenter(save.data())">Find on map</a>
              <a href="#"
                 class="card-link"
                 @click="deleteSave(save.id)">Delete</a>
            </div>
          </div>

          <p v-show="!saves.length">Nothing saved.</p>
          <button type="button"
                  class="btn btn-secondary"
                  name="closeButton"
                  @click="closeSaves">Close</button>
        </div>

    </div>
  </div>
</template>

<script>
import EventBus from '../event_bus/EventBus'
import { db,} from '../config/Firebase'

export default {
  name: 'SaveList',

  props: {
    saves: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      clicked: false,
      isDown: true,
      offset: [],
      mousePos: null
    }
  },

  methods: {
    deleteSave(id) {
      db.collection("saved-stops").doc(id).delete()
        .then(() => {
            console.log("Document successfully deleted!");
        }).catch(error => {
            console.error("Error removing document: ", error);
        });
    },
    reCenter(geocode) {
      let lnglat = {lat: geocode.latlng[1], lng: geocode.latlng[0], zm: 20}
      EventBus.$emit('re-center', lnglat)
    },
    closeSaves() {
      this.clicked = false;
    },
    mouseDown(evt) {
      var saves = document.querySelector("#saveList");
      this.isDown = true;
      this.offset = [
        saves.offsetLeft - evt.clientX,
        saves.offsetTop - evt.clientY
      ];

      // console.log('Offset of the div:');
      // console.log(saves.offsetLeft + ' ' + saves.offsetTop);
      // console.log('Position of the mouse when clicked:');
      // console.log(posX + ' ' + posY);
      // console.log('Offset of the div - the position of mouse:');
      // console.log((saves.offsetLeft - posX) + ' ' + (saves.offsetTop - posY));
    },
    mouseUp() {
      this.isDown = false;
    },
    mouseMove(evt) {
    var saves = document.querySelector("#saveList");
      if (this.isDown) {
        this.mousePos = {
          x: evt.clientX,
          y: evt.clientY
        };
        saves.style.left = (this.mousePos.x + this.offset[0]) + 'px';
        saves.style.top = (this.mousePos.y + this.offset[1]) + 'px';


        // console.log('Mouse pos X and Y:');
        // console.log(this.mousePos.x + ' ' + this.mousePos.y);
        // console.log('X and Y when moving:');
        // console.log((this.mousePos.x + this.offset[0]) + ' ' + (this.mousePos.y + this.offset[1]));
      }
    }
  },

  computed: {
    long() {
      return this.saves.length > 3 ? true : false;
    }
  },

  mounted() {
    EventBus.$on('open-saves', () => {
      if (this.clicked == false) {
        this.clicked = true;
      } else if (this.clicked == true) {
        this.clicked = false;
      }
      console.log('Open Save event trigerred in SaveList');
    });

    EventBus.$on('close-down', user => {
      if (!user) {
        this.clicked = false;
      }
    })
  }
}
</script>

<style lang="scss" scoped>
  .no-style  {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .card-margin {
    margin: 0.5em;
  }
  .position {
    position: absolute;
  }
  .custom-cursor {
    cursor: default;
  }
  .overflow {
    overflow-y: scroll;
    height: 56.75vh;
  }
</style>
