<template>
  <div id="app">
    <h1>
      <img class="logo" src="./assets/tp-logo.png">
      <span>AirGrab</span>
      <div class="language-change" >
        <a href="?locale=zh#/">中</a> / <a href="?locale=en#/">EN</a>
      </div>
    </h1>
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
    position: relative;
  }

  h1 img {
    height: 30px;
    vertical-align: middle;
  }

  h1 span {
    vertical-align: middle;
  }

  .language-change {
    font-size: 14px;
    position: absolute;
    top: 0;
    right: 15px;
    color: #333;
  }

  .language-change a,
  .language-change a:hover,
  .language-change a:active,
  .language-change a:visited {
    color: #333;
    text-decoration: none;
  }

  .language-change:active {
    color: #333;
  }

</style>
