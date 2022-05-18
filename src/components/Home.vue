<template>
  <div id="root" :style="{backgroundImage: 'url(' + backUrl + ')'}">
    <div id="container" :class="{container: !noZoom, about: about, setting: setting, login: user}">
      <!--    我將永遠愛你，一生爲期-->
      <div id="title" @click="letZoom">{{ $t("messages.title") }}</div>
      <div id="weather" v-show="hasWeather">
        <div id="he-plugin-simple"></div>
      </div>
<!--      <iframe scrolling="no" frameborder="0" allowtransparency="true" src="http://i.tianqi.com/index.php?c=code&id=36&icon=5&num=5"></iframe>-->
      <transition name="fade" mode="out-in">
        <div v-if="noZoom" key="in">
          <search @click.native="doZoom"></search>
          <div id="mieHello" @click="hidePanel"></div>
          <buttons ref="btns" @controller="changeController"></buttons>
          <foot @about="getAbout" v-show="footerHide"></foot>
          <tools_column @setting="getSetting" @user="getUser" v-show="footerHide"></tools_column>
        </div>
        <div v-if="!noZoom" key="out">
          <search-box></search-box>
          <div id="mie" @click="doZoom"></div>
          <tools_row @setting="getSetting" @user="getUser"></tools_row>
        </div>
      </transition>
    </div>
    <transition name="fade">
      <info v-show="about" @cabout="shutAbout"></info>
    </transition>
    <transition name="fade">
      <settings v-show="setting" @csetting="closeSetting" @showWeather="showWeather" ref="setting"></settings>
    </transition>
    <transition name="fade">
      <login v-show="user" v-if="noLogin" @cuser="closeUser" @isLogin="changeLoginState"></login>
      <logout v-show="user" v-else @clogout="closeUser" @logout="exit"></logout>
    </transition>
  </div>
</template>

