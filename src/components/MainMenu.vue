<template>
  <div class="">
    <h1>Main Menu</h1>

    <ul>
      <li><router-link to="/create">New</router-link></li>
      <li v-if="showLoad"><router-link to="/load">Load</router-link></li>
      <li @click="showOptions = true">Options</li>
      <li @click="exit">Exit</li>
      <br />
      <li v-if="devMode"><router-link to="/splash">Test Splash</router-link></li>
    </ul>

    <OptionsModal v-if="showOptions" @close="showOptions = false" />
  </div>
</template>

<script>
const { ipcRenderer } = require('electron')
import OptionsModal from './OptionsModal.vue'

export default {
  name: 'MainMenu',
  inject: ['game'],
  data() {
    return {
      showOptions: false,
      showLoad: false,
      devMode: false
    }
  },
  beforeMount() {
    this.game.saves((saves) => {
      if (saves.length > 0) {
        this.showLoad = true
      }
    })

    ipcRenderer.invoke('dev-mode?').then((result) => {
      this.devMode = result
    })
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
