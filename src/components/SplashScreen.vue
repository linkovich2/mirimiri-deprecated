<template>
  <div id="splash-container">
    <h1>Studio Name ???</h1>
    <p>ESC to Skip</p>
  </div>
</template>

<script>
export default {
  name: 'SplashScreen',
  mounted() {
    setTimeout(() => { this.skip() }, 6000)

    window.addEventListener('keydown', (e) => {
      if (e.key == 'Escape') {
        this.skip()
      }
    });
  },
  methods: {
    skip() {
      // this is necessary because if they hit escape, the timeout still triggers
      if (this.$router.currentRoute.value.path === '/splash') {
        this.$router.push('/menu')
      }
    }
  }
}
</script>

<style scoped>
  #splash-container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  p {
    position: absolute;
    bottom: 0;
    right: 0;
    margin: 20px;
  }

  .fade-enter-active,
  .fade-enter-to {
    transition: opacity 3s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

</style>
