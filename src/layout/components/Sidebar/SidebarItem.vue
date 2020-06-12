<template>
  <div v-if="!item.hidden" class="menu-wrapper">
    
    <!-- children长度 >1 -->
    <el-submenu v-if="item.children && item.children.length > 1" ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
      <template slot="title">
        <svg-icon v-if="item.meta.icon" :icon-class="item.meta.icon"></svg-icon>
        <span>{{ generateTitle(item.meta.title) }}</span>
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-submenu>

    <!-- 不包含children || children长度 <=1 -->
    <template v-else>
      <div v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}">
          <svg-icon v-if="onlyOneChild.meta && onlyOneChild.meta.icon" :icon-class="onlyOneChild.meta.title"
        ></svg-icon>
        <span slot="title">{{ generateTitle(onlyOneChild.meta.title) }}</span>
        </el-menu-item>
      </div>
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
