<template>
  <div>
    <router-link to="/dev/locations">Back</router-link>
    <h1>Editing {{ $route.params.id }}</h1>
  </div>
</template>

<script>
export default {
  name: 'LocationEditor'
}
</script>

<style scoped>
</style>
