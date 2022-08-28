<template>
  <div class="container">
    <div class="form">
      <h1>Create Character</h1>
      <input :class="{ invalid: (character.name.length <= 0) && submitted }" v-model="character.name" type="text" placeholder="Name" />
      <span class="error" v-if="(character.name.length <= 0) && submitted">Your character needs a name!</span>

      <h2>Background Options</h2>
      <ul>
        <li :class="{ selected: key == character.background }" v-for="(background, key) in background_manager.backgrounds" :key="key" @click="character.background = key">{{ background.name }}</li>
      </ul>

      <br />
      <button @click="create">Create</button>
      <button @click="$router.push('/menu')">Cancel</button>
    </div>
  </div>
</template>

<script>
import BackgroundManager from '../engine/player/background_manager.js'

export default {
  name: 'CharacterCreate',
  inject: ['game'],
  data() {
    return {
      character: {
        name: "",
        background: ""
      },
      background_manager: {},
      submitted: false
    }
  },
  mounted() {
    this.background_manager = new BackgroundManager()
  },
  methods: {
    create() {
      this.submitted = true

      if (this.character.name.length <= 0) {
        return;
      }

      const raw = JSON.parse(JSON.stringify({
        character: this.character
      }));
      this.game.save(raw, () => {
        this.$router.push('/play')
      })
    }
  }
}
</script>

<style scoped>
  .error {
    color: red;
    font-size: 0.8rem;
    clear: both;
    display: block;
  }

  button {
    margin: 20px;
  }

  .container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 0;
    margin: 0;
  }

  input {
    min-width: 200px;
    text-align: center;
  }

  .invalid {
    border: 1px solid red;
  }

  h1 {
    margin-bottom: 10px;
  }

  .selected {
    border: 1px solid red;
  }
</style>
