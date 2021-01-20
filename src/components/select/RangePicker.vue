/**
* @描述: 自定义时间选择
* @作者: 张俊
* @创建时间: 2021-01-20 16:42:15
*/
<template>
  <a-range-picker
    @ok="handleOk()"
    @change="handleChange"
    style="width: 100%;"
    v-bind="$attrs"
    :show-time="{hideDisabledOptions: true}"
    :value="dates"
    :format="format">
    <a-icon slot="suffixIcon" type="clock-circle"/>
  </a-range-picker>
</template>

<script lang="ts">
import {
  Component, Prop, Model, Emit, Vue, Watch,
} from 'vue-property-decorator';
import Moment from 'moment';

function moment(params?: any) {
  return Moment(...params);
}

@Component({
  name: 'RangePicker',
})
export default class RangePicker extends Vue {
  @Prop({ type: String, default: 'YYYY-MM-DD HH:mm:ss' }) format: string | undefined;

  @Model('ok', {
    type: Array,
    default: () => ([moment().startOf('day'), moment()]),
  }) value: any[] | undefined;

  dates = [];

  @Emit('ok')
  handleOk() {
    return this.dates;
  }

  @Emit('change')
  handleChange(dates: any[]) {
    if (dates.length < 2) {
      this.handleClear();
    } else {
      this.dates = dates;
    }
    return this.dates;
  }

  @Emit('clear')
  handleClear() {
    this.dates = [];
    this.handleOk();
    return [];
  }

  @Watch('value', { immediate: true })
  handleDatesChange(newVal, oldVal) {
    if (newVal !== oldVal) {
      this.dates = [...newVal];
    }
  }
}
</script>

<style scoped>

</style>
