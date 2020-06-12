<template>
  <div class="dashboard-container">
    <component :is="currentRole"></component>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State, Getter, namespace } from 'vuex-class';

import adminDashboard from './admin/index.vue';
import editorDashboard from './editor/index.vue';

const storeUser = namespace('user');

@Component({
  components: {
    adminDashboard,
    editorDashboard
  }
})
export default class Dashboard extends Vue {
  @storeUser.State('roles') private roles!: string[];
  private currentRole: string = 'adminDashboard';

  // 如果不包含admin, 加载editorDashboard
  private created() {
    if (!this.roles.includes('admin')) {
      this.currentRole = 'editorDashboard';
    }
  }
}
</script>
