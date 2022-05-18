<template>
  <div id="footer">
    <div id="copyright" class="footer_content">Copyright©2022 {{ $t("messages.signName") }}</div>
    <div class="br footer_content">|</div>
    <div id="info" class="footer_content">鲁ICP备2022004077号-2</div>
    <div class="br footer_content">|</div>
    <div id="group" class="footer_content">{{ $t("messages.name") }}</div>
    <div class="br footer_content">|</div>
    <div class="footer_content" @click="showAbout" id="about">{{ $t("messages.about") }}</div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data () {
    return {
      about: false
    }
  },
  components: {
  },
  methods: {
    showAbout () {
      this.$data.about = true
      this.$emit('about', this.about)
    }
  }
}
</script>

<style scoped>
  #footer {
    display: inline-block;
    position: fixed;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    height: 30px;
    line-height: 30px;
    padding-left: 20px;
    padding-right: 20px;
    background-color: #c3c3c3;
    opacity: 0.62;
    border-radius: 20px;
  }
  .footer_content {
    color: #000;
    display: inline-block;
    opacity: 0.52;
  }
  #copyright {
    font-weight: bold;
  }
  #about {
    cursor: pointer;
  }
</style>
