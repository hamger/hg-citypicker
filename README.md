# hg-citypicker

![build](https://travis-ci.org/hamger/hg-citypicker.svg?branch=master)
![NPM](https://img.shields.io/npm/l/hg-citypicker.svg?color=orange)
[![npm](https://img.shields.io/npm/v/hg-citypicker.svg?color=blue)](https://www.npmjs.com/package/hg-citypicker)

移动端的地区选择器，适用于选择嵌套类型的数据。具有很好的适应性，可以在任何前端框架中使用。

> 这里是 2.x 的文档，1.x 文档请点击[这里](https://github.com/hamger/hg-citypicker/tree/v1.x)。

## Demo

[点击这里跳转到演示页面](https://hamger.github.io/hg-citypicker/)，请在移动端打开或者使用浏览器移动端调试工具打开。

## Install

- yarn 下载：`yarn add hg-citypicker`
- npm 下载：`npm install --save hg-citypicker`
- CND 地址：
  - js：`https://unpkg.com/hg-citypicker/dist/hg-citypicker.js`
  - css：`https://unpkg.com/hg-citypicker/picker.css`

## Usage

### 在 vue 等框架中使用

```vue
<template>
  <div @click="select">选择地区</div>
</template>
<script>
import "hg-citypicker/picker.css";
import CityPicker from "hg-citypicker";

export default {
  data() {
    return {
      picker: null
    };
  },
  methods: {
    select() {
      this.picker.show();
    }
  },
  mounted () {
    this.picker = new CityPicker({
      data: city,
      onOk: function(arr) {
        console.log(arr);
      }
    });
  },
  beforeDestroy() {
    this.picker.destroy();
  }
};
</script>
```

> 组件销毁时需要销毁 CityPicker 实例，防止内存溢出

> 如果数据是请求来的，实例化写在请求成功后的回调中

### 在传统页面中使用

```html
<head>
  <link
    rel="stylesheet"
    type="text/css"
    href="https://unpkg.com/hg-citypicker/picker.css"
  />
  <script src="https://unpkg.com/hg-citypicker/dist/hg-citypicker.js"></script>
</head>
<body>
  <div onclick="select(1)">选择地区</div>
  <script>
    var picker = new CityPicker({
      data: city, // 符合格式的数组
      onOk: function(arr) {
        console.log(arr);
      }
    });
    window.select = function(number) {
      picker.show();
    };
  </script>
</body>
```

### data 配置项的合法值

`data`选项接受的数据格式如下，其中的键名`value`和`child`可以根据实际需要通过配置项`valueKey`和`childKey`设置

```js
var city = [
  {
    value: "北京",
    child: [{ value: "东城区" }, { value: "西城区" }]
  },
  {
    value: "广东",
    child: [
      {
        value: "广州",
        child: [{ value: "越秀区" }, { value: "荔湾区" }]
      }
    ]
  }
];
```

由于考虑到各种复杂的情况，返回的结果数据比较全面。例如你选择了`广东-广州-越秀区`，成功的回调函数中会接收如下形式的数组

```js
[
  {
    value: "广东",
    child: [
      {
        value: "广州",
        child: [{ value: "越秀区" }, { value: "荔湾区" }]
      }
    ]
  },
  {
    value: "广州",
    child: [{ value: "越秀区" }, { value: "荔湾区" }]
  },
  {
    value: "越秀区"
  }
];
```

调用实例方法 show 呼起选择器，完整案例见[这里](https://github.com/hamger/hg-citypicker/blob/master/index.html)。

## 配置项

`configuration`是一个配置项的对象，可以接受如下选项：

| key           | value           | description                                                                                   |
| ------------- | --------------- | --------------------------------------------------------------------------------------------- |
| data          | Array\<Object\> | 符合格式的数组，必填                                                                          |
| initValue | Array\<String\> | 规定初始显示的选项，选填                                                                      |
| valueKey      | String          | 需要展示的数据的键名，默认`value`                                                             |
| childKey      | String          | 子数据的键名，默认`child`                                                                     |
| onOk          | Function        | 确定后的回调函数，返回一个结果数组，必填                                                      |
| cancel        | Function        | 点击取消按钮或者背景后的回调函数，选填                                                        |
| title         | String          | 选择器标题，默认为空                                                                          |
| okText        | String          | 确定按钮文本，默认为“确定”                                                                    |
| cancelText    | String          | 取消按钮文本，默认为“取消”                                                                    |
| a             | Number          | 惯性滚动加速度（正数, 单位 px/(ms \* ms)），规定滚动阻力，加速度越小缓冲距离越长，默认`0.001` |
| style         | Object          | 包含样式配置的对象                                                                            |

`style`对象可以接受如下选项（以下配置项若仍无法满足需求，可自行修改并引入`picker.css`）：

| key             | value  | description                         |
| --------------- | ------ | ----------------------------------- |
| liHeight        | Number | 每一个选择栏的高度（px），默认 `40` |
| btnHeight       | Number | 按钮栏的高度（px），默认 `44`       |
| btnOffset       | String | 按钮离边框的距离，默认 `20px`       |
| titleColor      | String | 选择器标题的字体颜色                |
| sureColor       | String | 选择器确定按钮的字体颜色            |
| cancelColor     | String | 选择器取消按钮的字体颜色            |
| btnBgColor      | String | 选择器按钮栏的背景颜色              |
| contentColor    | String | 选择器选择区域的文字颜色            |
| contentBgColor  | String | 选择器选择区域的背景颜色            |
| upShadowColor   | String | 选择器顶部朦层颜色                  |
| downShadowColor | String | 选择器底部朦层颜色                  |
| lineColor       | String | 选择器分隔线颜色                    |

## 实例方法

| function  | param      | description    |
| --------- | ---------- | -------------- |
| show()    | `--`       | 呼起选择框     |
| hide()    | `--`       | 关闭选择框     |
| set(obj)  | obj:Object | 设置选择器属性 |
| get(key)  | key:String | 获取选择框属性 |
| destroy() | `--`       | 销毁选择器     |

> 参数 obj 中指定`title`、`cancelText`、`okText`、`valueKey`、`childKey`、`a`、`onOk`、`onCancel`、`initValue`的值，会修改对应的选择器配置

## Change Log

### 2020.3.25

> v2.1.0 实现选择器销毁的实例方法，配置项 initialOption 变更为 initValue

### 2019.6.29

> v2.0.0 使用 ES6 重构项目 & 添加实例方法 set、get