<script>
import app from './../App'
import search from './Search'
import searchBox from './SearchBox'
// eslint-disable-next-line camelcase
import tools_column from './Tools'
import foot from './Footer'
// eslint-disable-next-line camelcase
import tools_row from './Tools_row'
import buttons from './ButtonGroup'
import info from './Info'
import settings from './Settings'
import login from './Login'
import logout from './Logout'
import axios from 'axios'
export default {
  name: 'Home',
  data () {
    return {
      noZoom: true,
      backUrl: require('./../assets/background_page.jpg'),
      about: false,
      setting: false,
      user: false,
      noLogin: true,
      controller: false,
      hasWeather: false,
      device: 0, // 0代表电脑，1代表平板，2代表手机
      footerHide: true
    }
  },
  methods: {
    doZoom () {
      this.$data.noZoom = !this.$data.noZoom
      // console.log(this.$data.noZoom)
    },
    letZoom () {
      if (this.$data.noZoom === false) {
        this.$data.noZoom = true
      }
    },
    getAbout (e) {
      this.$data.about = e
      // alert(this.$data.about)
    },
    shutAbout (e) {
      // alert(e)
      this.$data.about = e
    },
    getSetting (e) {
      this.$data.setting = e
    },
    closeSetting (e) {
      this.$data.setting = e
    },
    getUser (e) {
      this.$data.user = e
    },
    closeUser (e) {
      this.$data.user = e
    },
    changeLoginState (e) {
      if (e === true) {
        location.reload()
        // this.$data.noLogin = false
      }
    },
    exit (e) {
      if (e === true) {
        this.$data.backUrl = require('./../assets/background_page.jpg')
        location.reload()
      }
    },
    hidePanel () {
      this.$refs.btns.hideChange()
      document.getElementById('mieHello').style.zIndex = -1
    },
    changeController (e) {
      document.getElementById('mieHello').style.zIndex = e
    },
    showWeather (e) {
      // console.log(e)
      this.$data.hasWeather = e
      this.$cookies.set('weather', e)
    }
  },
  components: {
    search,
    searchBox,
    app,
    tools_column,
    foot,
    tools_row,
    buttons,
    info,
    settings,
    login,
    logout
  },
  created () {
    let that = this
    // 设备确认
    let w = document.documentElement.offsetWidth || document.body.offsetWidth
    if (w >= 1243) {
      this.$data.device = 0
    } else if (w >= 700 && w < 1243) {
      this.$data.device = 1
    } else {
      this.$data.device = 2
    }
    // 隐藏footer
    if (this.$data.device !== 0) {
      this.$data.footerHide = false
    }
    this.$cookies.set('device', this.$data.device, -1)
    // 登陆状态确认
    let isLogin = this.$cookies.get('isLogin')
    // console.log(isLogin === 'true')
    if (isLogin === 'true') {
      that.$data.noLogin = false
    } else {
      that.$data.noLogin = true
    }
    // 获取自定义捷径
    let hasUser = that.$cookies.get('user')
    // let hasTargets = that.$cookies.get('targets')
    // console.log(hasTargets)
    if (hasUser !== '' && hasUser !== null) {
      axios({
        method: 'post',
        url: 'backdev/target/find',
        data: {
          user: that.$cookies.get('user').user
        },
        headers: {
          'content-type': 'application/json'
        }
      })
        .then(function (res) {
          // console.log(res.data[0])
          that.$cookies.set('targetLength', res.data.length, -1)
          for (var i = 0; i < res.data.length; i++) {
            that.$cookies.set('targets[' + i + ']', res.data[i], -1)
          }
          that.$nextTick(() => {
            that.$refs.btns.changeTargets(res.data.length)
          })
        })
        .catch(function (err) {
          console.log(err)
        })
    }
    window.WIDGET = {
      'CONFIG': {
        'modules': '01234',
        'background': '1',
        'tmpColor': 'FFFFFF',
        'tmpSize': '16',
        'cityColor': 'FFFFFF',
        'citySize': '16',
        'aqiColor': 'FFFFFF',
        'aqiSize': '16',
        'weatherIconSize': '24',
        'alertIconSize': '18',
        'padding': '10px 10px 10px 10px',
        'shadow': '0',
        'language': 'auto',
        'borderRadius': '25',
        'fixed': 'true',
        'vertical': 'top',
        'horizontal': 'left',
        'left': '30',
        'top': '30',
        'key': '980f11e7556b472f98c07a507c994271'
      }
    };
    (function (d) {
      var c = d.createElement('link')
      c.rel = 'stylesheet'
      c.href = '../../static/he-simple.css'
      // c.href = 'https://widget.heweather.net/simple/static/css/he-simple.css?v=1.4.0';
      var s = d.createElement('script')
      s.src = '../../static/he-simple.js'
      // s.src = 'https://widget.heweather.net/simple/static/js/he-simple.js?v=1.4.0';
      var sn = d.getElementsByTagName('script')[0]
      sn.parentNode.insertBefore(c, sn)
      sn.parentNode.insertBefore(s, sn)
    })(document)
  },
  mounted () {
    const that = this
    const weather = that.$cookies.get('weather')
    if (weather !== '' && weather !== null) {
      // that.$set('hasWeather', weather)
      that.$data.hasWeather = JSON.parse(weather)
      console.log(weather)
      console.log(that.$data.hasWeather)
    } else {
      that.$cookies.set('weather', false)
    }
    // console.log(that.$cookies.get('isLogin'))
    // 設置背景圖片
    if (that.$cookies.get('isLogin') === 'true' || that.$cookies.get('isLogin') === true) {
      axios({
        method: 'post',
        url: 'backdev/back/get',
        data: {
          underId: that.$cookies.get('user').user
        },
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(function (res) {
        console.log(res)
        // console.log(res)
        if (res.data.length !== 0) {
          that.$cookies.set('back', res.data[0].url)
        }
        const back = that.$cookies.get('back')
        if (back !== '' && back !== null) {
          // this.$set('backUrl', back)
          // location.reload()
          that.$data.backUrl = back
        }
      }).catch(function (err) {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
  #mie {
    width: 100%;
    height: 100vh;
    position: fixed;
    z-index: -1;
    top: 0;
    left: 0;
  }
  #mieHello {
    width: 100%;
    height: 100vh;
    position: fixed;
    z-index: -1;
    top: 0;
    left: 0;
  }
  .mieHello {
    z-index: 0;
  }
  #root {
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
    width: 100%;
    height: 100vh;
    font-family: "Segoe UI";
    text-align: center;
    overflow: auto;
  }
  .container {
    /*background: hsla(0, 0%, 100%, 0.3);*/
    width: 100%;
    height: 100vh;
    backdrop-filter: blur(3px);
    transition: all .5s linear;
  }
  .about {
    filter: blur(10px);
  }
  .setting {
    filter: blur(10px);
  }
  .login {
    filter: blur(10px);
  }
  #title {
    font-family: "Segoe UI";
    font-size: 40px;
    color: white;
    text-align: center;
    padding-top: 100px;
    padding-bottom: 50px;
    cursor: default;
  }
  search {
    z-index: 0;
  }
  #he-plugin-simple {
    position: fixed;
    left: 30px;
  }
  #weather {
    position: fixed;
    top: 20px;
    z-index: 1;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
  }
  @media screen and (max-width: 740px) {
    #weather {
      position: relative;
      top: -200px;
      z-index: 1;
    }
  }
</style>
