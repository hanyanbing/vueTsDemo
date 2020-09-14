<template>
  <div class="tags-wrap">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <router-link
        v-for="tag in visitedViews"
        ref="tag"
        tag="span"
        :key="tag.path"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
      >
        <el-tag
          :key="tag.name"
          :closable="!isAffix(tag)"
          style="cursor: pointer"
          :type="isActive(tag) ? 'active' : 'info'"
          @close="closeSelectedTag(tag)"
        >
          {{ $t('route.' + tag.meta.title) }}
        </el-tag>
      </router-link>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import path from 'path';
import { Component, Vue, Emit, Prop, Watch } from 'vue-property-decorator';
import { State, Getter, Mutation, Action, namespace } from 'vuex-class';
import { RouteConfig } from 'vue-router';

const storePermission = namespace('permission');
const storeTagsview = namespace('tagsView');

@Component({
  name: 'TagsView'
})
export default class TagsView extends Vue {
  @storePermission.State('routes') private routes!: object[];
  @storeTagsview.State('visitedViews') private visitedViews!: object[];
  @storeTagsview.Action('delView') private storeDelVistedView: any;

  private affixTags: object[] = [];

  // 初始化加载
  private mounted() {
    this.initTags();
    this.addTags();
  }

  private initTags() {
    const affixTags: object[] = (this.affixTags = this.filterAffixTags(
      this.routes
    ));
    for (const tag of affixTags) {
      // Must have tag name
      if ((tag as any).name) {
        this.$store.dispatch('tagsView/addVisitedView', tag);
      }
    }
  }

  // 添加tag
  private addTags() {
    const { name } = this.$route;
    if (name) {
      this.$store.dispatch('tagsView/addView', this.$route);
    }
    return false;
  }

  // route.meta.affix   显示带属性affix默认项
  private filterAffixTags(routes, basePath = '/') {
    let tags: object[] = [];
    routes.forEach(route => {
      if (route.meta && route.meta.affix) {
        const tagPath = path.resolve(basePath, route.path);
        tags.push({
          fullPath: tagPath,
          path: tagPath,
          name: route.name,
          meta: { ...route.meta }
        });
      }
      if (route.children) {
        const tempTags = this.filterAffixTags(route.children, route.path);
        if (tempTags.length >= 1) {
          tags = [...tags, ...tempTags];
        }
      }
    });
    return tags;
  }

  // active状态的tag
  private isActive(route: any) {
    return route.path === this.$route.path;
  }

  // 判断是否可以 点击删除
  private isAffix(tag: any) {
    return tag.meta && tag.meta.affix;
  }

  // 删除某个访问记录
  private closeSelectedTag(view) {
    this.storeDelVistedView(view).then(({ visitedViews }) => {
      this.toLastView(visitedViews, view);
    });
  }

  // 跳转到最新路由
  private toLastView(visitedViews, view) {
    // 取最后一个
    const latestView: any = visitedViews.slice(-1)[0];
    // 如果存在，就跳转
    if (latestView) {
      this.$router.push(latestView.fullPath);
    } else {
      // now the default is to redirect to the home page if there is no tags-view,
      // you can adjust it according to your needs.
      if (view.name === 'Dashboard') {
        // to reload home page
        this.$router.replace({ path: '/redirect' + view.fullPath });
      } else {
        this.$router.push('/');
      }
    }
  }

  @Watch('$route')
  private onRouteChange() {
    this.addTags();
  }
}
</script>
