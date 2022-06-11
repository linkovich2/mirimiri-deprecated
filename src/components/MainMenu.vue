<template>
  <h1>Main Menu</h1>

  <ul>
    <li><router-link to="/create">New</router-link></li>
    <li><router-link to="/load">Load</router-link></li>
    <li @click="showOptions = true">Options</li>
    <li @click="exit">Exit</li>
  </ul>

  <OptionsModal v-if="showOptions" @close="showOptions = false" />
</template>

<script>
const { ipcRenderer } = require('electron')
import OptionsModal from './OptionsModal.vue'

export default {
  name: 'MainMenu',
  data() {
    return {
      showOptions: false
    }
  },
  components: {
    OptionsModal
  },
  methods: {
    exit() {
      ipcRenderer.invoke('quit')
    }
  }
}
</script>
