<template>
  <h1>Main Menu</h1>

  <ul>
    <li><router-link to="/create">New</router-link></li>
    <li v-if="showLoad"><router-link to="/load">Load</router-link></li>
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
  inject: ['game'],
  data() {
    return {
      showOptions: false,
      showLoad: true
    }
  },
  beforeMount() {
    this.game.saves((saves) => {
      if (saves.length <= 0) {
        this.showLoad = false
      }
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
