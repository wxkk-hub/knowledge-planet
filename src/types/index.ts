export interface Author {
  avatar: string
  name: string
}

export interface Content {
  id: string
  title: string
  summary: string
  coverUrl: string
  category: string
  author: Author
  price: number
  content: string
  previewContent: string
  readCount: number
  likeCount: number
  publishDate: string
  isFree: boolean
}

export interface User {
  phone: string
  nickName: string
  avatarUrl: string
  purchasedIds: string[]
  favoriteIds: string[]
  historyIds: string[]
}

export interface Comment {
  id: string
  contentId: string
  author: string
  avatar: string
  text: string
  time: string
  likes: number
}