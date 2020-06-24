<template>
  <div :class="{ 'has-logo': showLogo }">
    <sidebar-logo v-if="showLogo" :collapse="sidebarCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        router
        :default-active="$route.path"
        :collapse="sidebarCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in permissionRroutes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        >
        </sidebar-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State, Getter, namespace } from 'vuex-class';

import SidebarItem from './SidebarItem.vue';
import SidebarLogo from './SidebarLogo.vue';
import * as variables from '@/styles/sassvariable';

const storeApp = namespace('app');
const storePermission = namespace('permission');
const storeSettings = namespace('settings');

@Component({
  components: {
    SidebarItem,
    SidebarLogo
  }
})
export default class Sidebar extends Vue {
  // 左侧菜单
  @storePermission.State('routes') private permissionRroutes!: object[];
  @storeSettings.State('sidebarLogo') private showLogo!: boolean;
  // 横向展开、收起
  @storeApp.State('sidebarCollapse') private sidebarCollapse!: boolean;

  private variables: any = { ...variables };
}
</script>
