export const THEME = {
  primary: '#333333',
  secondary: '#666666',
  auxiliary: '#999999',
  background: '#F5F5F5',
  accent: '#FF6835',
  success: '#4CAF50',
} as const

export const CATEGORIES = ['全部', '学习方法', '人工智能', '自我管理', '投资理财', '职场成长'] as const

export const APP = {
  name: '知识星球',
  description: '知识付费内容平台',
  maxWidth: '768px',
  demoCode: '123456',
  pageSize: 12,
} as const

export type Category = typeof CATEGORIES[number]
