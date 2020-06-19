<template>
  <div class="tags-wrap">
    <el-scrollbar>
      <router-link
        v-for="tag in visitedViews"
        ref="tag"
        :key="tag.path"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
      >
        <el-tag
          :key="tag.name"
          closable
          :type="isActive(tag) ? 'active' : ''"
          @close="!isAffix(tag) ? closeSelectedTag(tag) : ''"
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
import ScrollPane from './ScrollPane.vue';

const storePermission = namespace('permission');
const storeTagsview = namespace('tagsView');

@Component({
  name: 'TagsView',
  components: {
    ScrollPane
  }
})
export default class TagsView extends Vue {
  @storePermission.State('routes') private routes!: object[];
  @storeTagsview.State('visitedViews') private visitedViews!: object[];

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
  filterAffixTags(routes, basePath = '/') {
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
    return route.path === this.$route.path
  }

  @Watch('$route')
  private onRouteChange() {
    this.addTags();
  }
}
</script>

<style lang="scss">
// .scroll {
//   height: 100px;
//   overflow-y: hidden;
// }
.tags-wrap {
  border-bottom: 1px solid #999;
  height:40px;
  padding: 5px 0;
}
.el-scrollbar{
  height: 100%;
  text-align: left;
  .el-tag {
    margin-right: 3px;
  }
  
}
.el-scrollbar__bar{
  &.is-vertical{
    width:100px;//滚动条宽度
  }
}
.el-scrollbar__wrap{
  // overflow-y: auto;
  // overflow-x:hidden;
  overflow: hidden !important;
}
</style>
