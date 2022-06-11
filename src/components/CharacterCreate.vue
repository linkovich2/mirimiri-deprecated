<template>
  <h1>Create Character</h1>

  <input v-model="character.name" type="text" placeholder="Name" />
  <span class="error" v-if="(character.name.length <= 0) && submitted">Your character needs a name!</span>

  <a @click="create">Create</a>
  <router-link to="/menu">Cancel</router-link>
</template>

<script>
const { ipcRenderer } = require('electron')

export default {
  name: 'CharacterCreate',
  data() {
    return {
      character: {
        name: ""
      },
      submitted: false
    }
  },
  methods: {
    create() {
      this.submitted = true

      if (this.character.name.length <= 0) {
        return;
      }

      const raw = JSON.parse(JSON.stringify(this.character));
      ipcRenderer.invoke('create-character', raw).then((character) => {
        console.log(character)
        // load the character into the global game object
        // move onto the play screen
      })
    }
  }
}
</script>

<style scoped>
  .error { color: red; }
</style>
