<template>
  <div id="tools">
    <div id="settings" class="tool" @click="showSettings">
      <img src="./../assets/setting.png">
    </div>
    <div id="user" class="tool" @click="showUsers">
      <img src="./../assets/user.png">
    </div>
    <div id="cloud" class="tool" @click="openCloud">
      <img src="./../assets/cloud.png">
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tools',
  methods: {
    showSettings () {
      this.$emit('setting', true)
    },
    showUsers () {
      this.$emit('user', true)
    },
    openCloud () {
      // alert('hello world')
      window.open('https://airportal.cn/')
    }
  }
}
</script>

<style scoped>
  #tools {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 50px;
    height: 180px;
    border-radius: 25px;
    background: rgba(255,255,255,0.61);
    position: fixed;
    right: 40px;
    top: 20px;
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
