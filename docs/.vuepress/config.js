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
    sidebar: [
        {
          title: 'seo',   // 必要的
          path: '/seo/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
          sidebarDepth: 3,
          children: [
             {
                title: '基于SEO的前端渲染方案选型',   // 必要的
                path: '/seo/plan',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                sidebarDepth: 3
              },
          ]
        },
        {
          title: 'Group 2',
          children: [ /* ... */],
          initialOpenGroupIndex: -1 // 可选的, 默认值是 0
        }
      ]
  }
}