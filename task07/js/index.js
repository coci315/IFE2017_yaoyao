var data = {
  th: ['姓名', '语文', '数学', '英语', '总分'],
  td: [
    ['小明', 80, 90, 70, 240],
    ['小红', 90, 60, 90, 240],
    ['小亮', 60, 100, 70, 230]
  ]
};

function Table(data, arrColumn) {
  this.data = data;
  this.container = document.createElement('table');
  this.thead = this.container.createTHead();
  this.tbody = this.container.createTBody();
  this._fillThead(this.data.th);
  this._fillTbody(this.data.td);
  arrColumn && this.addSort(arrColumn);
  this._initEvent();
}

Table.prototype = {
  constructor: Table,

  _fillThead: function (data) {
    var row = this.thead.insertRow(0);
    for (var i = 0; i < data.length; i++) {
      var cell = row.insertCell(i);
      cell.dataset.index = i;
      var text = document.createTextNode(data[i]);
      cell.appendChild(text);
    }
  },

  _fillTbody: function (data) {
    for (var i = 0; i < data.length; i++) {
      var row = this.tbody.insertRow(i);
      for (var j = 0; j < data[i].length; j++) {
        var cell = row.insertCell(j);
        var text = document.createTextNode(data[i][j]);
        cell.appendChild(text);
      }
    }
  },

  _emptyTbody: function () {
    this.tbody.innerHTML = '';
  },

  addSort: function (arrColumn) {
    if (!Array.isArray(arrColumn)) {
      throw new Error('param must be an Array type');
    }
    var cells = this.thead.rows[0].cells;
    for (var i = 0; i < arrColumn.length; i++) {
      var num = parseInt(arrColumn[i]);
      cells[num].classList.add('icon_sort');
    }
  },

  // 原型上的默认排序方法，从小到大排列
  _defaultSortMethod: function (a, b) {
    return a[this.sortIndex] - b[this.sortIndex];
  },

  sortData: function () {
    // 暴露一个接口给外部，可以在实例上自定义排序方法，未定义则使用原型上的默认方法
    var sortMethod = this.sortMethod || this._defaultSortMethod;
    // console.log(sortMethod);
    this.data.td.sort(sortMethod.bind(this));
  },

  _initEvent: function () {
    this.thead.addEventListener('click', function (e) {
      if (e.target.classList.contains('icon_sort')) {
        // 在实例上保存index，以便将变量传递给别的函数
        this.sortIndex = e.target.dataset.index;
        this.sortData();
        this._emptyTbody();
        this._fillTbody(this.data.td);
      }
    }.bind(this));
  }
};

var parentEle = document.querySelector('.container');
var table = new Table(data, [1, 2, 3, 4]);

// 在实例上自定义排序方法，从大到小排列
table.sortMethod = function (a, b) {
  return b[this.sortIndex] - a[this.sortIndex];
};

parentEle.appendChild(table.container);