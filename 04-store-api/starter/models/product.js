const mongoose= require('mongoose')
//Declaring User Model

const productSchema = new mongoose.Schema({
  name:{
    type:String,
    required:[true,'product name must be provided']
  },
  price:{
    type:Number,
    required:[true,'product name must be provided']
  }
  ,featured:{
    type:Boolean,
    default:false
  }
  ,rating:{
    type:Number,
    default:4.5,
  },
  createdAt:{
    type:Date,
    default: Date.now(),
  },
  //裡面加一個判斷如果item 沒有match到要傳coustom error message
  company:{
    type:String,
    enum:{
      values:['ikea','liddy','caressa','marcos'],
      message:'{VALUE} is not supported',
    }
  },
})


module.exports = mongoose.model('Product',productSchema)