<template>
  <div style="padding-bottom:30px;">
    <span>
      <slot v-bind:parentuse="user">
        {{ user.lastName }}
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
  private user = {
    firstName: 'yan',
    lastName: 'han'
  };
}
</script>
