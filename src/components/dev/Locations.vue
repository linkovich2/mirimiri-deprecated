<template>
  <div>
    <h1>Locations</h1>

    <ul>
      <li v-for="location in locations" :key="location">
        {{ location.replace('.json', '') }}
      </li>
    </ul>

    <form>
      <h3>New Location</h3>
      <input type="text" v-model="newLocation.id" placeholder="Unique ID" />
      <input type="text" v-model="newLocation.name" placeholder="Name" />
      <button @click="createLocation">Create</button>
    </form>

    <div class="map-controls"><router-link to="/menu">Exit</router-link></div>
  </div>
</template>

<script>
const { ipcRenderer } = require('electron')

export default {
  name: 'LocationEditor',
  data() {
    return {
      locations: [],
      resource: 'locations',
      newLocation: {
        name: "",
        id: ""
      }
    }
  },
  beforeMount() {
    ipcRenderer.invoke('dev-list-content-files', {
      dirPath: `/${this.resource}/`
    }).then((result) => {
      this.locations = result
    })
  },
  methods: {
    createLocation(e) {
      e.preventDefault()
      // this needs validation to ensure that the unique ID is unique (IE, not in this.locations)
      // and that the id does not contain spaces
      ipcRenderer.invoke('dev-save-content-file', {
        filePath: `${this.resource}/${this.newLocation.id}`,
        content: JSON.stringify(this.newLocation)
      }).then(() => {
        this.locations.push(this.newLocation.id)
        this.newLocation = { id: "", name: "" }
      })
    }
  }
}
</script>

<style scoped>
  h1 {
    text-align: center;
  }

  ul {
    text-align: center;
  }

  input {
    display: block;
    margin: 20px auto;
    text-align: center;
  }

  .map-controls {
    position: absolute;
    top: 0;
    left: 0;
    margin: 20px;
  }

  form {
    text-align: center;
    bottom: 0;
    position: absolute;
    right: 0;
    margin: 20px;
  }
</style>
