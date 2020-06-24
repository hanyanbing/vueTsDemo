import faker from 'faker';
import Mock from 'mockjs';

const NameList: object[] = [];
const count = 100;
for (let i = 0; i < count; i++) {
  NameList.push(
    Mock.mock({
      name: '@first'
    })
  );
}
NameList.push({ name: 'mock-Pan' });

import { ITransactionData } from '../src/api/types';

const transactionList: ITransactionData[] = [];
const transactionCount = 20;
for (let i = 0; i < transactionCount; i++) {
  transactionList.push({
    orderId: faker.random.uuid(),
    status: faker.random.arrayElement(['success', 'pending']),
    timestamp: faker.date.past().getTime(),
    username: faker.name.findName(),
    price: parseFloat(faker.finance.amount(1000, 15000, 2))
  });
}

export default [
  // username search
  {
    url: '/vue-element-admin/search/user',
    type: 'get',
    response: config => {
      const { name } = config.query;
      const mockNameList = NameList.filter((item: any) => {
        const lowerCaseName = item.name.toLowerCase();
        return !(name && lowerCaseName.indexOf(name.toLowerCase()) < 0);
      });
      return {
        code: 20000,
        data: { items: mockNameList }
      };
    }
  },

  // transaction list
  {
    url: '/transaction/list',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: {
          total: transactionList.length,
          items: transactionList
        }
      };
    }
  }
];
