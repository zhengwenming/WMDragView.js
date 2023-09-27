# WMDragView.js
可以自由拖拽的悬浮view，可配置初始化位置和可以自由拖动的范围

1、引入
import WMDragView from "../../utils/WMDragView.js";

2、创建dom容器
```javascript
<div id="ball" style="width:100px;height:100px;background-color:aqua;border-radius:50%;"></div>
```

3、初始化，并配置x（WMDragView初始化的x坐标点）、y（MDragView初始化的y坐标点）、minY(WMDragView可以活动到达的最小Y值，默认0)、maxY(WMDragView可以活动到达的最大Y值，默认全屏高度)、minX（WMDragView可以活动到达的左边最小的x坐标值）、maxX（WMDragView可以活动到达的右边最大的x坐标值）
注意：如果不能拖动，放到nextTick回调中进行初始化
```javascript
mounted () {
    this.dragview = new WMDragView('ball', {x:200,y: 200,minY: 10})
    this.dragview.onClick = function (coord) {
    }
    this.dragview.onDrag = function (coord) {
    }
  }
```

# TweenLite 笔记
> TweenLite是一个非常快速、轻量级和灵活的动画工具，是GreenSock动画平台（GSAP）的基础。可以单独使用，体积很小, 简单易用

## 引入方式
安装 `gsap`
```bash
npm i gsap --save
```
引入 `TweenLite`
```javascript
import { TweenLite } from "gsap/TweenMax"
```

## 使用方式
TweenLite.to( target:Object, duration:Number, vars:Object )
- target: 目标对象
- duration: 时间(秒)
- vars: 定义每个属性的最终值的对象, 也包含一些特殊配置[详见官网](https://greensock.com/docs/TweenLite/static.to)
```javascript
var obj = {x: 0, y: 0}
TweenLite.to(obj, 1, {x: 100, delay: 3}) // obj在等待3秒后, x在1s内变为100 => {x: 100, y: 0}
```
