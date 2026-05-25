# Checklist: 新增简易本地内容编辑后台

- [x] Admin Store 实现：login 验证密码并存储 token，logout 清除 token，isLoggedIn 正确返回状态
- [x] AdminLogin 页面实现：密码输入、错误提示、登录成功跳转
- [x] contentStore 新增可写方法：ddContent、updateContent、deleteContent 操作 localStorage 并更新状态
- [x] AdminDashboard 内容列表实现：表格展示所有内容，含封面缩略图、标题、分类、价格、阅读量、发布时间
- [x] 搜索和分类筛选功能正常工作
- [x] 编辑表单实现：预填所有字段，修改后保存到 localStorage，Toast 提示
- [x] 新增内容表单实现：空表单，生成新 id，保存后列表可见
- [x] 图片上传实现：FileReader 转为 base64，显示预览，限制图片类型
- [x] 删除功能实现：二次确认弹窗，确认后删除并更新列表
- [x] 退出管理功能：清除 admin token，跳转到登录页
- [x] App.tsx 路由配置正确：/admin/login 和 /admin/* 不经过 Layout
- [x] 
pm run build 通过，TypeScript 零错误
- [ ] 手动测试完整流程：登录 → 编辑 → 保存 → 返回小程序首页验证变化