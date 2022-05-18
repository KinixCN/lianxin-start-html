<template>
  <div id="search">{{ $t("messages.search") }}</div>
</template>

<script>
export default {
  name: 'Search'
}
</script>

<style scoped>
  #search {
    background-color: #fff;
    display: inline-block;
    padding-left: 100px;
    padding-right: 100px;
    padding-top: 10px;
    padding-bottom: 10px;
    border-radius: 30px;
    color: #707070;
    opacity: 0.7;
    cursor: text;
    z-index: 0;
  }
</style>
