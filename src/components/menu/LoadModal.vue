<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <h1>Load Game</h1>

          <ul>
            <li v-for="(save) in saves" :key="save.id" @click="load(save.id)">
              {{ save.character }}
            </li>
          </ul>

          <button class="modal-default-button" @click="$emit('close')">OK</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'LoadModal',
  inject: ['game', 'saves'],
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
