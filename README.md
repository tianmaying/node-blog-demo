## 安装 mongoDB、redis

## 解决依赖

该项目使用npm管理依赖。在项目根路径，直接运行npm：

```bash
npm install
```

## 项目配置

创建配置文件config.js，我们提供了示例配置config.js.example，可以基于该示例创建自己的配置：

```bash
cp config.js.example config.js
```

## 启动服务

```bash
# 运行依赖服务：数据库、Redis
grunt server
```

## 构建运行

```bash
# 开发版本
grunt

# 部署版本
grunt dist
```

访问 http://localhost:3000 ！

