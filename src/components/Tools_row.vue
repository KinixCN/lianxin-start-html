<template>
  <div id="tools_row">
    <div id="settings_row" class="tool" @click="showSettings">
      <img src="./../assets/setting.png">
    </div>
    <div id="user_row" class="tool" @click="showUsers">
      <img src="./../assets/user.png">
    </div>
    <div id="cloud_row" class="tool">
      <img src="./../assets/cloud.png">
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tools_row',
  methods: {
    showSettings () {
      this.$emit('setting', true)
    },
    showUsers () {
      this.$emit('user', true)
    }
  }
}
</script>

<style scoped>
  #tools_row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 180px;
    height: 50px;
    border-radius: 25px;
    background: rgba(255,255,255,0.61);
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    bottom: 60px;
  }
  .tool {
    display: inline-block;
    position: relative;
    width: 50px;
    height: 50px;
    background-color: #fff;
    opacity: 1;
    border-radius: 50%;
    text-align: center;
    cursor: pointer;
  }
  img {
    width: 40px;
    position: absolute;
    transform: translateX(-50%);
    top: 5px;
  }
</style>
