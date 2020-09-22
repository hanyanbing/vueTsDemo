<template>
  <div class="slot-container">
    <navigation-link :title="'默认插槽'">
      当组件渲染的时候，slot将会被替换为“Your
      Profile”。插槽内可以包含任何模板代码 <br />
      甚至其它的组件: <svg-icon :icon-class="'clipboard'" /> <br />
      如果 navigation-link 的 template 中没有包含一个 slot
      元素，则该组件起始标签和结束标签之间的任何内容都会被抛弃。
    </navigation-link>

    <navigation-link
      :title="'后备内容-->父级组件中不提供任何插槽内容时,后备内容将会被渲染'"
    ></navigation-link>

    <hasname-slot :title="'具名插槽'">
      <template v-slot:header>
        Here might be a page title
      </template>

      <p>没有name属性的default</p>

      <template v-slot:footer>
        Here's some contact info
        <!-- <p>Here's some contact info</p> -->
      </template>
    </hasname-slot>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import navigationLink from './navigationLink.vue';
import hasnameSlot from './hasnameSlot.vue';
@Component({
  components: {
    navigationLink,
    hasnameSlot
  }
})
export default class Guide extends Vue {}
</script>

<style lang="scss" scoped>
.slot-container {
  display: flex;
  flex-flow: column wrap;
  text-align: left;
}
</style>
