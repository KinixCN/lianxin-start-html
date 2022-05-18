<template>
  <div id="buttonGroup">
    <!--   稍后用列表渲染   -->
    <a href="https://www.sdu.edu.cn" target="_blank"><div class="button" @click="hideAll">{{ $t("messages.sdu") }}</div></a>
    <a href="https://baidu.com" target="_blank"><div class="button" @click="hideAll">{{ $t("messages.baidu") }}</div></a>
    <a href="https://www.google.com" target="_blank"><div class="button" @click="hideAll">{{$t("messages.google")}}</div></a>
    <a href="https://www.bing.com" target="_blank"><div class="button" @click="hideAll">{{ $t("messages.bing") }}</div></a>
    <a :href="translateURL" target="_blank"><div class="button" @click="hideAll">{{ $t("messages.trans") }}</div></a>
    <div class="outbox" v-for="(target, index) in targets" :key="index">
      <a :href="target.url" target="_blank"><div class="button" @contextmenu.prevent="showChange" :data-ind="index" @click="hideAll" @touchstart="gtouchstart" @touchmove="gtouchmove" @touchend="showDeleteButton">{{target.name}}</div></a>
      <transition name="fade">
        <div class="panel" :id="index" v-show="editAndDel[index].cut">
          <div id="edit" @click="showAndHideEdit" :data-ind="index">{{ $t("messages.edit") }}</div>
          <div id="del" @click="showAndHideDel" :data-ind="index">{{ $t("messages.del") }}</div>
        </div>
      </transition>
      <transition name="fade">
        <div id="editPanel" v-show="edit[index].cut">
          <div class="panelTitle">{{ $t("messages.edit") }}</div>
          <div class="inputBox">
            <!--          <div class="tipWords">捷径名称</div>-->
            <input v-model="tempName[index].text"/>
          </div>
          <div class="inputBox">
            <!--          <div class="tipWords">捷径网址</div>-->
            <input v-model="tempURL[index].text"/>
          </div>
          <div id="buttonPanel">
            <button class="confirm" @click="confirmEdit" :data-ind="index">{{ $t("messages.confirm") }}</button>
            <button class="quit" @click="showAndHideEdit" :data-ind="index">{{ $t("messages.cancel") }}</button>
          </div>
        </div>
      </transition>
      <transition name="fade">
        <div id="delPanel" v-show="del[index].cut">
          <div id="info">{{ $t("messages.isDel") }}</div>
          <div id="buttonPanel">
            <button class="confirm" id="delConfirm" @click="confirmDel" :data-ind="index">{{ $t("messages.confirm") }}</button>
            <button class="quit" id="delQuit" @click="showAndHideDel" :data-ind="index">{{ $t("messages.cancel") }}</button>
          </div>
        </div>
      </transition>
    </div>
    <div class="add">
      <div class="button" @click="addOne"> + </div>
      <transition name="fade">
        <div class="editPanel" v-show="areYouSureToAddOne">
          <div class="panelTitle">{{ $t("messages.add") }}</div>
          <div class="inputBox">
            <!--          <div class="tipWords">捷径名称</div>-->
            <input v-model="tempNameText" :placeholder="$t('messages.webName')">
          </div>
          <div class="inputBox">
            <!--          <div class="tipWords">捷径网址</div>-->
            <input v-model="tempURLText" :placeholder="$t('messages.webURL')"/>
          </div>
          <div class="buttonPanel">
            <button class="confirm" @click="confirmAdd">{{ $t("messages.confirm") }}</button>
            <button class="quit" @click="quitAdd">{{ $t("messages.cancel") }}</button>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import buttons from './ButtonGroup'
