<template>
  <div id="splash-container">
    <h1>Splash Screen</h1>
    <p>ESC to skip</p>
  </div>
</template>

<script>
export default {
  name: 'SplashScreen',
  mounted() {
    setTimeout(() => {
      this.$router.push('/menu')
    }, 10000)

    window.addEventListener('keydown', (e) => {
      if (e.key == 'Escape') {
        this.$router.push('/menu')
      }
    });
  }
}
</script>

<style scoped>
  #splash-container {
    width: 100%;
    height: 100%;
    text-align: center;
  }

  h1 {
    top: 45%;
    left: 45%;
    position: absolute;
  }

  p {
    position: absolute;
    bottom: 0;
    right: 0;
    margin: 20px;
  }
</style>
