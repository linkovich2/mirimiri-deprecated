<template>
  <h1>Play Screen</h1>

  <router-link to="/travel">Travel Map</router-link>
  <router-link to="/menu">Main Menu</router-link>
  <a @click="close">Quit</a>
</template>

<script>
const { ipcRenderer } = require('electron')

export default {
  name: 'PlayScreen',
  methods: {
    close() {
      ipcRenderer.invoke('quit')
    }
  }
}
</script>

<style scoped>
</style>
