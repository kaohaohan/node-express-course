const Product = require("../models/product");

//查找資料
const getAllProductsStatic = async (req, res) => {
  const products = await product.find({
    name: "vase table",
  });
  res.status(200).json({ products, nbHits: products.length });
};

//python 表達式
///queryObject['featured'] = True if featured == 'true' else False
const getAllProducts = async (req, res) => {
  console.log('req.query',req.query)
  const featured = req.query.featured
  const company = req.query.company
  const name = req.query.name
  console.log('featured',featured)
  console.log('company',company)
  console.log('name',name)
  // const {featured,company} = req.query
  //4:16
  const queryObject= {}
  if (featured){
    queryObject.featured = featured === 'true' ? true:false 
  }
  if (company){
    queryObject.company = company
  }
  if (name){
    queryObject.name = name
  }
  console.log(queryObject)
  const products = await Product.find(req.query);
  res.status(200).json({ products, nbHits: Products.length });
};
module.exports = {
  getAllProductsStatic,
  getAllProducts,
};
