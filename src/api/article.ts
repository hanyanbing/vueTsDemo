import request from '@/utils/request';
import { IArticleData } from './types';

export const defaultArticleData: IArticleData = {
  id: 0,
  status: 'draft',
  title: '',
  fullContent: '',
  abstractContent: '',
  sourceURL: '',
  imageURL: '',
  timestamp: '',
  platforms: ['a-platform'],
  disableComment: false,
  importance: 0,
  author: '',
  reviewer: '',
  type: '',
  pageviews: 0
};

export function fetchList(query) {
  return request({
    url: '/article/list',
    method: 'get',
    params: query
  });
}

export function fetchArticle(id) {
  return request({
    url: '/article/detail',
    method: 'get',
    params: { id }
  });
}

export function fetchPv(pv) {
  return request({
    url: '/article/pv',
    method: 'get',
    params: { pv }
  });
}

export function createArticle(data) {
  return request({
    url: '/article/create',
    method: 'post',
    data
  });
}

export function updateArticle(data) {
  return request({
    url: '/article/update',
    method: 'post',
    data
  });
}

export const getArticles = (params: any) =>
  request({
    url: '/article/list',
    method: 'get',
    params
  });

export const getArticle = (id: number, params: any) =>
  request({
    url: `/articles/${id}`,
    method: 'get',
    params
  });

export const deleteArticle = (id: number) =>
  request({
    url: `/articles/${id}`,
    method: 'delete'
  });

export const getPageviews = (params: any) =>
  request({
    url: '/pageviews',
    method: 'get',
    params
  });
