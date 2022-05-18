<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      urlHome: 'https://www.lianxin-start.cn'
    }
  }
}
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    -webkit-touch-callout: none !important;
    -webkit-user-select: none;
    -webkit-tap-highlight-color: transparent;
  }
</style>
