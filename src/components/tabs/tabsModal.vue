/**
* @描述: 带tabs的modal
* @作者: 张俊
* @创建时间: 2021-01-26 15:30:45
*/
<template>
  <a-modal v-model="visible"
           :title="title"
           :footer="null"
           :destroyOnClose="true"
           :maskClosable="false"
           wrapClassName="tabsModalWrap"
           :dialogStyle="{top:0,height: '100%'}"
           :bodyStyle="{height:'calc(100vh - 60px)',padding:0}"
           :width="1240"
           v-bind="$attrs"
           @cancel="cancel">
    <div ref="title" class="padding-lr-sm">
      <slot name="title"></slot>
    </div>
    <a-tabs tabPosition="left"
            v-model="activeKey"
            type="card"
            :tabBarGutter="0"
            :tabBarStyle="{border:0,
            width:'54px',
            borderRight:'4px solid #5A96FA',
            position:'absolute',
            top:0,
            left:'-54px'}"
            @change="handleActiveKeyChange"
            size="large">
      <a-tab-pane v-for="{tab,key},index in tabList" :key="key">
        <template slot="tab">
          <div :style="{zIndex:activeKey===key?tabList.length+1:tabList.length-index}"
               style="position: relative;">
            <div class="bg-img response"
                 :style="{backgroundImage:
                 `url('img/tabs/rectangle1${activeKey===key?'_blue':''}.png')`}"
                 style="background-size: 100% 100%;height: 30px;">
            </div>
            <div class="bg-img response"
                 :style="{backgroundImage:
                 `url('img/tabs/rectangle2${activeKey===key?'_blue':''}.png')`}"
                 style="padding: 0 15px 0 20px;background-size: 100% 100%;height: auto;">
              {{ tab }}
            </div>
            <div class="bg-img response"
                 :style="{backgroundImage:
                 `url('img/tabs/rectangle3${activeKey===key?'_blue':''}.png')`}"
                 style="background-size: 100% 100%;height: 60px;">
            </div>
          </div>
        </template>
        <div class="padding-tb-xs padding-lr-xs" style="height:100%;overflow:auto;">
          <slot :name="key"></slot>
        </div>
      </a-tab-pane>
    </a-tabs>
    <slot></slot>
  </a-modal>
</template>

<script lang="ts">
import {
  Component, Vue, Prop, Emit, Model, Watch,
} from 'vue-property-decorator';
import $ from 'jquery';

export interface TabElement {
  tab: string;
  key: string;
}

@Component({ name: 'TabsModal' })
export default class TabsModal extends Vue {
  // 双向绑定的model
  @Model('change') selectedTab: any;

  // 主题
  @Prop({ type: String, default: '' }) title: string | undefined;

  // tabs
  @Prop({ type: Array, default: () => ([]) }) tabList: TabElement[] | undefined;

  visible = false;

  activeKey = '';

  // 显示modal
  show() {
    this.visible = true;
    const [{ key }] = this.tabList || [];
    this.activeKey = this.selectedTab || key;
    this.handleActiveKeyChange();
  }

  // 关闭回调
  cancel() {
    this.handleClose();
  }

  // 调整tabPanel的样式
  getTabPanelStyle() {
    this.$nextTick(() => {
      const { title } = this.$refs;
      if (title) {
        const height = (title as any).offsetHeight || 0;
        $('.tabsModalWrap .ant-tabs').height(`calc(100% - ${height}px)`);
      }
    });
  }

  @Watch('selectedTab')
  handleSelectedTabChange(newVal: string, oldVal: string) {
    const [{ key }] = this.tabList || [];
    this.activeKey = newVal || key;
  }

  @Emit('change')
  handleActiveKeyChange() {
    this.getTabPanelStyle();
    return this.activeKey;
  }

  @Emit('close')
  handleClose() {
    // 初始化数据
    Object.assign(this.$data, (this.$options.data as any).call(this.$parent));
  }
}
</script>

<style scoped lang="less">
.tabsModalWrap {
  .ant-tabs {
    position: unset;

    /deep/ .ant-tabs-left-content {
      border-left: 0;
      padding: 0;
      height: 100%;

      .ant-tabs-tabpane-active {
        height: 100%;
      }
    }

    /deep/ .ant-tabs-left-bar {
      border-right: 0;

      .ant-tabs-tab-prev {
        color: #fff;
      }

      .ant-tabs-tab-next {
        color: #fff;
      }

      .ant-tabs-tab {
        background-color: transparent;
        //background-image: url("/img/tabs/tabItem_bg.png");
        //background-size: 100% 100%;
        //background-repeat: no-repeat;
        padding: 0;
        width: 60px;
        min-height: 160px;
        height: auto;
        border: 0;
        border-bottom: 0 !important;
        //padding: 20px 20px 70px;
        line-height: 21px;
        white-space: normal;
        overflow: hidden;
        text-overflow: ellipsis;

        &:not(:first-child) {
          margin-top: -35px;
        }

        &:before {
          border: 0;
        }
      }

      .ant-tabs-tab-active {
        margin-right: 1px !important;
        padding-right: 0 !important;

        .bg-img {
          //background-image: url('/img/tabs/tabItem_active_bg.png') !important;
          color: #fff;
        }
      }
    }
  }

  /deep/ .ant-modal-content {
    border-left: 4px solid red !important;
  }
}
</style>
