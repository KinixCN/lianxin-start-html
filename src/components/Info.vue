<template>
  <div id="info">
    <h1 id="name">{{ $t("messages.title") }}</h1>
    <div id="close" @click="closeAbout">×</div>
    <div id="content">
      <p>{{ $t("messages.p1") }}</p>
      <p>{{ $t("messages.p2") }}<a href="https://github.com/KinixCN/lianxin-start.git" target="_blank">https://github.com/KinixCN/lianxin-start.git</a>。{{ $t("messages.p3") }}</p>
      <p>{{ $t("messages.p4") }}</p>
      <p>{{ $t("messages.p5") }}</p>
    </div>
    <div id="me">
      <div>{{ $t("messages.signName") }}</div>
      <div>{{ $t("messages.signTime") }}</div>
    </div>
    <div id="contact">
      <div> <a href="tencent://message/?uin=89927737&Site=在线QQ&Menu=yes" target="_blank"><img src="./../assets/QQ.png" class="contact"></a> </div>
      <div> <a href="http://www.kynix.top:8080/fileManager-1.0-SNAPSHOT/image/lianxin-start/wechat.jpg" target="_blank"><img src="./../assets/wechat.png" class="contact"></a> </div>
      <div> <a href="http://www.kynix.top:8080/fileManager-1.0-SNAPSHOT/image/lianxin-start/ins.png" target="_blank"><img src="./../assets/instagram.png" class="contact"> </a></div>
      <div> <a href="mailto:kynixcn@gmail.com" target="_blank"><img src="./../assets/mail.png" class="contact"> </a></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Info',
  data () {
    return {
      about: false
    }
  },
  methods: {
    closeAbout () {
      this.$emit('cabout', this.$data.about)
    }
  }
}
</script>

<style scoped>
  #info {
    display: inline-block;
    width: 800px;
    /*height: 500px;*/
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
    padding-bottom: 30px;
  }
  #name {
    text-align: center;
    display: inline-block;
    margin: 30px;
  }
  p {
    text-indent: 2em;
    margin-left: 20px;
    margin-right: 20px;
    line-height: 25px;
  }
  #me {
    margin: 20px;
    text-align: right;
    font-weight: bold;
  }
  #contact {
    text-align: center;
    margin-top: 30px;
  }
  #contact div {
    display: inline-block;
    width: 70px;
    height: 70px;
    line-height: 70px;
    margin-left: 10px;
    margin-right: 10px;
    border-radius: 35px;
    text-align: center;
    backdrop-filter: blur(20px);
    cursor: pointer;
  }
  .contact {
    width: 50px;
    margin-top: 9px;
  }
  #close {
    font-size: 50px;
    display: inline-block;
    position: absolute;
    right: 30px;
    cursor: pointer;
  }
</style>
