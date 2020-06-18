<template>
  <div class="navbar">
    <!-- 左侧菜单的展开、收起 -->
    <hamburger
      id="hamburger-container"
      :is-active="sidebarOpen"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <!-- 面包屑式 导航 -->
    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />

    <!-- 全屏、国际化、退出登录 -->
    <div class="right-menu">
      <template v-if="device !== 'mobile'">
        <!-- <size-select class="right-menu-item hover-effect" /> -->
        <!-- 国际化翻译 -->
        <lang-select class="right-menu-item hover-effect" />
        <!-- 全屏切换 -->
        <screenfull class="right-menu-item hover-effect" />
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Emit, Prop, Watch } from 'vue-property-decorator';
import { State, Getter, Mutation, Action, namespace } from 'vuex-class';

import Hamburger from '@/components/Hamburger/index.vue';
import Breadcrumb from '@/components/Breadcrumb/index.vue';
import Screenfull from '@/components/Screenfull/index.vue';
import LangSelect from '@/components/LangSelect/index.vue';

const storeApp = namespace('app');
const storeUser = namespace('user');

@Component({
  components: {
    Hamburger,
    Breadcrumb,
    Screenfull,
    LangSelect
  }
})
export default class Navbar extends Vue {
  @storeApp.State('sidebarOpen') private sidebarOpen: any;
  @storeApp.State('device') private device: any;

  @storeApp.Action('toggleSideBar') private toggleSideBar: any;
  @storeUser.Action('logout') private logout!: any;

  private async logoutCli() {
    await this.logout();
    this.$router.push(`/login?redirect=${this.$route.fullPath}`);
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
