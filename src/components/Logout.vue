<template>
  <div id="logout">
    <div id="namelogout">
      <img src="./../assets/user.png">
      <h1>{{ $t("messages.user") }}</h1>
    </div>
    <div id="cLogout" @click="closeLogout">×</div>
    <div id="LogoutContent">
      <img src="./../assets/sdu.png" id="logo">
      <div id="welcomeMe">{{ $t("messages.welcome") }}，{{user}}</div>
      <div class="loginButton" @click="logout">{{ $t("messages.logout") }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Logout',
  data () {
    return {
      isLogin: false,
      user: ''
    }
  },
  methods: {
    closeLogout () {
      this.$emit('clogout', false)
    },
    logout () {
      this.$cookies.set('user', '', -1)
      this.$cookies.set('isLogin', false, -1)
      for (var i = 0; i < this.$cookies.get('targetLength'); i++) {
        this.$cookies.set('targets[' + i + ']', '', -1)
      }
      this.$cookies.set('targetLength', 0, -1)
      this.$cookies.set('back', '', -1)
      this.$emit('logout', true)
    }
  },
  created () {
    let user = this.$cookies.get('user').user
    this.$data.user = user
  }
}
</script>

<style scoped>
#logout {
  display: inline-block;
  width: 800px;
  height: 500px;
  background-color: #fff;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  top: 20vh;
  border-radius: 30px;
  background-color: rgba(255,255,255,.5);
  backdrop-filter: blur(15px);
  color: #707070;
  text-align: left;
}
#namelogout {
  text-align: center;
  display: inline-block;
  margin: 30px;
  margin-bottom: 10px;
  height: 70px;
  line-height: 70px;
}
#namelogout img {
  width: 70px;
  display: inline-block;
}
#namelogout h1 {
  display: inline-block;
  transform: translateY(-25px);
}
#cLogout {
  font-size: 50px;
  display: inline-block;
  position: absolute;
  right: 30px;
  cursor: pointer;
}
#LogoutContent {
  text-align: center;
}
#logo {
  width: 60px;
}
#welcomeMe {
  margin-top: 10px;
}
.user {
  margin-top: 20px;
}
.avatar {
  display: inline-block;
  background-color: #fff;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border-width: 2px;
  border-color: #cccccc;
  border-style: solid;
  backdrop-filter: blur(20px);
}
.avatar img {
  width: 20px;
  position: relative;
  top: 3.5px;
}
input {
  outline: none;
  display: inline-block;
  text-align: center;
  height: 40px;
  width: 260px;
  border: none;
  border-radius: 25px;
  margin-left: -42px;
  padding-right: 20px;
  padding-left: 20px;
}
.loginButton {
  margin-top: 30px;
  display: inline-block;
  background-color: #9c0c13;
  color: white;
  width: 150px;
  height: 40px;
  line-height: 40px;
  border-radius: 20px;
  cursor: pointer;
}
@media screen and (max-width: 800px) {
  #logout {
    display: inline-block;
    width: 350px;
    height: 700px;
    background-color: #fff;
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    top: 10vh;
    border-radius: 30px;
    background-color: rgba(255,255,255,.5);
    backdrop-filter: blur(15px);
    color: #707070;
    text-align: left;
  }
}
</style>
