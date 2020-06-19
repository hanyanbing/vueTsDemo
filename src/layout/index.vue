<template>
  <!-- classObj, 配置sider/main_container样式、  左侧菜单展开/收起样式 -->
  <div :class="classObj" class="app-wrapper">
    <!-- 左侧菜单栏 -->
    <sidebar class="sidebar-container" />

    <!-- 右侧主体 -->
    <div class="main-container">
      <!-- 菜单横向展开、收起；  全屏、搜索、 个人中心、退出 -->
      <navbar />

      <tags-view v-if="showTagsView" />

      <!-- 右侧路由主体内容 -->
      <app-main />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';

import { Sidebar, Navbar } from './components/index'; // 先通过ts逐个导入，再批量导入
import AppMain from './components/AppMain.vue'; // 直接导入vue文件
import TagsView from './components/TagsView/index.vue';

const app = namespace('app');
const settings = namespace('settings');

@Component({
  components: {
    Sidebar,
    Navbar,
    TagsView,
    AppMain
  }
})
export default class Layout extends Vue {
  @app.State('sidebarCollapse') private sidebarCollapse!: boolean;
  @app.State('withoutAnimation') private withoutAnimation!: boolean;
  @settings.State('showTagsView') private showTagsView!: boolean;

  get classObj() {
    return {
      hideSidebar: this.sidebarCollapse,
      openSidebar: !this.sidebarCollapse,
      withoutAnimation: this.withoutAnimation
    };
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
@import '~@/styles/variables.scss';

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>
