<template>
  <div id="container">
    <div id="content">
      <h1>MiriMiri</h1>
      <br />
      <ul>
        <li @click="this.$router.push('/create')">New</li>
        <li v-if="saves.length > 0" @click="showLoad = true">Load</li>
        <li @click="showOptions = true">Settings</li>
        <li @click="exit">Exit</li>
      </ul>
    </div>

    <div id="dev-tools" v-if="devMode">
      <ul>
        <li>Dev Tools</li>
        <li><router-link to="/splash">Test Splash</router-link></li>
        <li><router-link to="/dev/locale-editor">Locale Editor</router-link></li>
      </ul>
    </div>
    <OptionsModal v-if="showOptions" @close="showOptions = false" />
    <LoadModal v-if="saves.length > 0 && showLoad" @close="showLoad = false" />
  </div>
</template>

<script>
const { ipcRenderer } = require('electron')
import { computed } from 'vue'
import OptionsModal from './menu/OptionsModal.vue'
import LoadModal from './menu/LoadModal.vue'

export default {
  name: 'MainMenu',
  inject: ['game', 'devMode'],
  data() {
    return {
      showOptions: false,
      showLoad: false,
      saves: []
    }
  },
  provide() {
    return {
      saves: computed(() => this.saves)
    }
  },
  beforeMount() {
    this.game.saves((saves) => {
      this.saves = saves
    })
  },
  components: {
    OptionsModal,
    LoadModal
  },
  methods: {
    exit() {
      ipcRenderer.invoke('quit')
    }
  }
}
</script>

<style scoped>
  #dev-tools {
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 20px;
  }

  h1 {
    text-align: center;
    font-size: 3rem;
  }

  ul {
    list-style-type: none;
  }

  #dev-tools li:first-of-type {
    text-decoration: underline;
    font-variant: small-caps;
  }

  #content ul li {
    border: 1px solid rgba(0,0,0,0.1);
    margin: 10px;
    text-transform: uppercase;
    background-color: #444;
    color: #fff;
    border-radius: 10px;
    font-weight: bold;
  }

  #content ul li a {
    text-decoration: none;
    color: inherit;
  }

  #content ul li:hover {
    background-color: #666;
    cursor: pointer;
  }
</style>
