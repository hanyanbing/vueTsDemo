<template>
  <div class="slot-container">
    <default-slot :title="'默认插槽'">
      当组件渲染的时候，slot将会被替换为“Your
      Profile”。插槽内可以包含任何模板代码 <br />
      甚至其它的组件: <svg-icon :icon-class="'clipboard'" /> <br />
      如果 default-slot 的 template 中没有包含一个 slot
      元素，则该组件起始标签和结束标签之间的任何内容都会被抛弃。
    </default-slot>

    <default-slot
      :title="'后备内容-->父级组件中不提供任何插槽内容时,后备内容将会被渲染'"
    ></default-slot>


    <!-- 具名插槽 -->
    <hasname-slot :title="'具名插槽'">
      <template v-slot:header>
        Here might be a page title
      </template>

      <p>没有name属性的default</p>
      <!-- || -->
      <!-- || -->  
      <!-- 等价于 -->
      <template v-slot:default>
        <p>没有name属性的default</p>
      </template>

      <template v-slot:footer>
        Here's some contact info
        <!-- <p>Here's some contact info</p> -->
      </template>
    </hasname-slot>
    

    <!-- 作用域插槽 -->
    <strong>作用域插槽:</strong>
    <span>可以让父级调用组件时，插槽内容能够访问子组件中才有的数据</span>
    <area-slot>
      <!-- slotProps  自定义名字 -->
      <!-- parentuse  子组件中定义的 -->
      <template v-slot:default="slotProps">
        {{ slotProps.parentuse.firstName }}
      </template>
    </area-slot>

    <strong>第二种写法：</strong>
    <area-slot v-slot:default="slotProps">
      <span>
        在上述情况下，当被提供的内容只有默认插槽时，组件的标签才可以被当作插槽的模板来使用。
        这样我们就可以把 v-slot 直接用在组件上：
      </span>
      {{ slotProps.parentuse.firstName }}
    </area-slot>

    <strong>第三种写法：</strong>
    <span>
      在上述情况下，当被提供的内容只有默认插槽时，组件的标签才可以被当作插槽的模板来使用。
      这样我们就可以把 v-slot 直接用在组件上：
    </span>
    <area-slot v-slot:default="slotProps">
      {{ slotProps.parentuse.firstName }}
    </area-slot>

    <strong>注意默认插槽的缩写语法不能和具名插槽混用，因为它会导致作用域不明确; 
      只要出现多个插槽，请始终为所有的插槽使用完整的基于 template 的语法：</strong>
    <area-many-slot>
      <template v-slot:parentuse="slotProps">
        {{ slotProps.parentuse.firstName }}
      </template>
      <template v-slot:otherslot="slotProps">
        {{ slotProps.otherslot.firstName }}
      </template>
    </area-many-slot>

    <h4>v-slot 的值实际上可以是任何能够作为函数定义中的参数的 JavaScript 表达式。
      所以在支持的环境下 (单文件组件或现代浏览器)，
      你也可以使用 ES2015 解构来传入具体的插槽 prop，如下</h4>
    <area-slot v-slot="{ parentuse }">
      {{ parentuse.firstName }}
    </area-slot>

    <strong>在该插槽提供了多个 prop 的时候。它同样开启了 prop 重命名等其它可能</strong>
    <area-slot v-slot="{ parentuse: person }">
      {{ person.firstName }}
    </area-slot>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import defaultSlot from './defaultSlot.vue';
import hasnameSlot from './hasnameSlot.vue';
import areaSlot from './areaSlot.vue';
import areaManySlot from './areaManySlot.vue';

@Component({
  components: {
    defaultSlot,
    hasnameSlot,
    areaSlot,
    areaManySlot
  }
})
export default class Guide extends Vue {}
</script>

<style lang="scss" scoped>
.slot-container {
  display: flex;
  flex-flow: column wrap;
  text-align: left;
  padding: 30px;
}
</style>
