import type { Content, Comment } from '../types'

export const categories = ['全部', '学习方法', '人工智能', '自我管理', '投资理财', '职场成长']

export const mockContents: Content[] = [
  {
    id: '1',
    title: '如何高效搭建个人知识体系：从输入到输出的完整方法论',
    summary: '在这个信息爆炸的时代，构建个人知识体系已成为核心竞争力。本文从信息获取、整理、内化到输出，分享一套经过验证的完整方法论。',
    coverUrl: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=400&h=300&fit=crop',
    category: '学习方法',
    author: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=zhang', name: '张弛' },
    price: 29.9,
    content: `
      <h2>为什么你需要知识体系？</h2>
      <p>在信息爆炸的时代，我们每天被动接收的信息量相当于15世纪一个人一生接收的信息总量。没有知识体系的人，就像在没有地图的森林中漫无目的地行走。</p>
      <h2>第一步：建立信息输入管道</h2>
      <p>高效的知识体系始于高质量的信息输入。你需要建立自己的信息过滤机制：</p>
      <ul>
        <li><strong>精选信息源</strong>：关注行业顶尖的3-5个信息源，而非广撒网</li>
        <li><strong>主题阅读</strong>：围绕一个主题，集中阅读多本书籍和文章</li>
        <li><strong>主动搜索</strong>：带着问题去搜索，而不是被动接受推送</li>
      </ul>
      <p>我个人的实践是使用RSS订阅+Newsletter组合，每天早晚各花30分钟处理信息。这种方式不仅高效，而且能确保信息的质量。</p>
      <h2>第二步：信息整理与分类</h2>
      <p>收集信息只是第一步，如何整理才是关键。我推荐使用「卡片笔记法」：</p>
      <ul>
        <li>每张卡片只记录一个核心观点</li>
        <li>用自己的话重新表述</li>
        <li>标注信息来源和关联索引</li>
        <li>定期回顾和重组卡片</li>
      </ul>
      <p>工具方面，Notion、Obsidian都是不错的选择。但我更推荐 Obsidian，因为它的本地存储和双向链接特性更符合长期知识管理的需求。</p>
    `,
    previewContent: '在这个信息爆炸的时代，构建个人知识体系已成为核心竞争力。本文从信息获取、整理、内化到输出，分享一套经过验证的完整方法论...',
    readCount: 2847,
    likeCount: 356,
    publishDate: '2025-12-15',
    isFree: false
  },
  {
    id: '2',
    title: 'ChatGPT 提示词工程进阶：让 AI 输出高质量内容的 10 个技巧',
    summary: '掌握提示词工程是 AI 时代的核心技能。本文分享从基础到进阶的提示词技巧，帮助你大幅提升 AI 输出质量。',
    coverUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop',
    category: '人工智能',
    author: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=li', name: '李明远' },
    price: 19.9,
    content: '',
    previewContent: '掌握提示词工程是 AI 时代的核心技能。本文将分享从角色设定、上下文构建到输出格式控制的完整提示词框架...',
    readCount: 5621,
    likeCount: 892,
    publishDate: '2025-12-20',
    isFree: false
  },
  {
    id: '3',
    title: '时间管理 2.0：用「精力管理」取代「时间管理」',
    summary: '时间管理的本质不是管理时间，而是管理精力。本文介绍一套基于精力周期的日程安排方法，让你每天高效工作6小时胜过别人12小时。',
    coverUrl: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&h=300&fit=crop',
    category: '自我管理',
    author: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=wang', name: '王晓峰' },
    price: 0,
    content: '<h2>传统时间管理的误区</h2><p>我们习惯把一天切割成若干时间块，然后往里面塞任务。但人的精力不是线性分布的——上午9点和下午3点的你，完全不是同一个人。</p><p>真正高效的人不是在管理时间，而是在管理精力。</p>',
    previewContent: '',
    readCount: 3902,
    likeCount: 567,
    publishDate: '2025-11-28',
    isFree: true
  },
  {
    id: '4',
    title: '机器学习入门完全指南：从零开始构建你的第一个模型',
    summary: '零基础也能学会机器学习！本文用最通俗的语言讲解核心概念，并带你用 Python 构建第一个分类模型。',
    coverUrl: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop',
    category: '人工智能',
    author: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=chen', name: '陈思远' },
    price: 39.9,
    content: '',
    previewContent: '很多人觉得机器学习高不可攀，但其实掌握核心概念后，你也能快速上手。本文将从什么是机器学习讲起...',
    readCount: 7234,
    likeCount: 1023,
    publishDate: '2026-01-05',
    isFree: false
  },
  {
    id: '5',
    title: '深度阅读的力量：一年读 100 本书的秘密',
    summary: '不是读得快就叫阅读，读得深才是本事。本文分享如何从「快速浏览」升级到「深度阅读」的方法。',
    coverUrl: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=300&fit=crop',
    category: '学习方法',
    author: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lin', name: '林小曼' },
    price: 0,
    content: '<h2>什么是深度阅读？</h2><p>深度阅读不是指读得慢，而是指读的时候与文本发生深度交互。你会不断提问、联想、批判、重构。</p><p>一本好书读一遍，胜过十本畅销书翻一遍。</p>',
    previewContent: '',
    readCount: 2156,
    likeCount: 432,
    publishDate: '2025-12-08',
    isFree: true
  },
  {
    id: '6',
    title: 'Python 自动化办公实战：30 个提升效率的脚本',
    summary: '告别重复劳动！30 个即学即用的 Python 脚本，覆盖文件处理、数据清洗、邮件发送等高频办公场景。',
    coverUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop',
    category: '人工智能',
    author: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=zhao', name: '赵凯' },
    price: 49.9,
    content: '',
    previewContent: '如果你每天还在手动处理 Excel、批量修改文件、群发邮件，那么这 30 个脚本将彻底改变你的工作方式...',
    readCount: 4567,
    likeCount: 678,
    publishDate: '2026-01-12',
    isFree: false
  },
  {
    id: '7',
    title: '如何培养「原子习惯」？从改变 1% 开始',
    summary: '微小的改变如何带来巨大的结果？本文结合行为心理学，教你设计一套可持续的习惯养成系统。',
    coverUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop',
    category: '自我管理',
    author: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sun', name: '孙悦' },
    price: 0,
    content: '<h2>原子习惯的核心原理</h2><p>每天进步 1%，一年后你会变成原来的 37 倍。这就是原子习惯的力量——微小但持续的改变，最终带来质变。</p>',
    previewContent: '',
    readCount: 5432,
    likeCount: 789,
    publishDate: '2025-11-15',
    isFree: true
  },
  {
    id: '8',
    title: '定投指数基金：普通人最稳妥的理财方式',
    summary: '不用研究 K 线，不用盯盘，定投指数基金是巴菲特都推荐的普通人理财方式。本文手把手教你如何开始。',
    coverUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop',
    category: '投资理财',
    author: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=huang', name: '黄磊' },
    price: 0,
    content: '<h2>为什么推荐指数基金？</h2><p>股神巴菲特在公开场合多次推荐普通人定投指数基金。原因很简单：长期来看，很少有主动管理基金能跑赢指数。</p>',
    previewContent: '',
    readCount: 6789,
    likeCount: 934,
    publishDate: '2025-12-01',
    isFree: true
  },
  {
    id: '9',
    title: 'GTD 工作法实战：打造不焦虑的任务管理系统',
    summary: '事情太多记不住？GTD 工作法教你如何把大脑从「存储模式」切换到「思考模式」。附 Notion 模板。',
    coverUrl: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&h=300&fit=crop',
    category: '自我管理',
    author: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=liu', name: '刘强' },
    price: 14.9,
    content: '',
    previewContent: 'GTD（Getting Things Done）是全球最流行的个人管理方法论之一。它的核心理念是把所有待办事项从大脑中清空...',
    readCount: 3245,
    likeCount: 456,
    publishDate: '2026-01-20',
    isFree: false
  },
  {
    id: '10',
    title: '学会提问：批判性思维入门',
    summary: '比答案更重要的，是会提问。本文带你掌握批判性思维的核心框架，成为独立思考者。',
    coverUrl: 'https://images.unsplash.com/photo-1456324463128-7ff69039888d?w=400&h=300&fit=crop',
    category: '学习方法',
    author: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=wu', name: '吴思远' },
    price: 0,
    content: '<h2>为什么提问比答案更重要？</h2><p>好的问题能打开新的思考维度，而答案往往只是关闭了一个问题。学会提问，你就掌握了学习的主动权。</p>',
    previewContent: '',
    readCount: 1890,
    likeCount: 345,
    publishDate: '2025-10-25',
    isFree: true
  },
  {
    id: '11',
    title: '从零搭建个人博客：Next.js + Tailwind CSS 完整教程',
    summary: '手把手教你用当下最热门的技术栈搭建一个漂亮的个人博客，支持 Markdown、评论、SEO 优化。',
    coverUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop',
    category: '人工智能',
    author: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=zhou', name: '周鹏' },
    price: 0,
    content: '<h2>技术选型</h2><p>Next.js 14 + Tailwind CSS + MDX + Vercel 部署，这套组合是目前搭建个人博客的最佳实践。</p>',
    previewContent: '',
    readCount: 4123,
    likeCount: 567,
    publishDate: '2026-02-01',
    isFree: true
  },
  {
    id: '12',
    title: '职场沟通力：让每一次对话都产生价值的底层逻辑',
    summary: '沟通不是为了说赢对方，而是为了达成共识。本文分享职场高效沟通的 5 个核心原则和实战话术。',
    coverUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=300&fit=crop',
    category: '职场成长',
    author: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=xu', name: '徐佳莹' },
    price: 24.9,
    content: '',
    previewContent: '你是否遇到过这些场景：汇报时老板打断你、跨部门协作推进困难、和同事产生误解...其实这些问题都可以通过结构化沟通来解决。',
    readCount: 2890,
    likeCount: 412,
    publishDate: '2026-01-18',
    isFree: false
  }
]

export const mockComments: Comment[] = [
  { id: 'c1', contentId: '1', author: '程序员阿明', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=aming', text: '写得太好了！卡片笔记法我用了半年，效果非常明显。', time: '3天前', likes: 28 },
  { id: 'c2', contentId: '1', author: '读书人小林', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=xiaolin', text: 'Obsidian 确实好用，不过上手门槛有点高，希望能出一期工具教程。', time: '5天前', likes: 15 },
  { id: 'c3', contentId: '3', author: '效率控', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=xiaolv', text: '精力管理的概念太对了！我按文中的方法调整后，下午不再犯困了。', time: '1天前', likes: 42 },
]