# Tasks: 新增简易本地内容编辑后台

## Pre-implementation: 新建路由 (/admin, /admin/login)
- 在 App.tsx 中添加 Admin 相关路由，不经过移动端 Layout

## Task 1: 创建 adminStore（管理后台登录状态）
- [x] 新建 src/store/adminStore.ts
- [x] 存储：zs_admin_token（localStorage）
- [x] 方法：login(password), logout(), isLoggedIn
- [x] 固定管理密码：dmin123

## Task 2: 创建 AdminLogin 页面
- [x] 新建 src/pages/admin/AdminLogin.tsx
- [x] 密码输入框 + 登录按钮
- [x] 错误提示
- [x] 登录成功后跳转 /admin

## Task 3: 创建内容编辑 Store 方法（在 contentStore 中新增）
- [x] 在 contentStore.ts 中新增可写方法：ddContent, updateContent, deleteContent
- [x] 方法直接操作 contents 数组并同步到 localStorage

## Task 4: 创建 AdminDashboard 页面 — 内容列表
- [x] 新建 src/pages/admin/AdminDashboard.tsx
- [x] 顶部栏：标题 + "新增内容" 按钮 + "退出管理" 按钮
- [x] 搜索框 + 分类下拉筛选
- [x] 表格列表：封面缩略图、标题、分类、价格、阅读量、发布时间、操作（编辑/删除/预览）

## Task 5: 创建内容编辑/新建表单组件
- [x] 在 AdminDashboard.tsx 中实现编辑表单（ContentFormView 组件）
- [x] 路由：/admin/edit/:id 和 /admin/create
- [x] 表单字段：标题、摘要、分类、作者名/头像、价格、免费开关、完整内容、预览内容、封面图上传

## Task 6: 修改 App.tsx 添加 Admin 路由
- [x] 添加 <Route path="/admin/login"> 和 <Route path="/admin/*">，不经过 Layout

## Task 7: 构建验证
- [x] 
pm run build 通过，TypeScript 零错误

## Task 8: 功能验证（手动）
- [ ] 手动测试：访问 /admin/login，登录，查看内容列表
- [ ] 测试：编辑内容 → 保存 → 返回首页查看变化
- [ ] 测试：新增内容 → 保存 → 首页可见
- [ ] 测试：删除内容 → 首页不再显示