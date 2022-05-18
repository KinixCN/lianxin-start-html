<template>
  <div id="login">
    <div id="namelogin">
      <img src="./../assets/user.png">
      <h1>{{ $t("messages.user") }}</h1>
    </div>
    <div id="cLogin" @click="closeLogin">×</div>
    <div id="LoginContent">
      <img src="./../assets/sdu.png" id="logo">
      <div id="tipMe">{{ $t("messages.tipLogin") }}</div>
      <div id="loginBox">
        <div class="user">
          <div class="avatar"><img src="./../assets/usr.png"></div>
          <input type="text" v-model="account" :placeholder="$t('messages.account')">
        </div>
        <div class="user">
          <div class="avatar"><img src="./../assets/pass.png"></div>
          <input type="password" v-model="password" :placeholder="$t('messages.passwd')">
        </div>
      </div>
      <div class="loginButton" @click="submit">{{ $t("messages.login") }}</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
import app from './../App'

export default {
  name: 'Login',
  data () {
    return {
      account: '',
      password: ''
    }
  },
  components: {
    app
  },
  methods: {
    closeLogin () {
      this.$emit('cuser', false)
    },
    submit (e) {
      const that = this
      axios({ // 向山东大学官网请求验证
        method: 'post',
        url: 'https://sduonline.cn/isduapi/api/auth/login/system',
        data: qs.stringify({
          u: this.$data.account,
          p: this.$data.password
        }),
        headers: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
      })
        .then(function (res) {
          // console.log(res)
          if (res.data.code === 0) {
            axios({
              method: 'post',
              url: 'backdev/user/add',
              data: {
                user: that.$data.account
              },
              headers: {
                'content-type': 'application/json'
              }
            })
              .then(function (res) {
                // console.log(res)
                that.$cookies.set('user', res.data[0], -1)// 储存用户信息
                that.$cookies.set('isLogin', true, -1)// 储存登录状态
                // 将本地的无名捷径上传到云端
                const length = that.$cookies.get('targetLength')
                const lengthNum = parseInt(length)
                // console.log(typeof length)
                // console.log(typeof lengthNum)
                if (length !== '' && length !== null) {
                  for (var i = 0; i < lengthNum; i++) {
                    // console.log('hello')
                    const target = that.$cookies.get('targets[' + i + ']')
                    console.log(target.id)
                    if (target.id === undefined) {
                      axios({
                        method: 'post',
                        url: 'backdev/target/add',
                        data: {
                          name: target.name,
                          url: target.url,
                          underId: res.data[0].user
                        },
                        headers: {
                          'content-type': 'application/json'
                        }
                      })
                        .then(function (res) {
                          console.log(res)
                        })
                        .catch(function (err) {
                          console.log(err)
                        })
                    }
                  }
                }
                that.$emit('isLogin', true)
              })
              .catch(function (err) {
                console.log(err)
              })
          } else {
            alert(that.$t('messages.passError'))
          }
        })
        .catch(function (err) {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped>
#login {
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
#namelogin {
  text-align: center;
  display: inline-block;
  margin: 30px;
  margin-bottom: 10px;
  height: 70px;
  line-height: 70px;
}
#namelogin img {
  width: 70px;
  display: inline-block;
}
#namelogin h1 {
  display: inline-block;
  transform: translateY(-25px);
}
#cLogin {
  font-size: 50px;
  display: inline-block;
  position: absolute;
  right: 30px;
  cursor: pointer;
}
#LoginContent {
  text-align: center;
}
#logo {
  width: 60px;
}
#tipMe {
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
  #login {
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
