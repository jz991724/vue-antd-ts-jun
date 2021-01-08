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
          <a-tree checkable
                  :expanded-keys="expandedKeys"
                  :auto-expand-parent="autoExpandParent"
                  :tree-data="treeData"
                  v-bind="$attrs"
                  :checkedKeys="value"
                  @check="handleTreeNodeCheck"
                  @expand="onExpand">
            <template slot="title" slot-scope="{ title }">
              <div v-if="title.includes(searchValue)" class="flex">
                {{ title.substr(0, title.indexOf(searchValue)) }}
                <div style="color: #f50">{{ searchValue }}</div>
                {{ title.substr(title.indexOf(searchValue) + searchValue.length) }}
              </div>
              <div v-else>{{ title }}</div>
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

import {
  Component, Emit, Model, Prop, Vue,
} from 'vue-property-decorator';

export interface TreeNode {
  children: TreeNode[];
  title: string;
  key: string;
}

@Component({ name: 'MultipleChoiceBox' })
export default class MultipleChoiceBox extends Vue {
  @Model('check', { type: Array, default: () => ([]) }) value: string[] | number[] | undefined;

  checkedKeys: any[] = this.value || [];

  isOpen = false;

  expandedKeys = [];

  searchValue = '';

  autoExpandParent = true;

  // 所有的叶子结点
  allLeaves: any[] = [];

  treeData: any[] = [
    {
      title: 'parent 1',
      key: '0-0',
      scopedSlots: { title: 'title' },
      children: [
        {
          title: '张晨成',
          key: '0-0-0',
          disabled: true,
          children: [
            { title: 'leaf', key: '0-0-0-0', disableCheckbox: true },
            { title: 'leaf', key: '0-0-0-1' },
          ],
          scopedSlots: { title: 'title' },
        },
        {
          title: 'parent 1-1',
          key: '0-0-1',
          children: [{ key: '0-0-1-0', title: 'zcvc' }],
          scopedSlots: { title: 'title' },
        },
        {
          title: 'parent 1-2',
          key: '0-0-2',
          children: [{ key: '0-0-2-0', title: 'zcvc111' }],
          scopedSlots: { title: 'title' },
        },
      ],
    },
  ];

  // 展开事件
  onExpand(expandedKeys: never[]) {
    this.expandedKeys = expandedKeys;
    this.autoExpandParent = false;
  }

  // 将treeNodes转化成Array和获得所有子节点
  generateList(treeNodes: TreeNode[], dataList: { key: string; title: string }[] = [],
    allLeaves: { key: string; title: string }[] = []) {
    treeNodes.forEach(({ key, children, title }) => {
      dataList.push({ key, title });
      if (children) {
        this.generateList(children, dataList, allLeaves);
      } else {
        allLeaves.push({ key, title });
      }
    });

    return { dataList, allLeaves };
  }

  // 获取parentKey
  getParentKey(key: string, treeNodes: TreeNode[]) {
    let parentKey;
    treeNodes.forEach((node) => {
      if (node.children) {
        if (node.children.some((item) => item.key === key)) {
          parentKey = node.key;
        } else if (this.getParentKey(key, node.children)) {
          parentKey = this.getParentKey(key, node.children);
        }
      }
    });

    return parentKey;
  }

  // 关键字搜索
  onSearch({ target: { value } }: any) {
    const treeNodes = [...this.treeData];
    const { dataList, allLeaves } = this.generateList(treeNodes);
    this.allLeaves = allLeaves;
    const expandedKeys = dataList.map((item) => {
      if (item.title?.includes(value)) {
        const parentKey = this.getParentKey(item.key, treeNodes);
        return parentKey;
      }
      return null;
    }).filter((item, i, self) => item && self.indexOf(item) === i);

    Object.assign(this, {
      expandedKeys,
      searchValue: value,
      autoExpandParent: true,
    });
  }

  // 关闭事件
  onBtnClose() {
    this.isOpen = false;
  }

  // 确定
  onBtnOk() {
    this.isOpen = false;
  }

  @Emit('check')
  handleTreeNodeCheck(checkedKeys: string[] | number[] | undefined = []) {
    debugger;
    this.checkedKeys = checkedKeys;
    return checkedKeys || [];
  }
}
</script>

<style scoped>

</style>
