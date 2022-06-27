<template>
  <div>
    <router-link to="/dev/locations">Back</router-link>
    <h1>Editing {{ location.name }} ({{ location.id }}.json)</h1>
  </div>
</template>

<script>
const { ipcRenderer } = require('electron')

export default {
  name: 'LocationEditor',
  data() {
    return {
      location: {},
      resource: 'locations'
    }
  },
  mounted() {
    ipcRenderer.invoke('dev-load-content-file', {
      filePath: `/${this.resource}/${this.$route.params.id}.json`
    }).then((result) => {
      this.location = JSON.parse(result)
    })
  }
}
</script>

<style scoped>
</style>
