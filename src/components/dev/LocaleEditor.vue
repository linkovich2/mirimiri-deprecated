<template>
  <div id="container">
    <h1>Locale Editor</h1>

    <div class="map-controls"><router-link to="/menu">Exit</router-link></div>
  </div>
</template>

<script>
export default {
  name: 'LocaleEditor'
}
</script>

<style scoped>
  .map-controls {
    position: absolute;
    top: 0;
    left: 0;
    margin: 20px;
  }
</style>
