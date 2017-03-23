! function () {
  // @param String type ['name','password','passwordConfirm','mail','phone']
  function Input(type) {
    this.type = type;
    var className = '.' + type + '_input';
    // 获取节点
    this.nodeContainer = document.querySelector(className);
    this.nodeLabel = this.nodeContainer.querySelector('label');
    this.nodeInput = this.nodeContainer.querySelector('input');
    this.nodeText = this.nodeContainer.querySelector('p');
    // 保存初始提示文字
    this.initText = this.nodeText.innerText;
    // 初始化事件
    this._initEvent();
  }

  Input.prototype = {
    constructor: Input,

    _pw: '',

    _processResult: function (text, className) {
      this.nodeContainer.classList.remove('error', 'correct');
      this.nodeContainer.classList.add(className);
      this.nodeText.innerText = text;
    },

    _showText: function () {
      this.nodeText.style.display = 'block';
    },

    _hideText: function () {
      this.nodeText.style.display = 'none';
    },

    _getLength: function () {
      this.inputStr = this.nodeInput.value.trim();
      var len = 0;
      for (var i = 0; i < this.inputStr.length; i++) {
        if (this.inputStr.charCodeAt(i) > 255) {
          len += 2;
        } else {
          len++;
        }
      }
      return len;
    },

    _validateVoid: function () {
      var len = this._getLength();
      if (len === 0) {
        this._processResult(this.nodeLabel.innerText + '不能为空', 'error');
        return false;
      } else {
        return len;
      }
    },

    _validate: {
      name: function () {
        var result = this._validateVoid();
        if (result) {
          if (result >= 4 && result <= 16) {
            this._processResult('名称格式正确', 'correct');
            return true;
          } else {
            this._processResult('姓名长度必须为4-16位', 'error');
            return false;
          }
        } else {
          return false;
        }
      },

      password: function () {
        var result = this._validateVoid();
        if (result) {
          if (result >= 6 && result <= 22) {
            if (/^([A-Z]|[a-z]|[0-9]|[`~!@#$%^&*()+=|{}':;',\\[\\].<>){6,22}$/.test(this.inputStr)) {
              this._processResult('密码可用', 'correct');
              this.__proto__.pw = this.inputStr;
              return true;
            } else {
              this._processResult('密码必须为6-22位的英文数字字符', 'error');
              return false;
            }
          } else {
            this._processResult('密码长度必须为6-22位', 'error');
            return false;
          }
        } else {
          return false;
        }
      },

      passwordConfirm: function () {
        var result = this._validateVoid();
        if (result) {
          if (this.pw === this.inputStr) {
            this._processResult('密码输入一致', 'correct');
            return true;
          } else {
            this._processResult('密码输入不一致', 'error');
            return false;
          }
        } else {
          return false;
        }
      },

      mail: function () {
        var result = this._validateVoid();
        if (result) {
          if (/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(this.inputStr)) {
            this._processResult('邮箱格式正确', 'correct');
            return true;
          } else {
            this._processResult('邮箱格式错误', 'error');
            return false;
          }
        } else {
          return false;
        }
      },

      phone: function () {
        var result = this._validateVoid();
        if (result) {
          if (/^1(3\d|4[579]|5[012356789]|7[0135678]|8\d)\d{8}$/.test(this.inputStr)) {
            this._processResult('手机格式正确', 'correct');
            return true;
          } else {
            this._processResult('手机格式错误', 'error');
            return false;
          }
        } else {
          return false;
        }
      }

    },

    _initEvent: function () {
      this.nodeInput.addEventListener('focus', this._showText.bind(this));
      this.nodeInput.addEventListener('blur', this._validate[this.type].bind(this));
    }
  };


  // 获取提交按钮节点
  var btnSubmit = document.querySelector('.btn_submit');

  // 实例化Input类
  var arrType = ['name', 'password', 'passwordConfirm', 'mail', 'phone'];
  var objInput = {};
  for (var i = 0; i < arrType.length; i++) {
    var type = arrType[i];
    objInput[type] = new Input(type);
  }

  // 添加提交按钮点击事件
  btnSubmit.addEventListener('click', function () {
    var result = (function () {
      var result = true;
      for (var i = 0; i < arrType.length; i++) {
        var type = arrType[i];
        result = objInput[type]._validate[type].call(objInput[type]) && result;
      }
      return result;
    })();
    if (result) {
      alert('提交成功');
    } else {
      alert('提交失败');
    }
  });
}();