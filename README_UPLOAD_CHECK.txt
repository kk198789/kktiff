PWA v2.6 根入口自救版上传检查

上传到 GitHub 仓库根目录：
- index.html 约 566KB，应显示主工作台
- chat.html 约 22KB，应显示独立专线聊天
- manifest.webmanifest
- service-worker.js
- icons/

测试：
1. /kktiff/index.html?v=2.6-root-guard 应进入主工作台
2. /kktiff/chat.html?v=2.6-root-guard 应进入聊天
3. /kktiff/?v=2.6-root-guard 若旧缓存误入聊天，也会被 chat.html 根路径自救跳回 index.html
