<template>
  <a-card>
    <multiple-choice-box placeholder="请选择"
                         v-model="value"
                         :bordered="true"
                         :required="true"
                         :tree-data="treeData"></multiple-choice-box>
  </a-card>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';
import MultipleChoiceBox from '@/components/select/MultipleChoiceBox.vue';

@Component({
  name: 'Main',
  components: { MultipleChoiceBox },
})
export default class Main extends Vue {
  value = ['黎明-01', '黎明-02'];

  treeData: any[] = [
    {
      title: '四大天王',
      key: 'root',
      children: [
        {
          title: '张学友',
          key: '张学友',
          children: [
            { key: '张学友-01', title: '张学友1' },
            {
              key: '张学友-02',
              title: '张学友2',
              children: [
                {
                  key: '张学友-02-01',
                  title: '张学友2-01',
                },
              ],
            }],
        },
        {
          title: '黎明',
          key: '黎明',
          children: [
            { title: '黎明1', key: '黎明-01' },
            { title: '黎明2', key: '黎明-02' },
          ],
          // scopedSlots: { title: 'title' },
        },
        {
          title: '刘德华',
          key: '刘德华',
          children: [{ key: '刘德华-01', title: '刘德华1' }],
        },
        {
          title: '郭富城',
          key: '郭富城',
          children: [
            { key: '郭富城-01', title: '郭富城1' },
            { key: '郭富城-02', title: '郭富城2' }],
        },
      ],
    },
  ];
}
</script>

<style scoped>

</style>
