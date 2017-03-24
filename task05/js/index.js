// var UP = 0;
// var RIGHT = 1;
// var DOWN = 2;
// var LEFT = 3;
var SIZE = 60;
// var DIRECTS = ['GO', 'TUN LEF', 'TUN RIG', 'TUN BAC'];
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

  DIRECTIONS_CODE: {
    'TOP': 0,
    'RIG': 1,
    'BOT': 2,
    'LEF': 3
  },

  ORDERS: ['GO', 'TUN LEF', 'TUN RIG', 'TUN BAC', 'TRA LEF', 'TRA TOP', 'TRA RIG', 'TRA BOT', 'MOV LEF', 'MOV TOP', 'MOV RIG', 'MOV BOT'],

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
      case 'LEF':
        this.direction -= 1;
        this.rotate -= 90;
        this._checkDirection();
        break;
      case 'RIG':
        this.direction += 1;
        this.rotate += 90;
        this._checkDirection();
        break;
      case 'BAC':
        this.direction += 2;
        this.rotate += 180;
        this._checkDirection();
        break;
      default:
        return;
    }
  },

  _toDirection: {
    LEF: function () {
      switch (this.direction) {
        case 0:
          this._setDirection('LEF');
          break;
        case 1:
          this._setDirection('BAC');
          break;
        case 2:
          this._setDirection('RIG');
          break;
        case 3:
          break;
      }
    },

    TOP: function () {
      switch (this.direction) {
        case 0:
          break;
        case 1:
          this._setDirection('LEF');
          break;
        case 2:
          this._setDirection('BAC');
          break;
        case 3:
          this._setDirection('RIG');
          break;
      }
    },

    RIG: function () {
      switch (this.direction) {
        case 0:
          this._setDirection('RIG');
          break;
        case 1:
          break;
        case 2:
          this._setDirection('LEF');
          break;
        case 3:
          this._setDirection('BAC');
          break;
      }
    },

    BOT: function () {
      switch (this.direction) {
        case 0:
          this._setDirection('BAC');
          break;
        case 1:
          this._setDirection('RIG');
          break;
        case 2:
          break;
        case 3:
          this._setDirection('LEF');
          break;
      }
    },
  },

  _setXY: function (direction) {
    switch (direction) {
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

  parseOrder: function (order) {
    if (this.ORDERS.indexOf(order) > -1) {
      if (order === 'GO') {
        this._setXY(this.direction);
        this._setPos();
      } else {
        var order = order.split(' ');
        if (order[0] === 'TUN') {
          this._setDirection(order[1]);
          this._setRotate();
        } else if (order[0] === 'TRA') {
          this._setXY(this.DIRECTIONS_CODE[order[1]]);
          this._setPos();
        } else if (order[0] === 'MOV') {
          this._toDirection[order[1]].call(this);
          this._setRotate();
          this._setXY(this.direction);
          this._setPos();
        }
      }
    } else {
      throw new Error('not a valid directive');
    }
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
  try {
    cube.parseOrder(direct);
  } catch (e) {
    alert('请输入有效的指令');
  }
})