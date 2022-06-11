<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <h1>Options</h1>
          <label>Fullscreen</label>
          <input type="checkbox" v-model="settings.fullscreen" :checked="fullscreen">
          <button class="modal-default-button" @click="$emit('close')">OK</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
const { ipcRenderer } = require('electron')

export default {
  name: 'OptionsModal',
  data() {
    return {
      settings: { fullscreen: false }
    }
  },
  methods: {
    fullscreen() {
      return !!this.settings.fullscreen
    }
  },
  beforeMount() {
    ipcRenderer.invoke('get-settings').then((settings) => {
      this.settings = settings
    })
  },
  watch: {
    settings: {
      handler(data) {
        const raw = JSON.parse(JSON.stringify(data))
        ipcRenderer.invoke('update-settings', raw)
      },
      deep: true
    }
  }
}
</script>
