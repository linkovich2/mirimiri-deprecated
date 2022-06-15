<template>
  <div id="container">
    <h1>Locale Editor</h1>

    <div class="map-controls"><router-link to="/menu">Exit</router-link></div>
  </div>
</template>

<script>
const { ipcRenderer } = require('electron')

export default {
  name: 'LocaleEditor',
  data() {
    return {
      locales: [],
      resource: 'locales'
    }
  },
  beforeMount() {
    ipcRenderer.invoke('dev-list-content-files', {
      dirPath: `/${this.resource}/`
    }).then((result) => {
      this.locales = result
    })
  }
}
</script>

<style scoped>
  .map-controls {
    position: absolute;
    top: 0;
    left: 0;
    margin: 20px;
  }
</style>
