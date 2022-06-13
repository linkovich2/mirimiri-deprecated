<template>
  <div id="container">
    <p>Playing as: {{ game.character.name }}</p>
    <p>@todo: add a travel map link</p>
    <div class="settings-cog" @contextmenu="settingsContext($event)" @click="settingsContext($event)">&#9881;</div>
  </div>
</template>

<script>
const { ipcRenderer } = require('electron')

export default {
  name: 'PlayScreen',
  inject: ['game'],
  methods: {
    close() {
      ipcRenderer.invoke('quit')
    },
    settingsContext(e) {
      e.preventDefault()
      this.$contextmenu({
        x: e.x,
        y: e.y,
        items: [
          {
            label: "Settings",
            onClick: () => {
              // open the options modal and close
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
</style>
