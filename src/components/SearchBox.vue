/* eslint-disable */
<template>
  <div id="sb">
    <div id="Sbox">
      <div id="selector_box">
        <div @click="showLists" id="selector" v-if="!isPhone">{{select}}</div>
        <div @click="showLists" id="selector_mini" v-else> <img :src="select_icon"> </div>
        <transition name="fade">
          <div v-if="showList">
            <ul id="selector_list">
              <li id="baidu" data-name="百度" @click="changeSelector" :style="{backgroundColor: bgc[0]}">{{ $t("messages.baidu") }}</li>
              <li id="google" data-name="谷歌" @click="changeSelector" :style="{backgroundColor: bgc[1]}">{{ $t("messages.google") }}</li>
              <li id="bing" data-name="必应" @click="changeSelector" :style="{backgroundColor: bgc[2]}">{{ $t("messages.bing") }}</li>
            </ul>
          </div>
        </transition>
      </div>
      <input type="text" @focus="hideLists" ref="getFocus" v-model="input" @input="getSuggestions" @compositionstart="flag=false" @compositionend="flag=true" @keyup="get" @keydown.down="changeDown" @keydown.up="changeUp" class="inputBoxToSearch">
      <transition name="fade">
        <!--      <div v-if="isInput" id="sugBox">-->
        <div id="sugBox" v-if="isInput">
          <ul id="suggestion">
            <li v-for="(data, index) in datas" :key="data" @click="searchBySug" :class="{select : styles[index]}">{{data}}</li>
          </ul>
        </div>
      </transition>
      <button @click="search" v-if="!isPhone">{{ $t("messages.search") }}</button>
      <button @click="search" v-else> <img src="./../assets/search.png"></button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import './../assets/sass/media.scss'

