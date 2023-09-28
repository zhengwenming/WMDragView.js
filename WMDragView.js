import { TweenLite } from "gsap/TweenMax";
/* 
  注意, head需设置viewport
  实例方法:
  onDrag(coord) // 拖动时触发
  onClick(coord) // 点击时触发
*/

class WMDragView {
  /**
   * @param {HTMLElement,String} domeEle 可传入html元素或元素id
   * @param {Number, String} coordinate.x 初始化x坐标, 数字则默认单位为px, 可选单位'vw'
   * @param {Number, String} coordinate.y 初始化y坐标, 数字则默认单位为px, 可选单位'vh'
   * @param {Number} coordinate.minX minX 可以拖动到的最小x坐标
   * @param {Number} coordinate.minY minY 可以拖动到的最小y坐标
   * @param {Number} coordinate.maxX maxX 可以拖动到的最大x坐标
   * @param {Number} coordinate.maxY maxY 可以拖动到的最大y坐标
   */
  constructor (domEle, coordinate = {}) {
    // 1. 初始化
    // 1.1 初始化状态
    this.readyMove = false // a) 点击浮球触发readeyMove
    this.isMoving = false // b) touchmove && readyMove, 触发isMoveing
    // 1.2 初始化dom元素
    const dom = domEle instanceof HTMLElement ?domEle :document.querySelector(domEle)
    this.dom = dom
    // 1.3 初始化dom样式, 宽高, 屏幕宽高,可拖动范围（由minX、minY、maxX、maxY共同控制）
    dom.style.position = 'fixed'
    dom.style.zIndex = 1000
    this.coord = {}
    this.coord.minX = coordinate.minX?coordinate.minX:0
    this.coord.minY = coordinate.minY?coordinate.minY:0
    this.coord.maxX = coordinate.maxX?coordinate.maxX:window.screen.width-dom.offsetWidth
    this.coord.maxY = coordinate.maxY?(coordinate.maxY-dom.offsetHeight):window.screen.height-dom.offsetHeight

    // 1.4 绑定数据和dom样式
    Object.defineProperties(this.coord, {
      x: {
        configurable: false,
        enumerable: true,
        get: function () {
          return this._x
        },
        set: function (value) {
          if (checkCssLength(value) === 'number'){
            let calcRes = value
            if (calcRes > this.maxX) {
              this._x = this.maxX
            } else if (calcRes < this.minX) {
              this._x = this.minX
            } else {
              this._x = calcRes
            }
            dom.style.left = this._x + 'px'
          } else if (checkCssLength(value) === 'string') {
            dom.style.left = value
            this._x = dom.offsetLeft
          } else {
            console.warn('横坐标类型错误');
            this._x = 0
            dom.style.left = 0
          }
        }
      },
      y: {
        configurable: false,
        enumerable: true,
        get: function () {
          return this._y
        },
        set: function (value) {
          if (checkCssLength(value) === 'number') {
            let calcRes = value
            if (calcRes > this.maxY) {
              this._y = this.maxY
            } else if (calcRes < this.minY) {
              this._y = this.minY
            } else {
              this._y = calcRes
            }
            dom.style.top = this._y + 'px'
          } else if (checkCssLength(value) === 'string') {
            dom.style.top = value
            this._y = dom.offsetTop
          } else {
            console.warn('纵坐标类型错误');
            this._y = 0
            dom.style.top = 0
          }
        }
      }
    })
    // 1.5 初始化坐标
    if (checkCssLength(coordinate.x)) {
      this.coord.x = coordinate.x
    } else {
      this.coord.x = -this.coord.w / 2
    }
    if (checkCssLength(coordinate.y)) {
      this.coord.y = coordinate.y
    } else {
      this.coord.y = 100
    }
    
    // 2. 绑定事件
    dom.addEventListener('touchstart', startHandler.bind(this), false)
    dom.addEventListener('touchmove', moveHandler.bind(this), false)
    window.addEventListener('touchend', endHandler.bind(this), false)
    dom.addEventListener('click', clickHandler.bind(this), false)
  }
  /**
   * 悬浮球贴边
   * 
   */
  _gotoEdge () {
    let config = {}
	return
    // 左半边则贴左, 右半边则贴右
    if (this.coord.x < this.coord.maxX / 2) {//左边
      config =  {x:this.coord.minX, delay:0.2, ease: Quint.easeOut}
    } else {//右边
      config =  {x:this.coord.maxX, delay:0.2, ease: Quint.easeOut}
    }
    // 贴边效果
    TweenLite.to(this.coord, 1, config)
  }
}

function startHandler (event) {
  // 获取初始位置 screenX, screenY
  let sx = event.touches[0].clientX,
  sy = event.touches[0].clientY
  this.deltaX = sx - this.coord.x
  this.deltaY = sy - this.coord.y
  this.readyMove = true
}

function moveHandler (event) {
  event.preventDefault()
  if (this.readyMove) {
    this.isMoving = true
    this.coord.x = event.changedTouches[0].clientX - this.deltaX
    this.coord.y = event.changedTouches[0].clientY - this.deltaY
    //回调给父元素，如果有注册onDrag，那么执行onDrag方法
    this.onDrag && this.onDrag(this.coord)
  } else {
    console.log('not moving');
  }
}

function endHandler (event) {
  if (this.isMoving) {
    this._gotoEdge()
    this.isMoving = false
    this.readyMove= false
  }
}

function clickHandler () {
  if (this.isMoving) return  
  //回调给父元素，如果有注册onClick，那么执行onClick方法
  this.onClick && this.onClick(this.coord)
}

function checkCssLength (val) {
  // 如果是数字, 则返回 'number'
  if (val === +val) {
    return 'number'
  } else if (/^(100|\d{1,2})(\.\d+)?v[wh]$/.test(val)) {
    // 如果是设置vw或者vh, 则返回 'string', 最大只能 '100vw'
    return 'string'
  } else {
    return null
  }
}

export default WMDragView;
