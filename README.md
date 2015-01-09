天码博客

# 开发环境搭建

## 安装 mongoDB、redis

## 解决依赖

该项目使用npm管理依赖。在项目根路径，直接运行npm：

```bash
npm install
```

## 运行

```bash
# 运行依赖服务：数据库、Redis
grunt server

# 构建开发版
grunt

# 构建部署版
grunt dist
```

访问 http://localhost:3000 ！
