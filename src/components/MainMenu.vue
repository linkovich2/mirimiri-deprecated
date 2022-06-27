<template>
  <div id="container">
    <div id="dark-overlay"></div>
    <div class="stars-overlay"></div>
    <div class="bg-overlay"></div>
    <div class="grass-overlay"></div>
    <div class="clouds left"></div>
    <div class="clouds right"></div>
    <div class="statue-overlay"></div>
    <div id="content">
      <img class="logo" src="@/assets/menu/logo.png" />
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
    background: repeat url('./../assets/menu/stars.png');
    height: 100%;
    width: 6000px;
    position: absolute;
    top: 0;
    animation: slide 240s linear infinite;
  }

  .grass-overlay {
    background: repeat bottom url('./../assets/menu/grass.png');
    height: 100%;
    width: 100%;
    position: absolute;
    top: 150px;
    background-size: 3000px;
  }

  .statue-overlay {
    background: no-repeat center bottom url('./../assets/menu/statue.png');
    height: 100%;
    width: 33%;
    position: absolute;
    left: 0;
    bottom: 0;
    background-size: 375px 600px;
  }

  .clouds {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
  }

  .clouds.left {
    background: no-repeat url('./../assets/menu/clouds_left.png');
    left: 0;
    background-size: 500px;
  }

  .clouds.right {
    background: no-repeat top right url('./../assets/menu/clouds_right.png');
    top: 20px;
    background-size: 500px;
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

  .logo {
    margin: 0 auto;
    height: 240px;
    width: 360px;
  }

  ul {
    list-style-type: none;
  }

  #content ul {
    margin-top: -20px;
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
    top: 20%;
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
