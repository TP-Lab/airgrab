<template>
  <div id="app">
    <h1><img class="logo" src="./assets/tp-logo.png"> <span>AirGrab</span></h1>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>

html, body {
  padding: 0;
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: 0 10px;
  color: #333;
}

h1 {
  line-height: 30px;
  font-size: 16px;
}
h1 img {
  height: 30px;
  vertical-align: middle;
}
h1 span {
  vertical-align: middle;
}


</style>
