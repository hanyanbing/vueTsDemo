<template>
  <div  style="padding-bottom:30px;">
    <strong>{{title}}</strong>：
    <header>
      <strong>header：</strong>
      <slot name="header"></slot>
    </header>
    <br>
    <main>
      <strong>default</strong>:  <br>
       一个不带 name 的 slot 出口会带有隐含的名字“default”，
      任何没有被包裹在带有 v-slot 的 template 中的内容都会被视为默认插槽的内容
      <slot></slot>
    </main>
    <footer>
      <strong>footer：</strong>
      <slot name="footer"></slot>
    </footer>
    <br>
    <strong>Tips: v-slot 只能添加在 template 上</strong>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  name: 'HasnameSlot'
})
export default class extends Vue {
  @Prop({ default: 'CN' }) private title!: string;
}
</script>
