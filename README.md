# 自定义组件库

## 下拉

- ### 多选
  - #### **MultipleChoiceBox（***下拉多选选择框***）**
    ### API
    ##### Props
    | 属性 | 说明 | 类型 | 默认值 |
    | :----: | :---- | :---- | :---- |
    | treeData | 提供选择的数据源 | Array<{children,title,key,[scopedSlots]}> | [] |
    | value(v-model) | 指定当前选中的条目 | string[]\number[]\undefined | undefined |
    | bordered | 是否无边框 | boolean | true |
    | loading | 加载状态（异步获取treeData情况下使用） | boolean | true |
    | placeholder | 没有选择数据情况下的提示 | string | "请选择" |
    | maxShowCount | 最多显示的"选中项"数量 | number | 2 |
    | maxSelectedOptionTextLength | 最大显示的"选中项"文本长度 | number | 2 |
    | required | value不能为空，至少需要选择一项 | boolean | false |
    ##### Events
    | 事件名称 | 说明 | 回调参数 |
    | :----: | :---- | :---- |
    | check | 选中时调用，参数为选中项的value值 | function(value) |
    ##### Option props
    | 属性 | 说明 | 类型 | 默认值 |
    | :----: | :---- | :---- | :---- |
    | title | 备选项显示的title | string | - |
    | key | 备选项的唯一值 | string | - |
    | children | 树形结构下，当前节点的子节点,叶子节点情况下可以为空 | Array<{children,title,key,[scopedSlots]}> | - |
    | scopedSlots | 使用treeData时，可以通过该属性配置支持slot的属性，如scopedSlots:{title:'xxx'} | object | - |
       
    ### 代码演示
    ###### html
    ``` html
    <multiple-choice-box placeholder="请选择"
                             v-model="value"
                             :bordered="true"
                             :required="true"
                             :tree-data="treeData"></multiple-choice-box>
    ```
    
    ###### javascript
    ``` javascript
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
    ```
    
  - #### **RangePicker（***时间选择***）**
    ### API
    ##### Props
    | 属性 | 说明 | 类型 | 默认值 |
    | :----: | :---- | :---- | :---- |
    | format | 展示的日期格式 | string | "YYYY-MM-DD HH:mm:ss" |
    ##### Events
    | 事件名称 | 说明 | 回调参数 |
    | :----: | :---- | :---- |
    | ok | 点击确定按钮的回调 | function(dates: [moment, moment] | [string, string]) |
    | change | 日期范围发生变化的回调 | function(dates: [moment, moment] | [string, string], dateStrings: [string, string]) |
    | clear | 日期范围清空后的回调 | - | - |
               
    ### 代码演示
    ###### html
    ``` html
    <range-picker style="width:200px;" v-model="dates"></range-picker>
    ```
    
    ###### javascript
    ``` javascript
    dates = ['2021-01-03T08:51:22.384Z', '2021-02-25T08:51:22.384Z'];
    ```
   
## tabs切换

- ### 弹出框
  - #### **TabsModal（***tabs切换的modal***）**
    ### API
    ##### Props
    | 属性 | 说明 | 类型 | 默认值 |
    | :----: | :---- | :---- | :---- |
    | title | 标题 | string|slot | - |
    | selectedTab(v-model) | 当前激活 tab 面板的 key | string | 无 |
    | tabList | 需要展示的所有的tab | Array<{tab:string,key:string}> | [] |
    
    ***注意***：tabPanel可以通过tab的key值，***slot="xxx"*** 自定义添加
    
    ##### Events
    | 事件名称 | 说明 | 回调参数 |
    | :----: | :---- | :---- |
    | change | 切换面板的回调 | function(activeKey) {} |
    | close | 关闭modal的回调 | function() |
    ##### Tab props
    | 属性 | 说明 | 类型 | 默认值 |
    | :----: | :---- | :---- | :---- |
    | title | tab标题 | string | - |
    | key | tab的唯一值 | string | - |
    
    ### 代码演示
    ###### html
    ``` html
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
    ```
    
    ###### javascript
    ``` javascript
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
    ```
    