export default {
  name: 'SearchBox',
  data () {
    return {
      select: this.$t('messages.baidu'), // selector的值
      showList: false,
      bgc: ['#cccccc', '#cccccc', '#cccccc'],
      input: '',
      datas: [],
      isInput: false,
      flag: true,
      now: -1,
      styles: [],
      select_icon: require('../assets/bing.png'),
      isPhone: false
    }
  },
  methods: {
    // eslint-disable-next-line vue/no-dupe-keys
    showLists () {
      this.$data.showList = !this.$data.showList
    },
    hideLists () {
      this.$data.showList = false
    },
    changeSelector (e) {
      const index = parseInt(e.target.dataset.name)
      for (let i = 0; i < 3; i++) {
        this.$data.bgc[i] = '#cccccc'
      }
      this.$data.bgc[index] = '#83cbff'
      console.log(e.srcElement.dataset.name)
      this.$data.select = e.srcElement.dataset.name
      switch (e.srcElement.dataset.name) {
        case '百度':case 'Baidu': this.$data.select_icon = require('./../assets/baidu.png'); break
        case '谷歌':case 'Google': this.$data.select_icon = require('./../assets/google.png'); break
        case '必应':case 'Bing': this.$data.select_icon = require('./../assets/bing.png'); break
      }
      this.$data.showList = false
      this.$cookies.set('selector', this.$data.select, -1)
    },
    getSuggestions (e) {
      let that = this
      console.log(that.$data.input)
      console.log(e)
      if (this.$data.input !== '') {
        this.$data.isInput = true
      } else {
        this.$data.isInput = false
      }

      if (this.$data.flag) {
        axios({
          method: 'get',
          url: 'apis/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=' + that.$data.input + '&json=1'
        })
          .then(function (res) {
            var resData = res.data
            var resDatas = resData.split('"s":')
            var datas = resDatas[1].split('"')
            // that.$data.datas = datas
            for (var i = 0; i < 0.5 * datas.length - 1; i++) {
              // that.$data.datas[i] = datas[2 * i + 1]
              that.$set(that.$data.datas, i, datas[2 * i + 1])
              that.$set(that.$data.styles, i, false)
            }
          })
          .catch(function (err) {
            console.log(err)
          })
      }
    },
    get (e) {
      // 请求限制 按了上下箭头
      if (e.keyCode === 38 || e.keyCode === 40) {
        return
      }
      // enter跳转
      const baiduS = 'https://www.baidu.com/s?wd='
      const googleS = 'https://www.google.com/search?q='
      const bingS = 'https://www.bing.com/search?q='
      const baidu = 'https://www.baidu.com'
      const google = 'https://www.google.com'
      const bing = 'https://www.bing.com'
      if (e.keyCode === 13) {
        if (this.$data.input !== '') {
          // eslint-disable-next-line no-unused-vars
          var url = ''
          if (this.$data.select === '百度' || this.$data.select === 'Baidu') {
            url = baiduS
          } else if (this.$data.select === '谷歌' || this.$data.select === 'Google') {
            url = googleS
          } else if (this.$data.select === '必应' || this.$data.select === 'Bing') {
            url = bingS
          }
          window.open(url + this.$data.input)
          this.$data.input = ''
          this.$data.datas = []
          this.$data.isInput = false
        } else {
          // window.open('https://www.baidu.com')
          // eslint-disable-next-line camelcase
          var url_empty = ''
          if (this.$data.select === '百度' || this.$data.select === 'Baidu') {
            // eslint-disable-next-line camelcase
            url_empty = baidu
          } else if (this.$data.select === '谷歌' || this.$data.select === 'Google') {
            // eslint-disable-next-line camelcase
            url_empty = google
          } else if (this.$data.select === '必应' || this.$data.select === 'Bing') {
            // eslint-disable-next-line camelcase
            url_empty = bing
          }
          window.open(url_empty)
        }
      }
    },
    search () {
      const that = this
      const baiduS = 'https://www.baidu.com/s?wd='
      const googleS = 'https://www.google.com/search?q='
      const bingS = 'https://www.bing.com/search?q='
      const baidu = 'https://www.baidu.com'
      const google = 'https://www.google.com'
      const bing = 'https://www.bing.com'
      if (this.$data.input !== '') {
        // eslint-disable-next-line no-unused-vars
        var url = ''
        switch (that.$data.select) {
          case '百度':case 'Baidu': url = baiduS; break
          case '谷歌':case 'Google': url = googleS; break
          case '必应':case 'Bing': url = bingS; break
        }
        window.open(url + this.$data.input)
        this.$data.input = ''
        this.$data.datas = []
        this.$data.isInput = false
      } else {
        // eslint-disable-next-line camelcase,no-unused-vars
        var url_empty = ''
        switch (that.$data.select) {
          // eslint-disable-next-line camelcase
          case '百度':case 'Baidu': url_empty = baidu; break
          // eslint-disable-next-line camelcase
          case '谷歌':case 'Google': url_empty = google; break
          // eslint-disable-next-line camelcase
          case '必应':case 'Bing': url_empty = bing; break
        }
        window.open(url_empty)
      }
    },
    searchBySug (e) {
      // console.log(e.target.innerText)
      const baiduS = 'https://www.baidu.com/s?wd='
      const googleS = 'https://www.google.com/search?q='
      const bingS = 'https://www.bing.com/search?q='
      var url = ''
      switch (this.$data.select) {
        case '百度':case 'Baidu': url = baiduS; break
        case '谷歌':case 'Google': url = googleS; break
        case '必应':case 'Bing': url = bingS; break
      }
      window.open(url + e.target.innerText)
      this.$data.input = ''
      this.$data.isInput = false
    },
    changeDown () {
      this.$data.now++
      if (this.$data.now === this.$data.datas.length) {
        this.$data.now = 0
      }
      this.$data.input = this.$data.datas[this.now]
      for (var i = 0; i < this.$data.datas.length; i++) {
        this.$data.styles[i] = false
      }
      this.$data.styles[this.now] = true
    },
    changeUp () {
      this.$data.now--
      if (this.$data.now === -2) {
        this.$data.now = this.$data.datas.length - 1
      }
      this.$data.input = this.$data.datas[this.now]
      for (var i = 0; i < this.$data.datas.length; i++) {
        this.$data.styles[i] = false
      }
      this.$data.styles[this.now] = true
    }
  },
  created () {
    let selector = this.$cookies.get('selector')
    // console.log(selector)
    if (selector !== null) {
      this.$data.select = selector
    }
    switch (this.$data.select) {
      case '百度':case 'Baidu':this.$data.bgc[0] = '#83cbff'; break
      case '谷歌':case 'Google':this.$data.bgc[1] = '#83cbff'; break
      case '必应':case 'Bing':this.$data.bgc[2] = '#83cbff'; break
    }
    switch (this.$data.select) {
      case '百度':case 'Baidu':this.$data.select_icon = require('./../assets/baidu.png'); break
      case '谷歌':case 'Google':this.$data.select_icon = require('./../assets/google.png'); break
      case '必应':case 'Bing':this.$data.select_icon = require('./../assets/bing.png'); break
    }
    let w = document.documentElement.offsetWidth || document.body.offsetWidth
    if (w <= 740) {
      this.$data.isPhone = true
    }
  },
  mounted () {
    this.$nextTick(
      () => {
        this.$refs.getFocus.focus()
      }
    )
  }
}
</script>

