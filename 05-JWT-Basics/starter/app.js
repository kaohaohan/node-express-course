require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

// 这是我们的主持人（mainRouter），他将负责处理与主要活动相关的事务！
// 让我们为主持人分配一个特定的活动区域，他将在这里处理请求和操作！
const mainRouter = require('./routes/main')
//error 
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// middleware
// 用 use() 为一个特定的路由添加该函数'./'
app.use(express.static('./public'));
// 用 use() 为所有的路由和动词添加该函数
app.use(express.json());


//將中間函數綁到路由上
//使用 require() 引入了 "main" 路由器模块，并添加了一个路由 '/api/v1'。
//这意味着当用户访问 '/api/v1/dashboard' 和 '/api/v1/login' 这两个子路径时，请求将被转发到 "main" 路由器进行处理。
//所以，用户可以通过访问 '/api/v1/dashboard' 来获取仪表板相关的数据，也可以通过访问 '/api/v1/login' 来访问登录页面。
app.use('/api/v1',mainRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
