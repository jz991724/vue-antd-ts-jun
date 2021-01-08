/**
* @描述: 多选框
* @作者: 张俊
* @创建时间: 2021-01-07 17:55:14
*/
<template>
  <a-select :dropdownMatchSelectWidth="false"
            :open="isOpen"
            @focus="isOpen = true"
            class="dropdownInput"
            style="width: 120px">
    <a-icon slot="suffixIcon" :type="isOpen? 'up':'down'"></a-icon>
    <a-card slot="dropdownRender"
            :bodyStyle="{padding:'10px'}">
      <div class="flex">
        <a-card :body-style="{width:'200px'}" size="small">
          <!--搜索-->
          <template slot="title">
            <a-input-search style="width: 100%" placeholder="请输入关键字" @change="onSearch"/>
          </template>

          <!--树形展示-->
          <a-tree :expanded-keys="expandedKeys"
                  :auto-expand-parent="autoExpandParent"
                  :tree-data="treeData"
                  v-bind="$attrs"
                  @expand="onExpand">
            <template slot="title" slot-scope="{ title }">
        <span v-if="title.includes(searchValue)">
          {{ title.substr(0, title.indexOf(searchValue)) }}
          <span style="color: #f50">{{ searchValue }}</span>
          {{ title.substr(title.indexOf(searchValue) + searchValue.length) }}
        </span>
              <span v-else>{{ title }}</span>
            </template>
          </a-tree>
        </a-card>

        <a-divider type="vertical" style="height:200px;margin:auto 10px;"/>

        <a-card :body-style="{width:'200px'}" size="small">
          test2
        </a-card>
      </div>

      <div slot="actions" class="justify-end flex">
        <a-button class="margin-right-xs" @click="onBtnClose()">关闭</a-button>
        <a-button type="primary" class="margin-right-xs" @click="onBtnOk()">确定</a-button>
      </div>
    </a-card>
  </a-select>
</template>

<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator';

export interface ReplaceFields {
  children: string;
  title: string;
  key: string;
}

@Component({ name: 'MultipleChoiceBox' })
export default class MultipleChoiceBox extends Vue {
  /* 替换 treeNode 中 title,key,children 字段为 treeData 中对应的字段 */
  // @Prop({
  //   type: Object,
  //   default: () => ({children: 'children', title: 'title', key: 'key'}),
  // }) replaceFields: ReplaceFields | undefined;
  isOpen = false;

  expandedKeys = [];

  searchValue = '';

  autoExpandParent = true;

  treeData = [
    {
      name: 'parent 1',
      key: '0-0',
      child: [
        {
          name: '张晨成',
          key: '0-0-0',
          disabled: true,
          child: [
            { name: 'leaf', key: '0-0-0-0', disableCheckbox: true },
            { name: 'leaf', key: '0-0-0-1' },
          ],
        },
        {
          name: 'parent 1-1',
          key: '0-0-1',
          child: [{ key: '0-0-1-0', name: 'zcvc' }],
        },
      ],
    },
  ];

  // 展开事件
  onExpand(expandedKeys: never[]) {
    this.expandedKeys = expandedKeys;
    this.autoExpandParent = false;
  }

  // 关键字搜索
  onSearch({ target: { value } }: any) {
    debugger;
    this.searchValue = value;
  }

  // 关闭事件
  onBtnClose() {
    this.isOpen = false;
  }

  // 确定
  onBtnOk() {
    this.isOpen = false;
  }
}
</script>

<style scoped>

</style>
