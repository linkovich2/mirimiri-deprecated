<template>
  <div>
    <h1>Locations</h1>

    <input type="text" v-model="search" placeholder="Filter Locations" />

    <ul>
      <li v-for="(location, index) in filteredLocations.slice(0, limit)" :key="location">
        <strong><router-link :to="getLink(location)">{{ location.replace('.json', '') }}</router-link></strong>
        <span class="delete" @click="deleteLocation(location, index)">x</span>
      </li>
    </ul>

    <form>
      <h3>New Location</h3>
      <input type="text" v-model="newLocation.id" placeholder="Unique ID" />
      <input type="text" v-model="newLocation.name" placeholder="Name" />
      <label>Width</label>
      <input type="number" v-model="newLocation.width" />
      <label>Height</label>
      <input type="number" v-model="newLocation.height" />
      <button @click="createLocation">Create</button>
    </form>

    <div class="map-controls"><router-link to="/menu">Exit</router-link></div>
  </div>
</template>

<script>
const { ipcRenderer } = require('electron')

export default {
  name: 'LocationIndex',
  data() {
    return {
      locations: [],
      resource: 'locations',
      newLocation: {
        name: "",
        id: "",
        width: 1000, // default
        height: 600 // default
      },
      search: "",
      limit: 15
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

      // validation rules
      let validLocation = /\s/g.test(this.newLocation.id)
        || this.locations.includes(this.newLocation.id + '.json')
        || this.newLocation.name.length <= 0
        || !!Math.max(0, this.location.height)
        || !!Math.max(0, this.location.weight)

      if (validLocation) {
        return; // @todo separate this out with appropriate error messages
      }

      ipcRenderer.invoke('dev-save-content-file', {
        filePath: `${this.resource}/${this.newLocation.id}`,
        content: JSON.stringify(this.newLocation)
      }).then(() => {
        this.locations.push(this.newLocation.id)
        this.newLocation = { id: "", name: "" }
      })
    },
    deleteLocation(location, index) {
      if (confirm("You sure? A lot of work went into this.")) {
        let filePath = `${this.resource}/${location.replace('.json', '')}`
        ipcRenderer.invoke('dev-delete-content-file', { filePath: filePath }).then(() => {
          this.locations.splice(index, 1)
        })
      }
    },
    getLink(location) {
      return `/dev/locations/${location.replace('.json', '')}`
    }
  },
  computed: {
    filteredLocations() {
     return this.locations.filter(location => {
        return location.toLowerCase().includes(this.search.toLowerCase())
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
    margin: 0 auto 20px auto;
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

  strong {
    font-size: 1.2rem;
  }

  .delete {
    color: red;
    cursor: pointer;
    margin-left: 20px;
  }
</style>
