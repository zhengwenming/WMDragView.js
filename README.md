# WMDragView.js
可以自由拖拽的悬浮view，可配置初始化位置和可以自由拖动的范围

## 1、引入
```javascript
import WMDragView from "../../utils/WMDragView.js";
```
## 2、安装gsap动画库(安装2.0.2版本)
安装 `gsap`
```bash
npm i gsap@2.0.2
```

## 3、创建可自由拖动的dom容器。
```javascript
<div id="ball" style="width:100px;height:100px;background-color:aqua;border-radius:50%;"></div>
```

## 4、初始化，并配置x、y、minY、maxY、minX、maxX。
x（WMDragView初始化的x坐标点）、
y（MDragView初始化的y坐标点）、
minY(WMDragView可以活动到达的最小Y值，默认0)、
maxY(WMDragView可以活动到达的最大Y值，默认全屏高度)、
minX（WMDragView可以活动到达的左边最小的x坐标值）、
maxX（WMDragView可以活动到达的右边最大的x坐标值）

```javascript
mounted () {
    this.dragview = new WMDragView('.ball', {x:200,y: 200,minY: 10})
    this.dragview.onClick = function (coord) {
    }
    this.dragview.onDrag = function (coord) {
    }
  }
```

⚠️PS：如果不能拖动，请将初始化代码放到nextTick回调中

