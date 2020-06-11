<template>
  <div class="dashboard-editor-container">{{ info }}editorContent</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class DashboardAdmin extends Vue {
  private info: any = 'hello, welcome to ';
}
</script>
