const Product = require('../models/product')


//查找資料
const getAllProductsStatic = async (req, res) => {
  
  const Products = await Product.find({
     name:'vase table' })
  res.status(200).json({ Products, nbHits: Products.length });
}

const getAllProducts = async (req, res) => {
  res.status(200).json({ msg: "products testing route" });
};
module.exports = {
  getAllProductsStatic,
  getAllProducts,
};
