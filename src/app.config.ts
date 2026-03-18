export default defineAppConfig({
  pages: ['pages/chat/index', 'pages/recipe-detail/index', 'pages/me/index'],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#ffffff',
    navigationBarTitleText: 'AI菜谱助手',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: '#666666',
    selectedColor: '#111111',
    backgroundColor: '#ffffff',
    list: [
      {
        pagePath: 'pages/chat/index',
        text: '对话'
      },
      {
        pagePath: 'pages/me/index',
        text: '我的'
      }
    ]
  }
})

