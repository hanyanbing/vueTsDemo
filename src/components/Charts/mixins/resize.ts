import { ECharts } from 'echarts';
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'ResizeMixin'
})
export default class Resize extends Vue {
  protected chart!: ECharts | null;
  private sidebarElm?: Element;

  private mounted() {
    this.initResizeEvent();
    this.initSidebarResizeEvent();
  }

  private beforeDestroy() {
    this.destroyResizeEvent();
    this.destroySidebarResizeEvent();
  }

  private activated() {
    this.initResizeEvent();
    this.initSidebarResizeEvent();
  }

  private deactivated() {
    this.destroyResizeEvent();
    this.destroySidebarResizeEvent();
  }

  private chartResizeHandler() {
    if (this.chart) {
      this.chart.resize();
    }
  }

  private sidebarResizeHandler(e: TransitionEvent) {
    if (e.propertyName === 'width') {
      this.chartResizeHandler();
    }
  }

  private initResizeEvent() {
    if (this.chartResizeHandler) {
      window.addEventListener('resize', this.chartResizeHandler);
    }
  }

  private destroyResizeEvent() {
    if (this.chartResizeHandler) {
      window.removeEventListener('resize', this.chartResizeHandler);
    }
  }

  private initSidebarResizeEvent() {
    this.sidebarElm = document.getElementsByClassName('sidebar-container')[0];
    if (this.sidebarElm) {
      this.sidebarElm.addEventListener(
        'transitionend',
        this.sidebarResizeHandler as EventListener
      );
    }
  }

  private destroySidebarResizeEvent() {
    if (this.sidebarElm) {
      this.sidebarElm.removeEventListener(
        'transitionend',
        this.sidebarResizeHandler as EventListener
      );
    }
  }
}
