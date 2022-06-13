<template>
  <div id="container">
    <h1>Travel Screen / World Map</h1>

    <div class="map-controls"><router-link to="/play">Back</router-link></div>
  </div>
</template>

<script>
export default {
  name: 'TravelScreen'
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