import axios from 'axios'
export default {
  name: 'ButtonGroup',
  components: {
    buttons
  },
  data () {
    return {
      targets: [],
      translateURL: 'https://fanyi.baidu.com/',
      editAndDel: [],
      editAndDelController: false,
      edit: [],
      del: [],
      tempName: [],
      tempURL: [],
      areYouSureToAddOne: false,
      tempNameText: '',
      tempURLText: ''
    }
  },
  methods: {
    changeTargets (length) {
      this.$data.tempName = []
      this.$data.tempURL = []
      for (var i = 0; i < length; i++) {
        this.$data.targets[i] = this.$cookies.get('targets[' + i + ']')
        this.$data.editAndDel.push({cut: false})
        this.$data.edit.push({cut: false})
        this.$data.del.push({cut: false})
        this.$data.tempName.push({text: this.$cookies.get('targets[' + i + ']').name, origin: this.$cookies.get('targets[' + i + ']').name})
        this.$data.tempURL.push({text: this.$cookies.get('targets[' + i + ']').url, origin: this.$cookies.get('targets[' + i + ']').url})
      }
      this.$forceUpdate()
      // console.log(this.$data.tempName)
    },
    showChange (e) {
      for (var i = 0; i < this.$cookies.get('targetLength'); i++) {
        this.$data.editAndDel[i].cut = false
        this.$data.edit[i].cut = false
        this.$data.del[i].cut = false
      }
      this.$data.areYouSureToAddOne = false
      const ind = parseInt(e.srcElement.dataset.ind)
      this.$data.editAndDel[ind].cut = true
      this.$emit('controller', 0)
    },
    hideChange () {
      for (var i = 0; i < this.$cookies.get('targetLength'); i++) {
        this.$data.editAndDel[i].cut = false
      }
      this.$emit('controller', false)
    },
    showAndHideEdit (e) {
      console.log(this.$data.tempName)
      console.log(this.$data.tempURL)
      this.hideChange()
      const ind = parseInt(e.srcElement.dataset.ind)
      this.$data.edit[ind].cut = !this.$data.edit[ind].cut
      this.$data.tempName[ind].text = this.$data.tempName[ind].origin
      this.$data.tempURL[ind].text = this.$data.tempURL[ind].origin
    },
    showAndHideDel (e) {
      // this.$data.del = !this.$data.del
      this.hideChange()
      const ind = parseInt(e.srcElement.dataset.ind)
      this.$data.del[ind].cut = !this.$data.del[ind].cut
    },
    confirmEdit (e) {
      // 关掉窗口
      const ind = parseInt(e.srcElement.dataset.ind)
      this.$data.edit[ind].cut = !this.$data.edit[ind].cut
      // 更改前台数据
      this.$data.targets[ind].name = this.$data.tempName[ind].text
      this.$data.targets[ind].url = this.$data.tempURL[ind].text
      // 更新备份
      this.$data.tempName[ind].origin = this.$data.tempName[ind].text
      this.$data.tempURL[ind].origin = this.$data.tempURL[ind].text
      // 更改本地cookie
      this.$cookies.set('targets[' + ind + ']', this.$data.targets[ind], -1)
      // 更改云端数据
      if (this.$cookies.get('user') !== '' && this.$cookies.get('user') !== null) {
        axios({
          method: 'post',
          url: 'backdev/target/upd',
          data: {
            id: this.$cookies.get('targets[' + ind + ']').id,
            name: this.$data.targets[ind].name,
            url: this.$data.targets[ind].url
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
    },
    confirmDel (e) {
      // 关掉窗口
      const ind = parseInt(e.srcElement.dataset.ind)
      this.$data.del[ind].cut = !this.$data.del[ind].cut
      // 获取后端删除验证钥id
      const key = this.$cookies.get('targets[' + ind + ']').id
      // 删除前台数据
      this.$data.targets.splice(ind, 1)
      this.$data.edit.splice(ind, 1)
      this.$data.del.splice(ind, 1)
      this.$data.tempName.splice(ind, 1)
      this.$data.tempURL.splice(ind, 1)
      // 删除cookie
      for (var i = ind; i < this.$cookies.get('targetLength') - 1; i++) {
        this.$cookies.set('targets[' + i + ']', this.$cookies.get('targets[' + (i + 1) + ']'), -1)
      }
      this.$cookies.remove('targets[' + (this.$cookies.get('targetLength') - 1) + ']')
      var length = this.$cookies.get('targetLength')
      this.$cookies.set('targetLength', length - 1, -1)
      // 删除云端数据
      if (this.$cookies.get('user') !== '' && this.$cookies.get('user') !== null) {
        axios({
          method: 'post',
          url: 'backdev/target/del',
          data: {
            id: key
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
      // console.log(this.$data.tempName)
    },
    hideAll () {
      for (var i = 0; i < this.$cookies.get('targetLength'); i++) {
        this.$data.editAndDel[i].cut = false
        this.$data.edit[i].cut = false
        this.$data.del[i].cut = false
      }
    },
    addOne (e) {
      for (var i = 0; i < this.$cookies.get('targetLength'); i++) {
        this.$data.editAndDel[i].cut = false
        this.$data.edit[i].cut = false
        this.$data.del[i].cut = false
      }
      this.$data.areYouSureToAddOne = true
    },
    confirmAdd (e) {
      const that = this
      if (this.$data.tempNameText !== '' && this.$data.tempURLText !== '') {
        // 关闭窗口
        this.$data.areYouSureToAddOne = false
        // 更新一下本地cookie
        const obj = {
          name: that.$data.tempNameText,
          url: that.$data.tempURLText
        }
        const length = that.$cookies.get('targetLength')
        if (length !== '' && length !== null) {
          const lengthNum = parseInt(length)
          that.$cookies.set('targets[' + lengthNum + ']', obj, -1)
          that.$cookies.set('targetLength', lengthNum + 1, -1)
          this.$data.tempName = []
          this.$data.tempURL = []
          this.changeTargets(lengthNum + 1)
        } else {
          that.$cookies.set('targets[0]', obj, -1)
          that.$cookies.set('targetLength', 1, -1)
          this.$data.tempName = []
          this.$data.tempURL = []
          this.changeTargets(1)
        }
        // 添加云端数据
        if (this.$cookies.get('user') !== '' && this.$cookies.get('user') !== null) {
          axios({
            method: 'post',
            url: 'backdev/target/add',
            data: {
              name: this.$data.tempNameText,
              url: this.$data.tempURLText,
              underId: this.$cookies.get('user').user
            },
            headers: {
              'content-type': 'application/json'
            }
          })
            .then(function (res) {
              console.log(res)
              const length = that.$cookies.get('targetLength')
              const lengthNum = parseInt(length)
              that.$cookies.set('targets[' + (lengthNum - 1) + ']', res.data[0])
              that.$data.tempName = []
              that.$data.tempURL = []
              that.changeTargets(length)
            })
            .catch(function (err) {
              console.log(err)
            })
        }
        this.$data.tempNameText = ''
        this.$data.tempURLText = ''
      } else {
        alert(this.$t('messages.nothingError'))
      }
    },
    quitAdd (e) {
      this.$data.areYouSureToAddOne = false
      this.$data.tempNameText = ''
      this.$data.tempURLText = ''
    },
    // 长按事件（起始）
    gtouchstart (item) {
      var self = this
      this.timeOutEvent = setTimeout(function () {
        self.longPress(item)
      }, 500) // 这里设置定时器，定义长按500毫秒触发长按事件
      return false
    },
    // 手释放，如果在500毫秒内就释放，则取消长按事件，此时可以执行onclick应该执行的事件
    showDeleteButton (item) {
      clearTimeout(this.timeOutEvent) // 清除定时器
      if (this.timeOutEvent !== 0) {
        console.log('点击但未长按')
      }
      return false
    },
    // 如果手指有移动，则取消所有事件，此时说明用户只是要移动而不是长按
    gtouchmove () {
      clearTimeout(this.timeOutEvent) // 清除定时器
      this.timeOutEvent = 0
    },
    // 真正长按后应该执行的内容
    longPress (val) {
      this.timeOutEvent = 0
      // 执行长按要执行的内容，如弹出菜单
      this.showChange(val)
      // console.log(val)
    }
  },
  created () {
    // 切换翻译插件
    let selector = this.$cookies.get('selector')
    // console.log(selector)
    switch (selector) {
      case '百度' || 'Baidu': this.$data.translateURL = 'https://fanyi.baidu.com/'; break
      case '谷歌' || 'Google': this.$data.translateURL = 'https://translate.google.com/'; break
      case '必应' || 'Bing': this.$data.translateURL = 'https://www.bing.com/Translator/'; break
    }
    // 强制刷新一下
    this.$data.tempName = []
    this.$data.tempURL = []
    this.changeTargets(this.$cookies.get('targetLength'))
  }
}
</script>

<style scoped>
  #buttonGroup {
    text-align: center;
    /*margin-left: 200px;*/
    /*margin-right: 200px;*/
  }
  .button {
    background-color: #fff;
    display: inline-block;
    /*width: 150px;*/
    /*height: 50px;*/
    margin: 30px;
    padding-left: 50px;
    padding-right: 50px;
    font-size: 20px;
    line-height: 50px;
    border-radius: 30px;
    opacity: 0.7;
    cursor: pointer;
    color: #000;
  }
  .button:hover {
    opacity: 0.85;
  }
  .outbox {
    display: inline-block;
    position: relative;
  }
  .panel {
    display: grid;
    grid-template-rows: auto auto;
    width: 300px;
    height: 90px;
    background-color: #fff;
    border-radius: 15px;
    opacity: 0.8;
    z-index: 2;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
  }
  .panel div {
    background-color: #fff;
    line-height: 45px;
    cursor: pointer;
  }
  .panel div:hover {
    transition: 0.3s linear;
    background-color: #ccc;
  }
  #edit {
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
  }
  #del {
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
  }
  #editPanel {
    display: inline-block;
    background-color: #fff;
    width: 250px;
    height: 200px;
    border-radius: 15px;
    position: relative;
    background: rgba(255,255,255,0.8);
    text-align: center;
    z-index: 3;
  }
  .editPanel {
    display: inline-block;
    background-color: #fff;
    width: 250px;
    height: 200px;
    border-radius: 15px;
    position: relative;
    background: rgba(255,255,255,0.8);
    text-align: center;
  }
  .panelTitle {
    display: inline-block;
    font-size: 20px;
    font-weight: bold;
    margin-top: 10px;
  }
  .inputBox {
    margin-top: 15px;
  }
  .tipWords {
    display: inline-block;
    margin-left: 5px;
  }
  .inputBox input {
    outline: none;
    height: 30px;
    background-color: #cccccc;
    border: none;
    border-radius: 15px;
    text-align: center;
    width: 130px;
    padding-left: 10px;
    padding-right: 10px;
  }
  #buttonPanel {
    text-align: center;
    margin-top: 20px;
  }
  .buttonPanel {
    text-align: center;
    margin-top: 20px;
  }
  #buttonPanel button {
    width: 70px;
    height: 30px;
    margin-left: 10px;
    margin-right: 10px;
    border-radius: 20px;
    border: none;
    background-color: #4bb6ff;
    color: white;
    cursor: pointer;
  }
  .buttonPanel button {
    width: 70px;
    height: 30px;
    margin-left: 10px;
    margin-right: 10px;
    border-radius: 20px;
    border: none;
    background-color: #4bb6ff;
    color: white;
    cursor: pointer;
  }
  #delPanel {
    width: 250px;
    height: 110px;
    background-color: #fff;
    border-radius: 15px;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(255,255,255,0.8);
    text-align: center;
    z-index: 3;
    padding-top: 40px;
  }
  #info {
    /*margin-top: 40px;*/
  }
  #delConfirm:hover {
    background-color: red;
    transition: 0.2s linear;
  }
  .add {
    display: inline-block;
    position: relative;
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
  @media screen and (min-width: 740px) {
    .panel {
      display: grid;
      grid-template-rows: auto auto;
      position: absolute;
      left: 45.5px;
      top: 90px;
      width: 120px;
      height: 90px;
      background-color: #fff;
      border-radius: 15px;
      opacity: 0.8;
      z-index: 2;
    }
    #editPanel {
      display: inline-block;
      background-color: #fff;
      width: 250px;
      height: 200px;
      border-radius: 15px;
      position: absolute;
      left: 30px;
      top: 90px;
      background: rgba(255,255,255,0.8);
      text-align: center;
      z-index: 3;
    }
    #delPanel {
      width: 250px;
      height: 110px;
      background-color: #fff;
      border-radius: 15px;
      position: absolute;
      left: 30px;
      top: 90px;
      background: rgba(255,255,255,0.8);
      text-align: center;
      z-index: 3;
    }
    .editPanel {
      display: inline-block;
      background-color: #fff;
      width: 250px;
      height: 200px;
      border-radius: 15px;
      position: absolute;
      left: 30px;
      top: 90px;
      background: rgba(255,255,255,0.8);
      text-align: center;
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
  }
</style>
