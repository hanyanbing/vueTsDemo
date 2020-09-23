<template>
  <div style="padding-bottom:30px;">
    <span>
      <slot v-bind:parentuse="user">
        {{ user.lastName }}
      </slot>

      <slot v-bind:otherslot="user1">
        {{ user1.lastName }}
      </slot>
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  name: 'areaSlot'
})
export default class extends Vue {
  @Prop({ default: 'CN' }) private title!: string;
  private user = {
    firstName: 'yan',
    lastName: 'han'
  };

  private user1 = {
    firstName: 'yan1',
    lastName: 'han1'
  };
}
</script>
