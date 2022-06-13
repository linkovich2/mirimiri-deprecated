<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <h1>Settings</h1>
          <div class="fields">
            <span class="field">
              <label>Fullscreen</label>
              <input type="checkbox" v-model="settings.fullscreen" :checked="fullscreen">
            </span>
          </div>
          <button class="ok-button" @click="$emit('close')">OK</button>
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

<style scoped>
  .ok-button {
    margin: 20px auto;
    display: block;
  }

  .fields {
    padding: 20px;
    border-radius: 10px;
    border: 1px solid rgba(0,0,0,0.1);
    background-color: #ddd;
  }

  .field {
    margin-bottom: 16px;
    display: block;
  }

  .field label {
    font-size: 0.8rem;
    float: left;
  }

  .field input {
    float: left;
    margin-left: 10px;
  }

  .field input[type=checkbox] {
    margin-top: 4px;
  }
</style>
