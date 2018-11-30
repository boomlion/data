(function () {
  var myChart = echarts.init(document.querySelector('.main_info .info_left'));
  // var myChart = echarts.init(document.getElementById('main'));
  option = {
    title: {
      text: '产品销售'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      x: 'center',
      data: ['普洱', '铁观音', '龙井', '白茶', '瓜片']
    },
    radar: [
      {
        indicator: [
          { text: '品牌', max: 100 },
          { text: '内容', max: 100 },
          { text: '可用性', max: 100 },
          { text: '功能', max: 100 }
        ],
        center: ['25%', '40%'],
        radius: 80
      },
      {
        indicator: [
          { text: '口感', max: 100 },
          { text: '质量', max: 100 },
          { text: '手感', max: 100 },
          { text: '醇香', max: 100 },
          { text: '茶渍', max: 100 }
        ],
        radius: 80,
        center: ['50%', '60%'],
      },
      {
        indicator: (function () {
          var res = [];
          for (var i = 1; i <= 12; i++) {
            res.push({ text: i + '月', max: 100 });
          }
          return res;
        })(),
        center: ['75%', '40%'],
        radius: 80
      }
    ],
    series: [
      {
        type: 'radar',
        tooltip: {
          trigger: 'item'
        },
        itemStyle: { normal: { areaStyle: { type: 'default' } } },
        data: [
          {
            value: [60, 73, 85, 40],
            name: '普洱'
          }
        ]
      },
      {
        type: 'radar',
        radarIndex: 1,
        data: [
          {
            value: [85, 90, 90, 95, 95],
            name: '铁观音'
          },
          {
            value: [95, 80, 95, 90, 93],
            name: '龙井'
          }
        ]
      },
      {
        type: 'radar',
        radarIndex: 2,
        itemStyle: { normal: { areaStyle: { type: 'default' } } },
        data: [
          {
            name: '销售量',
            value: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 75.6, 82.2, 48.7, 18.8, 6.0, 2.3],
          },
          {
            name: '好评量',
            value: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 35.6, 62.2, 32.6, 20.0, 6.4, 3.3]
          }
        ]
      }
    ]
  };

  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
})();



(function () {
  var myChart = echarts.init(document.querySelector('.main_info .info_right'));

  option = {
    title: {
      text: '五月份直接访问来源',
      subtext: '小道消息',
      x: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        data: [
          { value: 335, name: '直接访问' },
          { value: 310, name: '邮件营销' },
          { value: 234, name: '联盟广告' },
          { value: 135, name: '视频广告' },
          { value: 1548, name: '搜索引擎' }
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 50,
            shadowOffsetX: 0,
            shadowColor: '#FFD705'
          }
        }
      }
    ]
  };


  myChart.setOption(option);

})()