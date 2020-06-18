<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="item.path">
        <span
          v-if="
            item.redirect === 'noredirect' || index === breadcrumbs.length - 1
          "
          class="no-redirect"
          >{{ $t('route.' + item.meta.title) }}</span
        >

        <a v-else @click.prevent="handleLink(item)">{{
          $t('route.' + item.meta.title)
        }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script lang="ts">
import { compile } from 'path-to-regexp';
import {
  Component,
  Vue,
  Emit,
  Inject,
  Provide,
  Prop,
  Watch,
  Model
} from 'vue-property-decorator';
import { RouteRecord, Route } from 'vue-router';

@Component({
  name: 'Breadcrumb'
})
export default class extends Vue {
  private breadcrumbs: RouteRecord[] = [];

  // 监听变化
  @Watch('$route')
  private onRouteChange(route: Route) {
    if (route.path.startsWith('/redirect/')) {
      return;
    }
    this.getBreadcrumb();
  }

  // 初始加载
  private created() {
    this.getBreadcrumb();
  }

  // 组装 面包屑导航
  private getBreadcrumb() {
    let matched = this.$route.matched.filter(
      item => item.meta && item.meta.title
    );
    const first = matched[0];
    if (!this.isDashboard(first)) {
      matched = [
        { path: '/dashboard', meta: { title: 'dashboard' } } as RouteRecord
      ].concat(matched);
    }
    this.breadcrumbs = matched.filter(item => {
      return item.meta && item.meta.title && item.meta.breadcrumb !== false;
    });
    console.log(this.breadcrumbs);
  }

  // 判断是否 为Dashboard首页
  private isDashboard(route: RouteRecord) {
    const name = route && route.name;
    if (!name) {
      return false;
    }
    return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase();
  }

  private pathCompile(path: string) {
    const { params } = this.$route;
    // compile 快速填充 url 字符串的参数值。
    // var pathToRegexp = require('path-to-regexp')

    // var url = '/user/:id/:name'
    // var data = {id: 10001, name: 'bob'}
    // console.log(pathToRegexp.compile(url)(data))

    // 打印结果  /user/10001/bob
    return compile(path)(params);
  }

  private handleLink(item: any) {
    const { redirect, path } = item;
    if (redirect) {
      this.$router.push(redirect);
      return;
    }
    this.$router.push(this.pathCompile(path));
  }
}
</script>

<style lang="scss" scoped>
.el-breadcrumb__inner,
.el-breadcrumb__inner a {
  font-weight: 400 !important;
}

.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
