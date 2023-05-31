const Product = require("../models/product");

//查找資料
const getAllProductsStatic = async (_req, res) => {
  const search="ab"
  const products = await Product.find({ price:{ $gt:30 }}).sort('name').select('name price').limit(4);
  res.status(200).json({ products, nbHits: products.length });
};

//python 表達式
///queryObject['featured'] = True if featured == 'true' else False
const getAllProducts = async (req, res) => {
  console.log('req.query',req.query)
  const {featured,company,name,sort,fields,numericFilters} = req.query
  const queryObject= {}
  // console.log('queryObject:', queryObject);
  
  if (featured){
    queryObject.featured = featured === 'true' ? true:false 
  }
  // console.log('queryObject:', queryObject);
  if (company){
    queryObject.company = company
  }
  // console.log('queryObject:', queryObject);
  if (name){
    queryObject.name = {$regex:name, $options:'i'}
  }

  let result =  Product.find(queryObject)
  // sort
   if (sort) {
    const sortList = sort.split(',').join(' ');
    result = result.sort(sortList);
  }
  //field 跟sort有點像
  if (fields) {
    const fieldList = fields.split(',').join(' ');
    result = result.select(fieldList);
  }
  //numericFilters
  // This code block is used to handle numeric filters in a search query.
  // The 'operatorMap' 
  if(numericFilters){
    const operatorMap={
      '>':'$gt',
      '>=':'$gte',
      '=':'$eq',
      '<':'$lt',
      '<=':'$lte',
    }
    const regEx = /\b(<|>|=|>=|<=)\b/g
    let fileters = numericFilters.replace(regEx,(match)=>'-${operatorMap[match]}-')
    const options=['price','rating']
    fileters = fileters.split(',').forEach(item=>{
      const [filed,operator,value] = item.split('-')
      if(options.includes(filed)){
        queryObject[filed] = { [operator]:Number(value) }
      }
    })
    console.log(numericFilters)
  }
  //limit 限制
  // This code block is used to handle the limiting the number of items to display in a page 
  const page = Number(req.query.page) || 1 
  const limit = Number(req.query.limit)|| 10 
  const skip =(page-1) * limit; 

  result = result.skip(skip).limit(limit)
  const products = await result
  
  res.status(200).json({ products, nbHits: products.length });
};
module.exports = {
  getAllProductsStatic,
  getAllProducts,
};
