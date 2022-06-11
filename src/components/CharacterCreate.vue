<template>
  <h1>Create Character</h1>

  <input v-model="name" type="text" placeholder="Name" />

  <router-link to="/play">Create</router-link>
  <router-link to="/menu">Cancel</router-link>
</template>

<script>
export default {
  name: 'CharacterCreate',
  data() {
    return {
      name: ""
    }
  }
}
</script>

<style scoped>
</style>
