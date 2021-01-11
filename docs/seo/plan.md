# 基于SEO的前端渲染方案选型

#### 搜索引擎的工作原理:
1. 爬虫在互联网上爬行，从一个链接到另一个链接，对内容进行分析，提炼关键词加入数据库中；如果爬虫认为是垃圾或重复信息，就舍弃继续爬行。当用户搜索时，就能检索出与关键字相关的网址显示给用户。
2. 一个关键词对用多个网址，因此就出现了排序的问题，相应的当与关键词最吻合的网址就会排在前面了。在爬虫抓取网页内容，提炼关键词的这个过程中，就存在一个问题：爬虫能否看懂。如果网站内容是 flash 和 js 等，那么它是看不懂的，会犯迷糊，即使关键字再贴切也没用。相应的，如果网站内容可以被搜索引擎能识别，那么搜索引擎就会提高该网站的权重，增加对该网站的友好度。这样一个过程我们称之为 SEO(Search Engine Optimization)，即搜索引擎优化。

### 一、客户端渲染（CSR）方案

<img :src="$withBase('/imgs/SEO/CRS.png')" alt="CRS">

**SPA:**  在到达浏览器之前的html页面是没有内容的，要等到浏览器执行相应异步请求获取数据填充后才显示界面。
#### 优点
- SPA 的优点（用户体验较好）页面切换流畅且可以添加动画
#### 缺点
- SEO不友好（爬虫如果没有执行js的能力，如百度，获取到的页面是空的，不利于网站推广）
- 首屏加载慢（到达浏览器端后再加载数据，增加用户等待时间）




### 二、服务端渲染 （SSR）方案

<img :src="$withBase('/imgs/SEO/SSR.png')" alt="SSR">


**基本原理**： 在服务端起一个node应用，浏览器到来时，先拦截执行部分 js 异步请求，提前将数据填充到 html 页面中返回浏览器。这样爬虫抓取到的页面就是带数据的，有利于SEO
#### 优点
- SEO 友好
- 首屏渲染快（可在服务端缓存页面，请求到来直接给 html）
#### 缺点
- 代码改动大、需要做特定SSR(Nuxt.js,Next.js)框架的改动（经过我们实践、原有SPA代码改动非常大）
- 丢失了部分SPA体验node 容易成为性能瓶颈




### 三、构建时预渲染方案

**基本原理**： 利用webpack 等构建工具，针对 SPA 应用开发后只有一个 index.html 文件入口问题，用上述预渲染中间件在前端项目构建时预先获取页面数据，生成多个页面，如 about、help 、contact 等页面，优化首屏渲染与部分页面SEO
solution | github Star
---|---
prerender-spa-plugin|	6k
puppeteer	|63.2k
phantomjs	|1.4k

#### 优点
- 代码侵入性小
#### 缺点
- 无法用于大量动态路径页面场景（动态路由）
- 无法获取到后台返回的数据


### 四、服务端动态渲染（利用user-agent）

<br/>

<img :src="$withBase('/imgs/SEO/Render.png')" alt="Render">

**基本原理**： 服务端对请求的 user-agent 进行判断，浏览器端直接给 SPA 页面，如果是爬虫，给经过动态渲染的 html 页面
#### 优点
- 兼顾 SPA优点同时解决SEO问题
#### 缺点
- 需要服务端应用（但动态渲染只针对爬虫、不会成为性能瓶颈）

<br/>

<img :src="$withBase('/imgs/SEO/nginx.png')" alt="nginx">

**社区方案：**
方案 | github Star|描述
---|---|---
puppeteer	|63.2k|	可用于动态渲染、前端测试、操作模拟。API丰富
rendertron	|4.9k|	动态渲染
prerender.io|	5.6k|	动态渲染

<br/>

**动态渲染相比SSR有几点明显好处:**
- 和 SSR 一致的 SEO 效果，通过 puppeteer 还可进一步定制 SEO 方案
- node 应用负载压力小，只需应对爬虫请求，相当于只有爬虫来了页面才做SSR
- 从整体架构上来说相当于一个插件，可随时插拔，无副作用
- 不需要大量修改SPA代码（只在重复请求问题上用一个标志位去识别，当然也可以不管这个问题）

<br/>

**常见爬虫 user-agent：**
主题 | user agent |用途 
---|---|---
Google|	googlebot	|搜索引擎
Google|	google-structured-data-testing-tool	|测试工具
Google|	Mediapartners-Google|	Adsense广告网页被访问后，爬虫就来访
Microsoft|bingbot	|搜索引擎
Linked|	linkedinbot|	应用内搜索
百度|	baiduspider	|搜索引擎
奇虎 360	|360Spider|	搜索引擎
搜狗|	Sogou Spider|	搜索引擎
Yahoo	Yahoo! |Slurp China	|搜索引擎
Yahoo	Yahoo! |Slurp	|搜索引擎
Twitter	|twitterbot	|应用内搜索
Facebook|	facebookexternalhit	|应用内搜索
-|rogerbot	|-
-|embedly|	-
Quora	|quora link preview|	-
-|showyoubot|	-
-|	outbrain	|-
-|	pinterest	|-
-|	slackbot	|-
-|	vkShare	|-
-|	W3C_Validator|	-
