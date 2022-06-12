<template>
  <div class="container">
    <div class="form">
      <h1>Create Character</h1>
      <input :class="{ invalid: (character.name.length <= 0) && submitted }" v-model="character.name" type="text" placeholder="Name" />
      <span class="error" v-if="(character.name.length <= 0) && submitted">Your character needs a name!</span>

      <br />
      <button @click="create">Create</button>
      <button @click="$router.push('/menu')">Cancel</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CharacterCreate',
  inject: ['game'],
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
</style>
