<template>
  <el-dropdown
    trigger="click"
    class="international"
    @command="handleSetLanguage"
  > 
    <div>
      <svg-icon :icon-class="'language'" class="international-icon" />
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item :disabled="language === 'zh'" command="zh">
        中文
      </el-dropdown-item>
      <el-dropdown-item :disabled="language === 'en'" command="en">
        English
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State, Getter, Mutation, Action, namespace } from 'vuex-class';

const storeApp = namespace('app');

@Component
export default class LangSelect extends Vue {
  @storeApp.State('language') private language!: string;
  @storeApp.Action('setLanguage') private setLanguage: any;

  // 切换语言
  private handleSetLanguage(lang: string) {
    this.$i18n.locale = lang;

    this.setLanguage(lang);
    this.$message({
      message: 'Switch Language Success',
      type: 'success'
    });
  }
}
</script>
