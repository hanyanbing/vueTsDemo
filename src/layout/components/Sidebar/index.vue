<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />'
    {{from}}
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        router
        :default-active="$route.path"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path">
        </sidebar-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import {mapState, mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem, Logo },
  data () {
    return {
      str: '国籍',
      dataCount: this.$store.state.count
    }
  },
  computed: {
    ...mapGetters([
      'permission_routes',
      'sidebar'
    ]),
    // showLogo() {
    //   return this.$store.state.settings.sidebarLogo
    // },
    ...mapState({
      showLogo: (state) => state.settings.sidebarLogo,
      from: function (state){ // 用普通函数this指向vue实例,要注意
        return this.str
      },

      // https://blog.csdn.net/dkr380205984/article/details/82185740
      // https://blog.csdn.net/weixin_43648947/article/details/88995357
      // count: 'count', // 第一种写法
      // sex: (state) => state.sex, // 第二种写法
      // from: function (state) { // 用普通函数this指向vue实例,要注意
      //   return this.str + ':' + state.from
      // },
      // // 注意下面的写法看起来和上面相同,事实上箭头函数的this指针并没有指向vue实例,因此不要滥用箭头函数
      // // 如果你在用到state的同时还需要借助当前vue实例的this,请务必使用常规写法
      // // from: (state) => this.str + ':' + state.from
      // myCmpted: function () {
      //   // 这里不需要state,测试一下computed的原有用法
      //   return '测试' + this.str
      // }
    }),
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
