import Mock from 'mockjs'
import mocks from './mocks'

// const MOCK_API_BASE = '/mock'

mocks.forEach( mock => Mock.mock(new RegExp(mock.url+'*'),mock.type, mock.response));