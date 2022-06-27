<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <h1>Load Game</h1>

          <ul>
            <li :class="{ selected: selected == save.id }" v-for="(save) in saves" :key="save.id" @click="selected = save.id">
              &#9863;
              <br />
              {{ save.character }}
            </li>
          </ul>

          <div class="button-container">
            <button @click="load(selected)">Load</button>
            <button @click="$emit('close')">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'LoadModal',
  inject: ['game', 'saves'],
  data() {
    return {
      selected: ''
    }
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
  ul {
    margin-top: 20px;
    list-style-type: none;
  }

  li {
    text-align: center;
    margin: 5px 0;
    padding: 10px;
    border: 1px solid rgba(0,0,0,0);
    cursor: pointer;
    width: 33%;
    float: left;
  }

  .selected {
    border: 1px solid blue;
  }

  button {
    margin: 10px;
  }

  .button-container {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
  }
</style>
