<template>
    <svg :class="svgClass" aria-hidden="true" v-on="$listeners">
      <use :xlink:href="iconName" />
    </svg>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class SvgIcon extends Vue {
  @Prop({
    type: String,
    // required: true
    required: false,
    default: ''
  })
  private iconClass!: string;
  @Prop({
    type: String,
    default: ''
  })
  private className!: string;

  private abc: string = '#icon-guide';

  get iconName() {
    return this.iconClass ? `#icon-${this.iconClass}` : 'http://www.w3.org/2000/svg';
  }
  get svgClass() {
    if (this.className) {
      return 'svg-icon ' + this.className;
    } else {
      return 'svg-icon';
    }
  }
}
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
