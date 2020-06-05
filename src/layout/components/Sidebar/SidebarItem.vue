<template>
  <div v-if="!item.hidden" class="menu-wrapper">
    <el-submenu :index="basePath" v-if="item.children &&item.children.length>1">
      <template slot="title">
        <svg-icon v-if="item.meta.icon" :icon-class="item.meta.icon"></svg-icon>
        <span>{{generateTitle(item.meta.title)}}</span>
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
      <el-menu-item  :index="resolvePath(onlyOneChild.path)">
        <svg-icon v-if="onlyOneChild.meta &&onlyOneChild.meta.icon" :icon-class="onlyOneChild.meta.icon"></svg-icon>
        <span slot="title">{{generateTitle(onlyOneChild.meta.title)}}</span>
      </el-menu-item>
    </template>
    
  </div>
</template>

<script>
import path from 'path'
import { generateTitle } from '@/utils/i18n'
import { isExternal } from '@/utils/validate'

export default {
  name: 'SidebarItem',
  components: { },
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    // To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
    // TODO: refactor with render function
    this.onlyOneChild = null
    return {
      onlyOneChild: null
    }
  },
  created(){
    this.onlyOneChild = this.item.children &&this.item.children.length ===1 ? this.item.children[0] : this.item;
  },
  methods: {
    generateTitle:generateTitle,
    
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      return path.resolve(this.basePath, routePath)
    }
    
  }
}
</script>
