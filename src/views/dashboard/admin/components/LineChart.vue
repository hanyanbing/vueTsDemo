<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';

import echarts, { EChartOption } from 'echarts';
import ResizeMixin from '@/components/Charts/mixins/resize';

export interface ILineChartData {
  expectedData: number[];
  actualData: number[];
}

@Component({
  name: 'LineChart',
  mixins: [ResizeMixin]
})
export default class LineChart extends Vue {
  // 混入 (mixin) 提供了一种非常灵活的方式，来分发 Vue 组件中的可复用功能
  @Prop({ required: true }) private chartData!: ILineChartData;
  @Prop({ default: 'chart' }) private className!: string;
  @Prop({ default: '100%' }) private width!: string;
  @Prop({ default: '350px' }) private height!: string;

  private chart: any;

  @Watch('chartData', { deep: true })
  private onChartDataChange(value: ILineChartData) {
    this.setOptions(value);
  }

  private mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
  }

  private beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  }

  private initChart() {
    this.chart = echarts.init(this.$el as HTMLDivElement, 'macarons');
    this.setOptions(this.chartData);
  }

  private setOptions(chartData: ILineChartData) {
    if (this.chart) {
      this.chart.setOption({
        xAxis: {
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: 8
        },
        yAxis: {
          axisTick: {
            show: false
          }
        },
        legend: {
          data: ['expected', 'actual']
        },
        series: [
          {
            name: 'expected',
            itemStyle: {
              color: '#FF005A',
              lineStyle: {
                color: '#FF005A',
                width: 2
              }
            },
            smooth: true,
            type: 'line',
            data: chartData.expectedData,
            animationDuration: 2800,
            animationEasing: 'cubicInOut'
          },
          {
            name: 'actual',
            smooth: true,
            type: 'line',
            itemStyle: {
              color: '#3888fa',
              lineStyle: {
                color: '#3888fa',
                width: 2
              },
              areaStyle: {
                color: '#f3f8ff'
              }
            },
            data: chartData.actualData,
            animationDuration: 2800,
            animationEasing: 'quadraticOut'
          }
        ]
      } as EChartOption<EChartOption.SeriesLine>);
    }
  }
}
</script>
