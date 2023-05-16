// ```
// Dynamically add all of these values to our database
// 1.連.env
// 2.連database
// ```

require('dotenv').config()
const connectDB = require('./db/connect');
const Product = require('./models/product');

const jsonProducts = require('./products.json')

const start = async() => {
  try{
    await connectDB(process.env.MONGO_URI)
    
    await Product.deleteMany()
    
    const result = await Product.create(jsonProducts)
    console.log("result",result)
    console.log('Sucess!!!!!!!!!!')
    //終止Node.js應用程序的運行，0表示退出狀態是正常的，即沒有錯誤
    process.exit(0)
  } catch (error){
      console.log(error)
      process.exit(1)
  }
}

start()