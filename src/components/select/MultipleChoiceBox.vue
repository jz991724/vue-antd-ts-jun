/**
* @描述: 多选框
* @作者: 张俊
* @创建时间: 2021-01-07 17:55:14
*/
<template>
  <a-popover trigger="click" v-bind="$attrs" v-model="isOpen" :disabled="loading">
    <a-button :type="bordered?'default':'link'">
      <template v-if="getCheckedNodeNames.length>0">
        <div class="flex" style="display: inline-flex;" :class="{'text-black-65':!bordered}">
          <div v-for="(name,index) in getCheckedNodeNames"
               :key="index">
            <div v-if="maxShowCount>index" class="flex">
              <div :style="{maxWidth:`${maxSelectedOptionTextLength*20}px`}" class="text-cut">
                {{ name }}
              </div>
              <div v-if="index+1<getCheckedNodeNames.length">
                ,
              </div>
            </div>

            <div v-else-if="index+1===getCheckedNodeNames.length">
              +{{ getCheckedNodeNames.length - maxShowCount }}
            </div>
          </div>
        </div>
      </template>

      <template v-else>{{ placeholder || '请选择' }}</template>

      <a-icon :type="loading?'loading':(isOpen? 'up':'down')" class="margin-left-xs"/>
    </a-button>

    <a-card slot="content" :bodyStyle="{padding:'10px'}">
      <div class="flex">
        <a-card :body-style="{width:'300px',maxHeight:'400px',overflow:'auto'}"
                size="small">
          <template v-if="treeData.length>0">
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
                <div v-if="searchValue&&title.indexOf(searchValue)>-1" class="flex">
                  {{ title.substr(0, title.indexOf(searchValue)) }}
                  <div class="text-red">{{ searchValue }}</div>
                  {{ title.substr(title.indexOf(searchValue) + searchValue.length) }}
                </div>
                <div v-else>{{ title }}</div>
              </template>
            </a-tree>
          </template>

          <a-empty description="暂无数据" v-else/>
        </a-card>

        <a-divider type="vertical" style="height:200px;margin:auto 10px;"/>

        <a-card :body-style="{width:'300px',maxHeight:'400px',overflow:'auto'}" size="small">
          <div v-if="checkedKeys.length>0&&treeData.length>0" class="response">
            <template v-for="{title,key} in getAllTags">
              <a-tag closable
                     @close="onTagClose(key)"
                     :key="key"
                     class="text-cut"
                     style="margin:5px;">
                {{ title || '' }}
              </a-tag>
            </template>
          </div>

          <a-empty description="暂无数据" v-else/>
        </a-card>
      </div>

      <div slot="actions" class="justify-end flex">
        <a-button class="margin-right-xs" @click="onBtnClose()">取消</a-button>
        <a-button type="primary"
                  :disabled="required&&checkedKeys.length<1"
                  class="margin-right-xs"
                  @click="onBtnOk()">
          确定
        </a-button>
      </div>
    </a-card>
  </a-popover>
</template>

<script lang="ts">

import {
  Component, Emit, Model, Prop, Vue, Watch,
} from 'vue-property-decorator';

export interface TreeNode {
  children: TreeNode[];
  title: string;
  key: string;
  scopedSlots?: Record<string, any>;
}

@Component({ name: 'MultipleChoiceBox' })
export default class MultipleChoiceBox extends Vue {
  // 树形备选树
  @Prop({ type: Array, default: () => ([]) }) treeData: TreeNode[] | undefined;

  @Model('check', { type: Array, default: () => ([]) }) value: string[] | number[] | undefined;

  // 是否需要border
  @Prop({ type: Boolean, default: true }) bordered: boolean | undefined;

  // 是否正在加载treeData
  @Prop({ type: Boolean, default: false }) loading: boolean | undefined;

  // placeholder
  @Prop({ type: String, default: '请选择' }) placeholder: string | undefined;

  // 最多显示的"选中项"数量
  @Prop({ type: Number, default: 2 }) maxShowCount: number | undefined;

  // 最大显示的"选中项"文本长度
  @Prop({ type: Number, default: 5 }) maxSelectedOptionTextLength: number | undefined;

  // 是否必填
  @Prop({ type: Boolean, default: false }) required: boolean | undefined;

  checkedKeys: any[] = [];

  isOpen = false;

  expandedKeys = [];

  searchValue = '';

  autoExpandParent = true;

  // 所有的叶子节点
  allLeaves: { key: string; title: string }[] = [];

  // 所有节点的数组，不是树形结构
  treeNodeList: { key: string; title: string }[] = [];

  // 最后提交的结果
  result: string[] | number[] | undefined = [];

  get getCheckedNodeNames() {
    const { allLeaves, result } = this;
    return allLeaves.filter(({ key, title }) => (result as any).includes(key))
      .map((node) => node.title);
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
    treeNodes.forEach((node: TreeNode) => {
      const { key, children, title } = node;
      dataList.push({ key, title });
      if (children) {
        this.generateList(children, dataList, allLeaves);
      } else {
        allLeaves.push({ key, title });
      }

      // 用于搜索
      // eslint-disable-next-line no-param-reassign
      node.scopedSlots = { title: 'title' };
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
      if (item.title?.indexOf(value) > -1) {
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
  onCheckTreeNode(checkedKeys: string[] = []) {
    const allLeavesKeyList: string[] = (this.allLeaves || []).map((item) => item.key);
    this.checkedKeys = allLeavesKeyList.filter((key) => key && checkedKeys.includes(key));
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
    const treeNodes = this.treeData || [];
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

      Object.assign(this, {
        checkedKeys: this.value,
        expandedKeys: this.value,
        autoExpandParent: true,
      });
    }
  }

  @Watch('treeData', { deep: true, immediate: true })
  handleTreeChange(newVal: TreeNode[], oldVal: any) {
    if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
      this.init();
    }
  }

  @Watch('value', { deep: true, immediate: true })
  handleValueChange(newVal: string[] | number[] | undefined, oldVal: any) {
    if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
      this.result = newVal;
    }
  }
}
</script>

<style scoped lang="less">
.borderless-select {
  /deep/ .ant-select-selection {
    border: 0;
  }
}
</style>
