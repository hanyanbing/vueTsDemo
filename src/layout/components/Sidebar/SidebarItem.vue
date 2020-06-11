<template>
  <div v-if="!item.hidden" class="menu-wrapper">
    <el-submenu
      :index="basePath"
      v-if="item.children && item.children.length > 1"
    >
      <template slot="title">
        <svg-icon v-if="item.meta.icon" :icon-class="item.meta.icon"></svg-icon>
        <span>{{ generateTitle(item.meta.title) }}</span>
      </template>

      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(item.path)"
        class="nest-menu"
      />
    </el-submenu>

    <template v-else>
      <el-menu-item :index="resolvePath(onlyOneChild.path)">
        <svg-icon
          v-if="onlyOneChild.meta && onlyOneChild.meta.icon"
          :icon-class="onlyOneChild.meta.title"
        ></svg-icon>
        <span slot="title">{{ generateTitle(onlyOneChild.meta.title) }}</span>
      </el-menu-item>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, namespace } from 'vuex-class';

import path from 'path';
import generateTitle from '@/utils/i18n';
import { isExternal } from '@/utils/validate';

@Component
export default class SidebarItem extends Vue {
  @Prop() private item!: any;
  @Prop() private isNest!: any;
  @Prop() private basePath!: any;
  private generateTitle = generateTitle;
  private onlyOneChild =
    this.item.children && this.item.children.length === 1
      ? this.item.children[0]
      : this.item;
  private resolvePath(routePath) {
    if (isExternal(routePath)) {
      return routePath;
    }
    return path.resolve(this.basePath, routePath);
  }
}
</script>
