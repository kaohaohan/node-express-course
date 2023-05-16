const Product = require("../models/product");

//查找資料
const getAllProductsStatic = async (req, res) => {
  const products = await product.find({
    name: "vase table",
  });
  res.status(200).json({ products, nbHits: products.length });
};

const getAllProducts = async (req, res) => {
  const products = await Product.find(req.query);
  res.status(200).json({ products, nbHits: Products.length });
};
module.exports = {
  getAllProductsStatic,
  getAllProducts,
};
