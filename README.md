## 简介

这是天码营[Node教程](http://tianmaying.com/course/node)的辅助代码。欢迎访问[天码营网站](http://tianmaying.com),为你提供极致的技术内容、学习工具与服务，打造一个最具人文与艺术气息的程序员乐园，你可以在学习和职业生涯中快速成长，沉淀知识，实现个人价值！

## 安装 mongoDB、redis

## 获取代吗

## 解决依赖

该项目使用npm管理依赖。在项目根路径，直接运行npm：

```bash
npm install
```

## 项目配置

创建配置文件`config.js`，我们提供了示例配置`config.js.example`，可以基于该示例创建自己的配置：

```bash
cp config.js.example config.js
vim config.js
```

## 启动服务

```bash
# 运行依赖服务：数据库、Redis
grunt server
```

## 构建并运行开发板

```bash
grunt
```

## 构建并运行生产版

```bash
# 构建
grunt dist

# 运行
npm start
```

访问 http://localhost:3000 ！

