module.exports = {
  title: '大象的blog',  // 设置网站标题
  description: 'this is a blog',
  base: '/',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/home' },
      { text: 'Guide', link: '/guide' },
      { text: 'External', link: '/external' }
    ],
    sidebar: {
      '/': [
        {
          title: 'Group 1',   // 必要的
          path: '/foo/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
          collapsable: false, // 可选的, 默认值是 true,
          sidebarDepth: 1,    // 可选的, 默认值是 1
          children: [
            '/'
          ]
        },
        {
          title: 'Group 2',
          children: [ /* ... */],
          initialOpenGroupIndex: -1 // 可选的, 默认值是 0
        }
      ]
    },
    sidebarDepth: 2
  }
}