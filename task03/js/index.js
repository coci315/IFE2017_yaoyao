var cities = [{
    text: '北京',
    value: 'beijing'
  },
  {
    text: '天津',
    value: 'tianjin'
  },
  {
    text: '上海',
    value: 'shanghai'
  },
  {
    text: '重庆',
    value: 'chongqing'
  },
];

var schools = {
  beijing: [{
      text: '北京大学',
      value: 'bj'
    },
    {
      text: '清华大学',
      value: 'qh'
    },
    {
      text: '中国人民大学',
      value: 'zgrm'
    },
    {
      text: '北京师范大学',
      value: 'bjsf'
    },
    {
      text: '北京理工大学',
      value: 'bjlg'
    }
  ],
  tianjin: [{
      text: '天津大学',
      value: 'tj'
    },
    {
      text: '南开大学',
      value: 'nk'
    },
    {
      text: '天津医科大学',
      value: 'tjyk'
    },
    {
      text: '天津工业大学',
      value: 'tjgy'
    }
  ],
  shanghai: [{
      text: '复旦大学',
      value: 'fd'
    },
    {
      text: '上海交通大学',
      value: 'shjt'
    },
    {
      text: '同济大学',
      value: 'tjdx'
    },
    {
      text: '华东理工大学',
      value: 'hdlg'
    }
  ],
  chongqing: [{
      text: '重庆大学',
      value: 'cq'
    },
    {
      text: '西南大学',
      value: 'xn'
    },
    {
      text: '重庆工商大学',
      value: 'cqgs'
    },
    {
      text: '西南政法大学',
      value: 'xnzf'
    },
    {
      text: '四川外语学院',
      value: 'scwy'
    }
  ]
};

// 获取下拉选择框节点
var citySelect = document.querySelector('.cities');
var schoolSelect = document.querySelector('.schools');

// 填充选择器
function fillSelect(select, list) {
  select.length = 1;
  for (var i = 0, l = list.length, data; i < l; i++) {
    data = list[i];
    var option = new Option(
      data.text, data.value
    );
    select.add(option);
  }
}

// 给城市选择器注册事件
citySelect.addEventListener('change', function () {
  var value = citySelect.value;
  var list = schools[value] || [];
  fillSelect(schoolSelect, list);
})

// 填充城市选择器
fillSelect(citySelect, cities);