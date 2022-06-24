<template>
  <div id="container">
    <div id="dark-overlay"></div>
    <div class="stars-overlay"></div>
    <div class="bg-overlay"></div>
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
        <li><router-link to="/dev/locations">Locations</router-link></li>
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
  #container {
    display: block;
    background-color: #303940;
  }

  #dev-tools {
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 20px;
  }

  #dark-overlay {
    background-color: #202231;
    width: 100%;
    height: 38%;
  }

  .stars-overlay {
    background: repeat 80% 80% url('./../assets/menu/stars.png');
    height: 100%;
    width: 6000px;
    position: absolute;
    top: 0;
    animation: slide 60s linear infinite;
  }

  @keyframes slide {
    0% {
      transform: translate3d(0, 0, 0);
    }
    100% {
      transform: translate3d(-2000px, 0, 0);
    }
  }

  #container {
    background-color: #303940;
  }

  h1 {
    text-align: center;
    font-size: 3rem;
    color: #fefefe;
  }

  ul {
    list-style-type: none;
  }

  #dev-tools li:first-of-type {
    text-decoration: underline;
    font-variant: small-caps;
    color: white;
  }

  .bg-overlay {
    width: 100%;
    background: repeat-x center url("./../assets/menu/gradient.png");
    height: 35%;
    max-height: 260px;
  }

  #content {
    height: 33%;
    min-height: 250px;
    position: absolute;
    top: 33%;
    width: 100%;
    margin: 0 auto;
  }

  #content ul li {
    width: 200px;
    border: 1px solid rgba(0,0,0,0.1);
    margin: 10px auto;
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

  a, a {
    color: #f3f4f5;
  }
</style>
