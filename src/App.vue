<template>
  <div id="app">
    <img style="widtht: 40px;" alt="Vue logo" src="./assets/logo.png">
    <configform />
  </div>
</template>

<script>
import configform from './components/form.vue'

export default {
  name: 'app',
  components: {
    configform
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
