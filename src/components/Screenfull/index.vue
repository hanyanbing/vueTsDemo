<template>
  <div id="screenfull">
    <svg-icon
      :icon-class="isFullscreen ? 'exit-fullscreen' : 'fullscreen'"
      @click="click"
    />
  </div>
</template>

<script lang="ts">
import screenfull from 'screenfull';
import { Component, Vue } from 'vue-property-decorator';

// screenfull插件： http://www.fly63.com/nav/1933
const sf: any = screenfull;

@Component({
  name: 'Screenfull'
})
export default class Screenfull extends Vue {
  private isFullscreen = false;

  // 检测全屏变化
  private mounted() {
    if (sf.enabled) {
      sf.on('change', this.change);
    }
  }

  // 删除侦听器
  private beforeDestory() {
    if (sf.enabled) {
      sf.off('change', this.change);
    }
  }

  // 改变isFullscreen，状态
  private change() {
    if (sf.enabled) {
      this.isFullscreen = sf.isFullscreen;
    }
  }

  private click() {
    if (!sf.enabled) {
      this.$message({
        message: 'you browser can not work',
        type: 'warning'
      });
      return false;
    }
    sf.toggle();
  }
}
</script>
