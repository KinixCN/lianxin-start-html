<template>
  <div id="settings">
    <div id="nametitle">
      <img src="./../assets/setting.png">
      <h1>{{ $t("messages.settings") }}</h1>
    </div>
    <div id="shut" @click="closeSettings">×</div>
    <div id="main">
      <div id="language">
        <div class="setting_title">{{ $t("messages.languages") }}</div>
        <div class="setting_content">
          <div class="setting_card">
            <div class="tip">{{ $t("messages.language") }}</div>
            <div class="dropbox" @click="selectLanguage"><div>{{lang}}</div> <img src="./../assets/pull.png"></div>
            <transition name="fade">
              <ul v-if="selectLang">
                <li data-lang="cn" @click="selectLangs">中文（中国大陆）</li>
                <li data-lang="en" @click="selectLangs">English (US & UK & Australia)</li>
                <li data-lang="hk" @click="selectLangs">中文（香港特別行政區和台灣省）</li>
                <li data-lang="jp" @click="selectLangs">日本語(日本)</li>
                <li data-lang="kr" @click="selectLangs">한국어 (한국)</li>
              </ul>
            </transition>
          </div>
        </div>
      </div>
      <div id="weather">
        <div class="setting_title">{{ $t("messages.weather") }}</div>
        <div class="setting_content">
          <div class="setting_card">
            <div class="tip">{{ $t("messages.home") }}</div>
            <el-switch active-color="#00b9ff" inactive-color="#cccccc" v-model="showWeather" class="swither" @change="changeWeather"></el-switch>
          </div>
        </div>
      </div>
      <div id="background">
        <div class="setting_title">{{ $t("messages.background") }}</div>
        <div class="setting_content">
          <div class="setting_card">
            <img :src="imgSrc" id="nowImg">
            <el-upload
              class="upload-demo"
              drag
              action="upload"
              :on-success="UploadSuccess"
              :on-error="UploadError"
              :http-request="UploadImg"
              :disabled="isLogin"
              :show-file-list="false">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">{{ $t("messages.drag") }}<em>{{ $t("messages.click") }}</em></div>
            </el-upload>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Settings',
  data () {
    return {
      lang: '中文（中国大陆）',
      selectLang: false,
      showWeather: false,
      city: '北京市',
      selectCity: false,
      uploadData: {
        sduId: this.$cookies.get('user')
      },
      isLogin: true,
      imgSrc: ''
    }
  },
  methods: {
    selectLanguage () {
      this.$data.selectLang = !this.$data.selectLang
    },
    selectCities () {
      this.$data.selectCity = !this.$data.selectCity
    },
    selectLangs (e) {
      // console.log(e)
      this.$data.selectLang = false
      this.$i18n.locale = e.srcElement.dataset.lang
      localStorage.setItem('locale', e.srcElement.dataset.lang)
      switch (e.srcElement.dataset.lang) {
        case 'cn': this.$data.lang = '中文（中国大陆）'; break
        case 'hk': this.$data.lang = '中文（香港特別行政區和台灣省）'; break
        case 'en': this.$data.lang = 'English (US & UK & Australia)'; break
        case 'jp': this.$data.lang = '日本語(日本)'; break
        case 'kr': this.$data.lang = '한국어 (한국)'; break
      }
      const select = this.$cookies.get('selector')
      switch (select) {
        case '百度': case 'Baidu': this.$cookies.set('selector', this.$t('messages.baidu'), -1); break
        case '谷歌': case 'Google': this.$cookies.set('selector', this.$t('messages.google'), -1); break
        case '必应': case 'Bing': this.$cookies.set('selector', this.$t('messages.bing'), -1); break
      }
    },
    closeSettings () {
      this.$emit('csetting', false)
    },
    changeWeather () {
      this.$emit('showWeather', this.$data.showWeather)
    },
    UploadSuccess (res) {
      console.log(res)
    },
    UploadError (err) {
      console.log(err)
    },
    UploadImg (item) {
      const that = this
      // console.log(item)
      const formData = new FormData()
      formData.append('file', item.file)
      formData.append('sduId', this.$data.uploadData.sduId.user)
      axios({
        method: 'post',
        url: 'backdev/upload',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(function (res) {
        console.log(res)
        that.$cookies.set('back', res.data.url)
        that.$data.imgSrc = res.data.url
        location.reload()
      }).catch(function (err) {
        console.log(err)
      })
    }
  },
  created () {
    const lang = localStorage.getItem('locale')
    switch (lang) {
      case 'cn': this.$data.lang = '中文（中国大陆）'; break
      case 'hk': this.$data.lang = '中文（香港特別行政區和台灣省）'; break
      case 'en': this.$data.lang = 'English (US & UK & Australia)'; break
      case 'jp': this.$data.lang = '日本語(日本)'; break
      case 'kr': this.$data.lang = '한국어 (한국)'; break
    }
    const weather = this.$cookies.get('weather')
    if (weather !== '' && weather !== null) {
      this.$data.showWeather = JSON.parse(weather)
    } else {
      this.$cookies.set('weather', false)
    }
    const back = this.$cookies.get('back')
    if (back !== '' && back !== null) {
      this.$data.imgSrc = back
    } else {
      this.$data.imgSrc = require('./../assets/background_page.jpg')
    }
    // 登陸狀態
    const login = this.$cookies.get('isLogin')
    if (login === 'true' || login === true) {
      this.$data.isLogin = false
    }
  }
}
</script>

<style scoped>
  #shut {
    font-size: 50px;
    display: inline-block;
    position: absolute;
    right: 30px;
    cursor: pointer;
  }
  #settings {
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
  #nametitle {
    text-align: center;
    display: inline-block;
    margin: 30px;
    margin-bottom: 20px;
    height: 70px;
    line-height: 70px;
  }
  #nametitle img {
    width: 70px;
    display: inline-block;
  }
  #nametitle h1 {
    display: inline-block;
    /*position: absolute;*/
    /*padding-left: 10px;*/
    line-height: 70px;
    transform: translateY(-25px);
  }
  .setting_title {
    margin-left: 50px;
  }
  .tip {
    margin-left: 50px;
    margin-top: 10px;
    margin-bottom: 10px;
    margin-right: 20px;
    color: black;
    font-size: 1.2em;
    display: inline-block;
  }
  .dropbox {
    display: inline-block;
    line-height: 1.2em;
    color: black;
    width: 300px;
    background-color: #fff;
    padding: 5px;
    padding-left: 10px;
    border-radius: 15px;
  }
  .dropbox div {
    display: inline-block;
    width: 280px;
    cursor: pointer;
  }
  .dropbox img {
    width: 10px;
    display: inline-block;
  }
  ul {
    display: block;
    position: absolute;
    z-index: 1;
    left: 160px;
    background-color: #fff;
    padding: 10px;
    width: 275px;
    border-radius: 10px;
    color: black;
  }
  li {
    list-style-type: none;
    background-color: #dddddd;
    padding-left: 10px;
    padding-bottom: 5px;
    padding-top: 5px;
    margin-bottom: 5px;
    border-radius: 5px;
    cursor: pointer;
  }
  #nowImg {
    /*width: 150px;*/
    height: 150px;
    margin-left: 46px;
    margin-top: 10px;
    border-radius: 10px;
  }
  >>> .swither {
    position: relative;
    z-index: 0;
    top: -3.5px;
  }
  /deep/ .upload-demo {
    /*width: 200px;*/
    display: inline-block;
    opacity: 0.8;
    margin-left: 46px;
    margin-top: 10px;
  }
  /deep/ .upload-demo div {
    display: inline-block;
    width: 300px;
    height: 150px;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  @media screen and (max-width: 800px) {
    #settings {
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
    .dropbox {
      display: inline-block;
      line-height: 1.2em;
      color: black;
      white-space:nowrap;
      overflow:hidden;
      text-overflow:ellipsis;
      width: 250px;
      position: relative;
      left: 50%;
      transform: translateX(-50%);
    }
    .dropbox div {
      display: inline-block;
      width: 230px;
      cursor: pointer;
    }
    #nowImg {
      /*width: 150px;*/
      width: 250px;
      margin-left: 46px;
      margin-top: 10px;
      border-radius: 10px;
    }
    /deep/ .upload-demo {
      /*width: 200px;*/
      display: inline-block;
      opacity: 0.8;
      /*margin-left: 46px;*/
      margin-top: 10px;
    }
    /deep/ .upload-demo div {
      display: inline-block;
      width: 250px;
      height: 150px;
    }
    ul {
      display: block;
      /*position: absolute;*/
      position: absolute;
      z-index: 1;
      left: 50%;
      transform: translateX(-50%);
      background-color: #fff;
      padding: 10px;
      width: 275px;
      border-radius: 10px;
      color: black;
    }
  }
</style>
