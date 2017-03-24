// var UP = 0;
// var RIGHT = 1;
// var DOWN = 2;
// var LEFT = 3;
var SIZE = 60;
var DIRECTS = ['GO', 'TUN LEF', 'TUN RIG', 'TUN BAC'];
/**
 * 
 * 
 * @param {String} selector 
 * @param {Object} options 
 */
function Cube(selector, options) {
  this.node = document.querySelector(selector);
  this.options = options || {};
  this.x = this.options.x || 6;
  this.y = this.options.y || 6;
  this.direction = this.options.direction || 0;
  this.rotate = this.direction * 90;
  this._setRotate();
  this._setPos();
  this.node.style.display = 'block';
}

Cube.prototype = {
  constructor: Cube,

  _setRotate: function () {
    this.node.style.transform = 'rotate(' + (this.rotate) + 'deg)';
  },

  _setPos: function () {
    this.node.style.left = (this.x - 1) * SIZE + 'px';
    this.node.style.top = (this.y - 1) * SIZE + 'px';
  },

  _checkXY: function () {
    if (this.x < 1) {
      this.x = 1;
    } else if (this.x > 10) {
      this.x = 10;
    }
    if (this.y < 1) {
      this.y = 1;
    } else if (this.y > 10) {
      this.y = 10;
    }
  },

  _checkDirection: function () {
    if (this.direction < 0) {
      this.direction += 4;
    } else if (this.direction >= 4) {
      this.direction %= 4;
    }
  },

  _setDirection: function (direction) {
    switch (direction) {
      case 'TUN LEF':
        this.direction -= 1;
        this.rotate -= 90;
        this._checkDirection();
        break;
      case 'TUN RIG':
        this.direction += 1;
        this.rotate += 90;
        this._checkDirection();
        break;
      case 'TUN BAC':
        this.direction += 2;
        this.rotate += 180;
        this._checkDirection();
        break;
      default:
        return;
    }
  },

  _setXY: function () {
    switch (this.direction) {
      case 0:
        this.y -= 1;
        this._checkXY();
        break;
      case 1:
        this.x += 1;
        this._checkXY();
        break;
      case 2:
        this.y += 1;
        this._checkXY();
        break;
      case 3:
        this.x -= 1;
        this._checkXY();
        break;
    }
  },

  orderSetDirection: function (direction) {
    this._setDirection(direction);
    this._setRotate();
  },

  orderSetPos: function () {
    this._setXY();
    this._setPos();
  }
}

// 实例化小方块
var cube = new Cube('.container .cube');

// 获取输入框节点以及执行按钮节点
var textInput = document.querySelector('.directive input');
var execBtn = document.querySelector('.directive button');

// 注册事件
execBtn.addEventListener('click', function () {
  var direct = textInput.value.trim();
  if (DIRECTS.indexOf(direct) > -1) {
    if (direct === 'GO') {
      cube.orderSetPos();
    } else {
      cube.orderSetDirection(direct);
    }
  } else {
    alert('请输入有效的指令');
  }
})