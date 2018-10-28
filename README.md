# hg-citypicker
![build passed](https://img.shields.io/badge/build-passed-brightgreen.svg)
![licence MIT](https://img.shields.io/badge/licence-MIT-orange.svg)

移动端的地区选择器，适用于选择嵌套类型的数据。

## Demo
![hg-citypicker png](http://olislpb6q.bkt.clouddn.com/hg-citypicker2.png)

[点击这里可跳转到演示页面](https://hamger.github.io/citypicker/)，请在移动端打开或者使用浏览器移动端调试工具打开。

## Install
* npm下载：`npm install hg-citypicker`
* Github下载：[下载地址](https://github.com/hamger/hg-citypicker)

## Usage
首先引入文件
```html
<link rel="stylesheet" type="text/css" href="./picker.css" />
<script src="./citypicker.js"></script>
```
实例化地区选择器`new CityPicker(configuration)`
```js
var cityPicker = new CityPicker({
    inputId: 'city-input', // 触发选择的元素ID
    data: city, // 符合格式的数组
    success: function(arr) { // 回调函数
        console.log(arr);
    }
});
```

如果你使用构建工具，可以这样引入
```js
import 'hg-citypicker/picker.css';
import CityPicker from 'hg-citypicker';
```
在`vue`中实例化插件，如果数据是请求来的，实例化写在请求成功后的回调中
```js
var cityPicker = null
...
mounted () {
    this.$nextTick(() => {
        cityPicker = new CityPicker({
            inputId: 'city-input',
            data: city,
            success: function(arr) {
                console.log(arr);
            }
        });
    });
}
```
`data`选项接受的数据格式如下，其中的键名`value`和`child`可以根据实际需要通过配置项`valueKey`和`childKey`设置
```js
var city = [{
  value: "北京",
  child: [{value: "东城区"}, {value: "西城区"}]
}, {
  value: "广东",
  child: [{
    value: "广州",
    child: [{value: "越秀区"}, {value: "荔湾区"}]
  }
}]
```
由于考虑到各种复杂的情况，返回的结果数据比较全面。如果你只需要选中的数据，只需要获取数组每项的`value`（该字段可自定义）属性值即可。例如你选择了`广东-广州-越秀`，成功的回调函数中会接收如下形式的数组
```js
[{
  value: "广东",
  child: [{
    value: "广州",
    child: [{value: "越秀区"}, {value: "荔湾区"}]
  }
},{
  value: "广州",
  child: [{value: "越秀区"}, {value: "荔湾区"}
},{
  value: "越秀区"
}]
```
## 配置项
`configuration`是一个配置项的对象，可以接受如下选项：

key | value | description
--------|------|-----
inputId | String | 目标DOM元素ID，必填
data | Array\<Object\> | 符合格式的数组，必填
initialOption | Array\<String\> | 规定初始显示的选项，选填
valueKey | String | 需要展示的数据的键名，默认`value`
childKey | String | 子数据的键名，默认`child`
success | Function  |  确定后的回调函数，返回一个结果数组，必填
cancel | Function  |  点击取消按钮或者背景后的回调函数，选填
beforeShow | Function | 规定选择框呼起前的逻辑，选填
title | String | 选择器标题，默认为空
sureText | String | 确定按钮文本，默认为“确定”
cancelText | String | 取消按钮文本，默认为“取消”
a | Number | 惯性滚动加速度（正数, 单位 px/(ms * ms)），规定滚动阻力，加速度越小缓冲距离越长，默认`0.001`
style | Object | 包含样式配置的对象

`style`对象可以接受如下选项（以下配置项若仍无法满足需求，可自行修改并引入`picker.css`）：

key | value | description
--------|------|-----
liHeight | Number | 每一个选择栏的高度（px），默认 `40`
btnHeight | Number | 按钮栏的高度（px），默认 `44`
btnOffset | String | 按钮离边框的距离，默认 `20px`
titleColor | String | 选择器标题的字体颜色
sureColor | String | 选择器确定按钮的字体颜色
cancelColor | String | 选择器取消按钮的字体颜色
btnBgColor | String | 选择器按钮栏的背景颜色
contentColor | String | 选择器选择区域的文字颜色
contentBgColor | String | 选择器选择区域的背景颜色
upShadowColor | String | 选择器顶部朦层颜色
downShadowColor | String | 选择器底部朦层颜色
lineColor | String | 选择器分隔线颜色

## 实例方法
function | param | description
-------- | ------ | -----
cityPicker.forbidSelect(status) | status: `true`/`false` | 是否禁用选择框，`true`表示禁用，`false`表示不禁用，禁用状态下 beforeShow 回调依然会执行
cityPicker.setInitailOption(initialOption) | initialOption: Array\<String\> | 变更初始显示的选项，若找不到匹配项，提示`Uncaught Error: The matching initailOption cannot be found`

## Changelog
### 2018.8.18
> v1.2.4 * 修改 readme 内容

### 2018.6.17
> v1.2.3 * 删除压缩文件

### 2018.6.16
> v1.2.2 * 添加实例方法 setInitailOption

> v1.2.0 * 添加实例方法 forbidSelect ，添加 initialOption 配置项，修复选择器隐藏时依然触发 cancel 回调的问题

### 2018.6.15
> v1.1.0 * 添加 boforeShow 配置项

### 2018.4.11
> v1.0.0 * 修改项目文件结构

### 2018.2.21
> v0.2.10 * 添加地区选择器简介

### 2018.1.17
> v0.2.9 * 添加js和css压缩文件

### 2018.1.16
> v0.2.7 * 取消滑动阈值配置

### 2018.1.15
> v0.2.4 * 取消定位配置，采用底部上滑显示

### 2018.1.14
> v0.1.16 * 添加使用说明和API配置说明

### 2018.1.3
> v0.1.12 * 创建地区选择器
