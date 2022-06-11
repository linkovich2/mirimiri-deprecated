<template>
  <h1>Load Game</h1>

  <ul>
    <li v-for="(save) in saves" :key="save.id" @click="load(save.id)">
      {{ save.character }}
    </li>
  </ul>

  <router-link to="/menu">Cancel</router-link>
</template>

<script>
export default {
  name: 'CharacterSelect',
  inject: ['game'],
  data() {
    return {
      saves: []
    }
  },
  beforeMount() {
    this.game.saves((saves) => {
      this.saves = saves
    })
  },
  methods: {
    load(id) {
      this.game.load(id, () => {
        this.$router.push('play')
      })
    }
  }
}
</script>

<style scoped>
</style>
