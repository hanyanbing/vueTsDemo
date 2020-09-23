<template>
  <div style="padding-bottom:30px;">
    <strong>{{title}}</strong>: <br>
    <slot>这是子组件中的后备内容</slot>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  name: 'NavigationLink'
})
export default class extends Vue {
  @Prop({ default: 'CN' }) private title!: string;
}
</script>
