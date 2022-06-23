<template>
  <div id="container">
    <div class="debug-menu">Playing as: {{ game.character.name }} | Debug: <router-link to="/travel">Travel</router-link></div>
    <div class="settings-cog" @contextmenu="settingsContext($event)" @click="settingsContext($event)">&#9881;</div>
  </div>
</template>

<script>
const { ipcRenderer } = require('electron')

export default {
  name: 'PlayScreen',
  inject: ['game', 'renderer'],
  mounted() {
    this.renderer.create()
  },
  unmounted() {
    this.renderer.destroy()
  },
  methods: {
    close() {
      ipcRenderer.invoke('quit')
    },
    settingsContext(e) {
      e.preventDefault()
      this.$contextmenu({
        x: e.x,
        y: e.y,
        zIndex: 2,
        items: [
          {
            label: "Settings",
            onClick: () => {
              // open the options modal
            }
          },
          {
            label: "Exit to Main Menu",
            onClick: () => {
              this.$router.push('/menu')
            }
          },
          {
            label: "Exit to Desktop",
            onClick: () => {
              ipcRenderer.invoke('quit')
            }
          }
        ]
      });
    }
  }
}
</script>

<style scoped>
  .settings-cog {
    font-weight: bold;
    font-size: 1.5rem;
    cursor: pointer;
    position: absolute;
    bottom: 0;
    margin: 20px;
    right: 0;
  }

  #container * {
    z-index: 2;
  }

  .debug-menu {
    position: absolute;
    top: 0;
    right: 0;
    margin: 20px;
  }
</style>
