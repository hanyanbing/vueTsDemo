// const Mock = require('mockjs');
import Mock from 'mockjs';

const List: any = [];
const count = 10;

const baseContent =
  '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>';
const imageUri =
  'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3';

for (let i = 0; i < count; i++) {
  List.push(
    Mock.mock({
      'id': '@increment',
      'timestamp': +Mock.Random.date('T'),
      'author': '@first',
      'reviewer': '@first',
      'title': '@title(5, 10)',
      'content_short': 'mock data',
      'content': baseContent,
      'forecast': '@float(0, 100, 2, 2)',
      'importance': '@integer(1, 3)',
      'type|1': ['CN', 'US', 'JP', 'EU'],
      'status|1': ['published', 'draft'],
      'display_time': '@datetime',
      'comment_disabled': true,
      'pageviews': '@integer(300, 5000)',
      'image_uri': imageUri,
      'platforms': ['a-platform']
    })
  );
}

export default [
  {
    url: '/articles',
    type: 'get',
    response: () => {
      return {
        code: 20000,
        data: {
          total: List.length,
          items: List
        }
      };
    }
  },

  {
    url: '/article/detail',
    type: 'get',
    response: (config: any) => {
      const { id } = config.query;
      for (const article of List) {
        if ((article as any).id === +id) {
          return {
            code: 20000,
            data: article
          };
        }
      }
    }
  },

  {
    url: '/article/pv',
    type: 'get',
    response: () => {
      return {
        code: 20000,
        data: {
          pvData: [
            { key: 'PC', pv: 1024 },
            { key: 'mobile', pv: 1024 },
            { key: 'ios', pv: 1024 },
            { key: 'android', pv: 1024 }
          ]
        }
      };
    }
  },

  {
    url: '/article/create',
    type: 'post',
    response: () => {
      return {
        code: 20000,
        data: 'success'
      };
    }
  },

  {
    url: '/article/update',
    type: 'post',
    response: () => {
      return {
        code: 20000,
        data: 'success'
      };
    }
  }
];
