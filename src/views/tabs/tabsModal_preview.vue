/**
* @描述: tabsModal组件预览
* @作者: 张俊
* @创建时间: 2021-01-26 15:47:12
*/
<template>
  <div>
    <a-button type="primary" @click="showModal">显示TabModal组件</a-button>

    <tabs-modal ref="tabsModal"
                v-model="activeTabKey"
                :title="modelTitle"
                :tab-list="tabs">
      <!--基本信息-->
      <a-card slot="jbxx"
              :bordered="false"
              :bodyStyle="{padding:0}"
              :headStyle="{padding:0,border:0}">
        <h1>基本信息：这个就是一个tab页的content</h1>
      </a-card>

      <!--家庭信息-->
      <a-card slot="jtxx"
              :bordered="false"
              :bodyStyle="{padding:0}"
              :headStyle="{padding:0,border:0}">
        <h1>家庭信息：这个就是一个tab页的content</h1>
      </a-card>

      <!--学历信息-->
      <a-card slot="xlxx"
              :bordered="false"
              :bodyStyle="{padding:0}"
              :headStyle="{padding:0,border:0}">
        <h1>学历信息：这个就是一个tab页的content</h1>
      </a-card>
    </tabs-modal>
  </div>
</template>

<script lang="ts">
import {
  Component, Mixins, Prop, Watch, Vue,
} from 'vue-property-decorator';
import TabsModal from '@/components/tabs/tabsModal.vue';

@Component({
  name: 'TabsModalPreview',
  components: { TabsModal },
})
export default class TabsModalPreview extends Vue {
  tabs = [
    { tab: '基本信息', key: 'jbxx' },
    { tab: '家庭信息', key: 'jtxx' },
    { tab: '学历信息', key: 'xlxx' },
  ];

  activeTabKey = 'jtxx';

  modelTitle = '个人简历';

  showModal() {
    const { tabsModal } = this.$refs;
    if (tabsModal) {
      (tabsModal as any).show();
    }
  }

  mounted() {
    debugger;
    this.showModal();
  }
}
</script>

<style scoped>

</style>
