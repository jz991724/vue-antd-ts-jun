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
    <template slot="placeholder">
      <div class="text-cut">{{ getCheckedNodeNames }}</div>
    </template>

    <a-icon slot="suffixIcon" :type="isOpen? 'up':'down'"></a-icon>
    <a-card slot="dropdownRender"
            :bodyStyle="{padding:'10px'}">
      <div class="flex">
        <a-card :body-style="{width:'200px',maxHeight:'400px',overflow:'auto'}" size="small">
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
                  :checkedKeys="checkedKeys"
                  @check="onCheckTreeNode"
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

        <a-card :body-style="{width:'200px',maxHeight:'400px',overflow:'auto'}" size="small">
          <div style="width:100%;">
            <template v-for="{title,key} in getAllTags">
              <a-tag closable @close="onTagClose(key)" :key="key" style="margin:5px;">
                {{ title || '' }}
              </a-tag>
            </template>
          </div>
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
  Component, Emit, Model, Prop, Vue, Watch,
} from 'vue-property-decorator';

export interface TreeNode {
  children: TreeNode[];
  title: string;
  key: string;
}

@Component({ name: 'MultipleChoiceBox' })
export default class MultipleChoiceBox extends Vue {
  @Model('check', { type: Array, default: () => ([]) }) value: string[] | number[] | undefined;

  checkedKeys: any[] = [];

  isOpen = false;

  expandedKeys = [];

  searchValue = '';

  autoExpandParent = true;

  // 所有的叶子结点
  allLeaves: { key: string; title: string }[] = [];

  treeNodeList: { key: string; title: string }[] = [];

  treeData: any[] = [
    {
      title: '四大天王',
      key: 'root',
      scopedSlots: { title: 'title' },
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
          scopedSlots: { title: 'title' },
        },
        {
          title: '黎明',
          key: '黎明',
          children: [
            { title: '黎明1', key: '黎明-01' },
            { title: '黎明2', key: '黎明-02' },
          ],
          scopedSlots: { title: 'title' },
        },
        {
          title: '刘德华',
          key: '刘德华',
          children: [{ key: '刘德华-01', title: '刘德华1' }],
          scopedSlots: { title: 'title' },
        },
        {
          title: '郭富城',
          key: '郭富城',
          children: [
            { key: '郭富城-01', title: '郭富城1' },
            { key: '郭富城-02', title: '郭富城2' }],
          scopedSlots: { title: 'title' },
        },
      ],
    },
  ];

  // 最后提交的结果
  result: string[] | number[] | undefined = [];

  get getCheckedNodeNames() {
    const { allLeaves } = this;
    const { result } = this;
    return allLeaves.filter(({ key, title }) => result?.includes(key)).map((node) => node.title).join(',');
  }

  get getAllTags() {
    const checkedKeys = this.checkedKeys || [];
    return this.allLeaves?.filter(({ key }) => checkedKeys.includes(key));
  }

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
  getParentKey(key: string | number, treeNodes: TreeNode[]) {
    let parentKey: string | number = '';
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
  onSearch({ target: { value } }: any, treeNodes = this.treeData || []) {
    const expandedKeys = this.treeNodeList?.map((item) => {
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

  // 选择树节点
  onCheckTreeNode(checkedKeys = []) {
    // eslint-disable-next-line max-len
    this.checkedKeys = [...this.allLeaves].map((item) => item.key).filter((key) => key && checkedKeys.includes(key));
  }

  // 关闭事件
  onBtnClose() {
    this.isOpen = false;
  }

  // 确定
  onBtnOk() {
    this.result = [...this.checkedKeys];
    this.handleTreeNodeCheck(this.result);
    this.isOpen = false;
  }

  // 关闭tag
  onTagClose(removeKey: string | number) {
    this.checkedKeys = this.checkedKeys.filter((key) => key !== removeKey);
  }

  // 初始化
  init() {
    const treeNodes = [...this.treeData];
    const { dataList, allLeaves } = this.generateList(treeNodes);

    Object.assign(this, {
      allLeaves,
      treeNodeList: dataList,
      checkedKeys: this.value,
      expandedKeys: this.value,
      result: this.value,
      autoExpandParent: true,
    });
  }

  mounted() {
    this.init();
  }

  @Emit('check')
  // eslint-disable-next-line class-methods-use-this
  handleTreeNodeCheck(value: string[] | number[] | undefined) {
    return value;
  }

  @Watch('isOpen', { immediate: true })
  handleIsOpenChange(newVal: boolean, oldVal: boolean) {
    if (newVal !== oldVal && newVal) {
      // 重新初始化
      // Object.assign(this.$data, this.$options.data());
      this.init();
    }
  }
}
</script>

<style scoped>

</style>