<style scoped>
  #sb {
    display: block;
    text-align: center;
  }
  #Sbox {
    display: inline-block;
  }
  select {
    display: inline-block;
    width: 110px;
    height: 40px;
    border-radius: 20px;
    text-align: center;
    border: none;
    outline: none;
    background-color: #00b9ff;
    color: white;
    appearance: none;
  }
  input {
    display: inline-block;
    border: none;
    outline: none;
    border-radius: 20px;
    width: 500px;
    height: 40px;
    text-align: center;
  }
  button {
    display: inline-block;
    border: none;
    outline: none;
    border-radius: 20px;
    width: 110px;
    height: 40px;
    text-align: center;
    background-color: #00b9ff;
    color: white;
    cursor: pointer;
  }
  #selector_box {
    display: inline-block;
    position: relative;
    text-align: center;
  }
  #selector {
    width: 110px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background-color: #00b9ff;
    border-radius: 20px;
    color: white;
    cursor: pointer;
  }
  #selector_mini {
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background-color: #00b9ff;
    border-radius: 20px;
    color: white;
    cursor: pointer;
  }
  #selector_mini img {
    width: 25px;
    transform: translateY(5px);
  }
  button img {
    width: 20px;
    transform: translateY(2px);
  }
  #selector_list {
    width: 70px;
    padding-left: 10px;
    padding-right: 10px;
    margin-top: 10px;
    background-color: #fff;
    display: inline-block;
    position: absolute;
    text-align: center;
    transform: translateX(-50%);
    border-radius: 10px;
    opacity: 0.8;
  }
  #selector_list li {
    list-style-type: none;
    cursor: pointer;
    margin-top: 10px;
    margin-bottom: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
    /*background-color: #cccccc;*/
    border-radius: 10px;
    color: white;
  }
  #sugBox {
    display: inline-block;
    width: 460px;
    position: absolute;
    top: 260px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #fff;
    border-radius: 30px;
    background: rgba(255,255,255,0.61);
    backdrop-filter: blur(8px);
    text-align: center;
  }
  #suggestion {
    border-radius: 30px;
    text-align: center;
    padding-top: 5px;
    padding-bottom: 5px;
  }
  #suggestion li {
    height: 30px;
    line-height: 30px;
    list-style-type: none;
    cursor: pointer;
    margin-left: 30px;
    margin-right: 30px;
    margin-top: 5px;
    margin-bottom: 5px;
    border-radius: 15px;
    color: #777;
  }
  #suggestion li:hover {
    /*background-color: #00b9ff;*/
    background: rgba(255,255,255,0.61);
    color: black;
  }
  .select {
    background: rgba(255,255,255,0.61);
    color: black;
  }
  button:hover {
    background: #59ceff;
  }
  #selector:hover {
    background: #59ceff;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  @media screen and (max-width: 740px) {
    .inputBoxToSearch {
      width: 270px;
    }
    #selector {
      width: 40px;
    }
    button {
      width: 40px;
    }
    #selector_list {
      left: 40px;
    }
    #sugBox {
      width: 300px;
    }
  }
</style>
